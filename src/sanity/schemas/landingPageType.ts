import { defineField, defineType } from 'sanity'
import { LANGUAGES, defaultLocale, getLocaleLabel } from '../config/i18n'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'Main title for this landing page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'URL slug - identical across all language versions of this page',
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
              _type == "landingPage" &&
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
      name: 'meta',
      title: 'SEO Metadata',
      type: 'object',
      description: 'SEO and social sharing metadata',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description:
            'SEO title (max 120 characters recommended). Falls back to page title if empty.',
          validation: (rule) => rule.max(120),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          description:
            'SEO description (max 250 characters recommended). Used in search results.',
          validation: (rule) => rule.max(250),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description:
            'Image for social media sharing (recommended: 1200x630px)',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      description: 'Main hero section (always displayed at top of page)',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          description: 'Main headline text',
          validation: (rule) => rule.required(),
        },
        {
          name: 'subheadline',
          type: 'text',
          title: 'Subheadline',
          rows: 3,
          description: 'Supporting text below headline',
        },
        {
          name: 'ctaPrimary',
          type: 'object',
          title: 'Primary CTA Button',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Button Label',
            },
            {
              name: 'url',
              type: 'string',
              title: 'Button URL',
            },
          ],
        },
        {
          name: 'heroImage',
          type: 'image',
          title: 'Hero Image',
          description: 'Main featured image for hero section',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'heroSections',
          title: 'Hero Sections',
          type: 'array',
          description: 'Select which sections to display in hero area',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Redirect Widget', value: 'redirect' },
              { title: 'Customer Logos', value: 'customerLogos' },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'richContent',
      title: 'Rich Content',
      type: 'array',
      description: 'Main content for the page',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Frequently asked questions (keep empty to hide)',
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
              rows: 4,
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle:
                  subtitle?.substring(0, 100) +
                  (subtitle && subtitle.length > 100 ? '...' : ''),
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: 'sections',
      title: 'Optional Page Sections',
      type: 'array',
      description: 'Select which optional sections to display on this page',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Table of Content', value: 'contentTable' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Blog Insight', value: 'blogInsight' },
        ],
      },
    }),
    defineField({
      name: 'footerType',
      type: 'string',
      title: 'Footer Type',
      description: 'Select footer style for this landing page',
      options: {
        list: [
          { title: 'Default (Minimal)', value: 'default' },
          { title: 'With Widgets', value: 'with-widgets' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active',
      description: 'Toggle to show/hide this landing page',
      initialValue: true,
    }),
    defineField({
      name: 'onFooter',
      type: 'boolean',
      title: 'On Footer',
      description: 'Toggle to show/hide this landing page on footer links',
      initialValue: true,
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
    defineField({
      name: 'needsTranslation',
      type: 'boolean',
      title: 'Needs Translation',
      description: 'Auto translate page in background',
      initialValue: false,
      hidden: ({ document }) => document?.locale !== 'en',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      slug: 'slug',
      heroImage: 'hero.heroImage',
      isActive: 'isActive',
    },
    prepare({ title, locale, slug, heroImage, isActive }) {
      return {
        title: title,
        subtitle: `${getLocaleLabel(locale)} • ${slug?.current || slug} ${!isActive ? '(Inactive)' : ''}`,
        media: heroImage,
      }
    },
  },
})
