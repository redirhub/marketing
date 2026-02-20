import { defineField, defineType } from 'sanity'
import { LANGUAGES, defaultLocale, getLocaleLabel } from '../config/i18n'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Unique identifier for this testimonial (used for translations)',
      options: {
        source: 'author',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'The testimonial quote from the customer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author Name',
      description: 'Name of the person giving the testimonial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role/Title',
      description: 'Job title or description of the person',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'Company name (optional)',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Read More Link',
      description: 'Optional link to full testimonial or case study (shown when quote is long)',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      description: 'Profile photo of the person',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which testimonial should appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Show this testimonial on the website',
      initialValue: true,
    }),
    defineField({
      name: 'locale',
      type: 'string',
      title: 'Language',
      description: 'Language of this testimonial',
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
      description: 'Auto translate testimonial to all languages in background',
      initialValue: false,
      hidden: ({ document }) => document?.locale !== 'en',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      quote: 'quote',
      locale: 'locale',
      media: 'avatar',
      isActive: 'isActive',
    },
    prepare({ title, quote, locale, media, isActive }) {
      return {
        title: `${title}${isActive ? '' : ' (Inactive)'}`,
        subtitle: `${getLocaleLabel(locale)} • ${quote?.substring(0, 60)}...`,
        media,
      }
    },
  },
})
