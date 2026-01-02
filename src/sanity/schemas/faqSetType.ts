import { defineField, defineType } from 'sanity'
import { LANGUAGES, defaultLocale, getLocaleLabel } from '../config/i18n'

export const faqSetType = defineType({
  name: 'faqSet',
  title: 'FAQ Set',
  type: 'document',
  fields: [
    defineField({
      name: 'pageSlug',
      type: 'string',
      title: 'Page Slug',
      description: 'Identifier for the page (e.g., "homepage", "create-redirects")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Display Title',
      description: 'Optional title for this FAQ set (e.g., "Frequently Asked Questions")',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      description: 'List of frequently asked questions and answers',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (rule) => rule.required(),
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle?.substring(0, 100) + '...',
              }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'locale',
      type: 'string',
      title: 'Language',
      description: 'Language of this FAQ set',
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
      pageSlug: 'pageSlug',
      locale: 'locale',
      faqCount: 'faqs',
    },
    prepare({ pageSlug, locale, faqCount }) {
      const count = Array.isArray(faqCount) ? faqCount.length : 0
      return {
        title: `${pageSlug}`,
        subtitle: `${getLocaleLabel(locale)} • ${count} FAQ${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
