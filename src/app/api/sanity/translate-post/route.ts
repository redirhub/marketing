import { NextRequest, NextResponse } from 'next/server'
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

async function translateText(text: string, targetLocale: string) {
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

async function translateMetadata(sourceDoc: any, targetLocale: string) {
  const targetLanguage = LOCALE_NAMES[targetLocale]

  // Prepare structured metadata for translation
  const metadata = {
    title: sourceDoc.title,
    excerpt: sourceDoc.excerpt || '',
    tags: sourceDoc.tags || [],
    faqs: sourceDoc.faqs || [],
  }

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the following blog post metadata to ${targetLanguage}. Maintain the tone, style, and context. Return ONLY a valid JSON object with the same structure, containing the translations. Do not add any explanations or markdown formatting.`,
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

  // Preserve _key fields from original FAQs
  const translatedFaqs = Array.isArray(translatedMetadata.faqs)
    ? translatedMetadata.faqs.map((faq: any, index: number) => ({
        ...faq,
        _key: sourceDoc.faqs?.[index]?._key || faq._key,
      }))
    : sourceDoc.faqs || []

  return {
    title: translatedMetadata.title || sourceDoc.title,
    excerpt: translatedMetadata.excerpt || sourceDoc.excerpt,
    tags: Array.isArray(translatedMetadata.tags)
      ? translatedMetadata.tags
      : sourceDoc.tags || [],
    faqs: translatedFaqs,
  }
}

async function translatePortableText(content: any[], targetLocale: string) {
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

async function createTranslatedDocument(sourceDoc: any, targetLocale: string) {
  // Translate metadata (title, excerpt, tags, FAQs) and content in parallel for maximum speed
  const [translatedMetadata, translatedContent] = await Promise.all([
    translateMetadata(sourceDoc, targetLocale),
    translatePortableText(sourceDoc.content, targetLocale),
  ])

  const baseSlug = sourceDoc.slug?.current

  const existingTranslation = await writeClient.fetch(
    `*[_type == "post" && locale == $locale && slug.current == $baseSlug][0]`,
    {
      baseSlug,
      locale: targetLocale,
    }
  )

  const translatedDoc = {
    _type: 'post',
    locale: targetLocale,
    title: translatedMetadata.title,
    slug: sourceDoc.slug,
    excerpt: translatedMetadata.excerpt,
    content: Array.isArray(translatedContent) ? translatedContent : [],
    tags: translatedMetadata.tags,
    image: sourceDoc.image,
    publishedAt: sourceDoc.publishedAt,
    author: sourceDoc.author,
    faqs: translatedMetadata.faqs,
  }

  if (existingTranslation) {
    return await writeClient
      .patch(existingTranslation._id)
      .set(translatedDoc)
      .commit()
  } else {
    return await writeClient.create(translatedDoc)
  }
}

export async function processTranslationJob(
  documentId: string,
  targetLocales?: string[]
) {
  console.log(
    `[Translate Post] Processing translation for document: ${documentId}`
  )

  const sourceDoc = await writeClient.fetch(
    `*[_id == $id][0]{
      _id,
      title,
      slug,
      excerpt,
      content,
      tags,
      image,
      publishedAt,
      author,
      faqs,
      locale
    }`,
    { id: documentId }
  )

  if (!sourceDoc) {
    const message = `Document not found: ${documentId}`
    console.error(`[Translate Post] ${message}`)
    throw new Error(message)
  }

  if (sourceDoc.locale !== 'en') {
    const message = 'Only English documents can be translated'
    console.error(`[Translate Post] ${message}`)
    throw new Error(message)
  }

  const slug = sourceDoc.slug?.current || 'unknown'
  const locales = targetLocales || SUPPORTED_LOCALES

  console.log(
    `[Translate Post] Starting parallel translation for slug: ${slug} to ${locales.length} languages`
  )

  // Translate all languages in parallel for maximum speed
  const results = await Promise.all(
    locales.map(async (locale) => {
      try {
        console.log(`[Translate Post] [${slug}] Translating to ${locale}...`)
        const translatedDoc = await createTranslatedDocument(sourceDoc, locale)
        console.log(`[Translate Post] [${slug}] ✓ Translated to ${locale}`)
        return {
          locale,
          status: 'success',
          documentId: translatedDoc._id,
        }
      } catch (error) {
        console.error(
          `[Translate Post] [${slug}] Error translating to ${locale}:`,
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
  await writeClient.patch(documentId).set({ needsTranslation: false }).commit()

  console.log(
    `[Translate Post] [${slug}] Translation complete for document: ${documentId}`
  )
  return { success: true, results }
}

// App Router POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { documentId, targetLocales } = body

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    const result = await processTranslationJob(documentId, targetLocales)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    )
  }
}
