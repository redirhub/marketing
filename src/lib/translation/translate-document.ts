/**
 * Generalized Document Translation Service
 *
 * This module provides translation functionality for all Sanity document types:
 * - post (blog posts)
 * - support (support articles)
 * - legal (legal documents)
 * - faqSet (FAQ sets)
 */

import OpenAI from 'openai'
import { writeClient } from '@/sanity/lib/client'
import { allLanguages } from '@/sanity/config/i18n'

// Lazy initialize OpenAI client
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

const SUPPORTED_LOCALES = allLanguages.filter((locale) => locale !== 'en')

const LOCALE_NAMES: Record<string, string> = {
  de: 'German (Deutsch)',
  es: 'Spanish (español)',
  fr: 'French (français)',
  it: 'Italian (italiano)',
  pt: 'Portuguese (português)',
  ja: 'Japanese (日本語)',
  zh: 'Chinese (简体中文)',
  ko: 'Korean (한국어)',
}

type DocumentType = 'post' | 'support' | 'legal' | 'faqSet'

interface BaseDocument {
  _id: string
  _type: DocumentType
  locale: string
  title?: string
  slug?: { current: string }
  content?: any[]
  publishedAt?: string
}

interface PostDocument extends BaseDocument {
  _type: 'post'
  excerpt?: string
  tags?: string[]
  faqs?: any[]
  image?: any
  author?: any
}

interface SupportDocument extends BaseDocument {
  _type: 'support'
  tags?: string[]
}

interface LegalDocument extends BaseDocument {
  _type: 'legal'
  footer?: boolean
}

interface FaqSetDocument extends BaseDocument {
  _type: 'faqSet'
  pageSlug: string
  faqs: any[]
}

type Document = PostDocument | SupportDocument | LegalDocument | FaqSetDocument

async function translateText(text: string, targetLocale: string): Promise<string> {
  const targetLanguage = LOCALE_NAMES[targetLocale]
  const openai = getOpenAIClient()

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the tone, style, and formatting. Only return the translated text without any explanations.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.3,
  })

  return response.choices[0].message.content?.trim() || text
}

async function translateMetadata(
  sourceDoc: Document,
  targetLocale: string
): Promise<any> {
  const targetLanguage = LOCALE_NAMES[targetLocale]

  // Build metadata object based on document type
  const metadata: any = {
    title: sourceDoc.title,
  }

  // Type-specific fields
  if (sourceDoc._type === 'post') {
    metadata.excerpt = sourceDoc.excerpt || ''
    metadata.tags = sourceDoc.tags || []
    metadata.faqs = sourceDoc.faqs || []
  } else if (sourceDoc._type === 'support') {
    metadata.tags = sourceDoc.tags || []
  } else if (sourceDoc._type === 'faqSet') {
    metadata.pageSlug = sourceDoc.pageSlug
    metadata.faqs = sourceDoc.faqs || []
  }

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the following document metadata to ${targetLanguage}. Maintain the tone, style, and context. Return ONLY a valid JSON object with the same structure, containing the translations. Do not add any explanations or markdown formatting.`,
      },
      {
        role: 'user',
        content: JSON.stringify(metadata, null, 2),
      },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })

  const translatedMetadata = JSON.parse(
    response.choices[0].message.content || '{}'
  )

  // Preserve _key fields from original FAQs if present
  if (Array.isArray(translatedMetadata.faqs)) {
    const originalFaqs = sourceDoc._type === 'post' || sourceDoc._type === 'faqSet'
      ? sourceDoc.faqs || []
      : []

    translatedMetadata.faqs = translatedMetadata.faqs.map((faq: any, index: number) => ({
      ...faq,
      _key: originalFaqs[index]?._key || faq._key,
    }))
  }

  return translatedMetadata
}

async function translatePortableText(
  content: any[],
  targetLocale: string
): Promise<any[]> {
  if (!content || !Array.isArray(content)) return content

  // Translate all text blocks in parallel for speed
  const translatedBlocks = await Promise.all(
    content.map(async (block) => {
      if (block._type === 'block' && block.children) {
        const textToTranslate = block.children
          .filter((child: any) => child._type === 'span' && child.text)
          .map((child: any) => child.text)
          .join(' ')

        if (textToTranslate.trim()) {
          const translatedText = await translateText(
            textToTranslate,
            targetLocale
          )

          return {
            ...block,
            children: [
              {
                _type: 'span',
                text: translatedText,
                marks: [],
              },
            ],
          }
        }
      }
      return block
    })
  )

  return translatedBlocks
}

async function createTranslatedDocument(
  sourceDoc: Document,
  targetLocale: string
): Promise<any> {
  // Translate metadata and content in parallel
  const [translatedMetadata, translatedContent] = await Promise.all([
    translateMetadata(sourceDoc, targetLocale),
    sourceDoc.content ? translatePortableText(sourceDoc.content, targetLocale) : Promise.resolve([]),
  ])

  const baseSlug = sourceDoc.slug?.current

  // Check if translation already exists
  const existingTranslation = await writeClient.fetch(
    `*[_type == $type && locale == $locale && slug.current == $baseSlug][0]`,
    {
      type: sourceDoc._type,
      baseSlug,
      locale: targetLocale,
    }
  )

  // Build translated document based on type
  let translatedDoc: any = {
    _type: sourceDoc._type,
    locale: targetLocale,
    title: translatedMetadata.title,
    slug: sourceDoc.slug,
    publishedAt: sourceDoc.publishedAt,
  }

  // Add content if present
  if (sourceDoc.content) {
    translatedDoc.content = Array.isArray(translatedContent) ? translatedContent : []
  }

  // Add type-specific fields
  if (sourceDoc._type === 'post') {
    translatedDoc = {
      ...translatedDoc,
      excerpt: translatedMetadata.excerpt,
      tags: translatedMetadata.tags,
      image: sourceDoc.image,
      author: sourceDoc.author,
      faqs: translatedMetadata.faqs,
    }
  } else if (sourceDoc._type === 'support') {
    translatedDoc = {
      ...translatedDoc,
      tags: translatedMetadata.tags,
    }
  } else if (sourceDoc._type === 'legal') {
    translatedDoc = {
      ...translatedDoc,
      footer: (sourceDoc as LegalDocument).footer,
    }
  } else if (sourceDoc._type === 'faqSet') {
    translatedDoc = {
      ...translatedDoc,
      pageSlug: translatedMetadata.pageSlug,
      faqs: translatedMetadata.faqs,
    }
    // Remove slug field for faqSet as it doesn't use it
    delete translatedDoc.slug
  }

  // Update or create the document
  if (existingTranslation) {
    return await writeClient
      .patch(existingTranslation._id)
      .set(translatedDoc)
      .commit()
  } else {
    return await writeClient.create(translatedDoc)
  }
}

export async function translateDocument(
  documentId: string,
  targetLocales?: string[]
): Promise<{ success: boolean; results: any[] }> {
  console.log(`[Translate] Processing translation for document: ${documentId}`)

  // Fetch the document - support all types
  const sourceDoc = await writeClient.fetch(
    `*[_id == $id][0]{
      _id,
      _type,
      title,
      slug,
      excerpt,
      content,
      tags,
      image,
      publishedAt,
      author,
      faqs,
      locale,
      pageSlug,
      footer
    }`,
    { id: documentId }
  )

  if (!sourceDoc) {
    const message = `Document not found: ${documentId}`
    console.error(`[Translate] ${message}`)
    throw new Error(message)
  }

  if (sourceDoc.locale !== 'en') {
    const message = 'Only English documents can be translated'
    console.error(`[Translate] ${message}`)
    throw new Error(message)
  }

  const identifier = sourceDoc.slug?.current || sourceDoc.pageSlug || sourceDoc.title || 'unknown'
  const locales = targetLocales || SUPPORTED_LOCALES

  console.log(
    `[Translate] Starting parallel translation for ${sourceDoc._type}: ${identifier} to ${locales.length} languages`
  )

  // Translate all languages in parallel for maximum speed
  const results = await Promise.all(
    locales.map(async (locale) => {
      try {
        console.log(`[Translate] [${identifier}] Translating to ${locale}...`)
        const translatedDoc = await createTranslatedDocument(sourceDoc, locale)
        console.log(`[Translate] [${identifier}] ✓ Translated to ${locale}`)
        return {
          locale,
          status: 'success',
          documentId: translatedDoc._id,
        }
      } catch (error) {
        console.error(
          `[Translate] [${identifier}] Error translating to ${locale}:`,
          error
        )
        return {
          locale,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    })
  )

  // Mark the source document as no longer needing translation
  try {
    await writeClient.patch(documentId).set({ needsTranslation: false }).commit()
    console.log(`[Translate] [${identifier}] Marked needsTranslation=false`)
  } catch (error) {
    console.warn(`[Translate] [${identifier}] Could not update needsTranslation flag:`, error)
    // Don't fail the whole translation just because we couldn't update the flag
  }

  console.log(
    `[Translate] [${identifier}] Translation complete for document: ${documentId}`
  )
  return { success: true, results }
}
