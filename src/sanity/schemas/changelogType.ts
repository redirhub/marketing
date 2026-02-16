import { defineField, defineType } from 'sanity'
import { LANGUAGES, defaultLocale, getLocaleLabel } from '../config/i18n'

export const changelogType = defineType({
  name: 'changelog',
  title: 'Changelog Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the changelog entry (e.g., "Advanced Analytics Dashboard")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'URL slug - identical across all language versions of this entry',
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
              _type == "changelog" &&
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
      name: 'description',
      type: 'text',
      title: 'Description (SEO)',
      description: 'Short summary for SEO meta description and social sharing (not displayed on the page)',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Detailed description of the update',
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
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{ type: 'author' }],
      description: 'The author of this changelog entry',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'Release date of this update',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locale',
      type: 'string',
      title: 'Language',
      description: 'Language of this changelog entry',
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
    defineField({
      name: 'needsTranslation',
      type: 'boolean',
      title: 'Needs Translation',
      description: 'Mark for background translation job processing',
      initialValue: false,
      hidden: ({ document }) => document?.locale !== 'en',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      publishedAt: 'publishedAt',
      description: 'description',
      authorName: 'author.name',
    },
    prepare({ title, locale, publishedAt, description, authorName }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : ''
      const author = authorName ? ` by ${authorName}` : ''
      return {
        title: title,
        subtitle: `${getLocaleLabel(locale)} • ${date}${author}`,
        description: description?.substring(0, 100),
      }
    },
  },
})
