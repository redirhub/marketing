import { defineField, defineType } from 'sanity'
import { LANGUAGES, defaultLocale, getLocaleLabel } from '../config/i18n'

export const legalType = defineType({
  name: 'legal',
  title: 'Legal Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'URL slug - identical across all language versions of this document',
      options: {
        source: 'title',
        isUnique: (slug, context) => {
          const { document, getClient } = context
          const locale = document?.locale || 'en'
          const docId = document?._id || ''

          // Handle both draft and published IDs
          const publishedId = docId.replace(/^drafts\./, '')
          const draftId = `drafts.${publishedId}`

          const client = getClient({ apiVersion: '2025-12-09' })

          const query = `
            !defined(*[
              _type == "legal" &&
              slug.current == $slug &&
              locale == $locale &&
              !(_id in [$publishedId, $draftId])
            ][0]._id)
          `

          return client.fetch(query, { slug, locale, publishedId, draftId })
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Helpful for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locale',
      type: 'string',
      title: 'Language',
      description: 'Language of this document',
      options: {
        list: LANGUAGES.map((lang) => ({
          title: lang.nativeName || lang.title,
          value: lang.id,
        })),
        layout: 'dropdown',
      },
      initialValue: defaultLocale,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      slug: 'slug',
    },
    prepare({ title, locale, slug }) {
      return {
        title: title,
        subtitle: `${getLocaleLabel(locale)} • ${slug?.current || slug}`,
      }
    },
  },
})
