import { defineType } from 'sanity'

export const ctaType = defineType({
  type: 'object',
  name: 'cta',
  title: 'CTA',
  fields: [
    {
      name: 'variant',
      type: 'string',
      title: 'CTA Type',
      description: 'default or custom CTA',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Main heading for the CTA',
      hidden: ({ parent }) => parent?.variant !== 'custom',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { variant?: string }
          if (parent?.variant === 'custom' && !value) {
            return 'Title is required for custom CTA'
          }
          return true
        }),
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text',
      description: 'Supporting text or description',
      hidden: ({ parent }) => parent?.variant !== 'custom',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { variant?: string }
          if (parent?.variant === 'custom' && !value) {
            return 'Text is required for custom CTA'
          }
          return true
        }),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link target for the CTA button',
      hidden: ({ parent }) => parent?.variant !== 'custom',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { variant?: string }
          if (parent?.variant === 'custom' && !value) {
            return 'URL is required for custom CTA'
          }
          return true
        }),
    },
  ],
  preview: {
    select: {
      variant: 'variant',
      title: 'title',
      text: 'text',
    },
    prepare({ variant, title, text }) {
      if (variant === 'default') {
        return {
          title: 'Call to Action (Default)',
          subtitle: 'Uses default CTA',
        }
      }
      return {
        title: title || 'Call to Action (Custom)',
        subtitle: text || 'Custom CTA Block',
      }
    },
  },
})
