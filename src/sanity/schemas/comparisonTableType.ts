import { defineField, defineType } from 'sanity'

export const comparisonTableType = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Table Title',
      description: 'Main title for the comparison table',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
      description: 'Short description shown above the table',
    }),
    defineField({
      name: 'competitors',
      type: 'array',
      title: 'Competitors',
      description: 'Columns to compare (typically 2-4 competitors)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              description: 'Competitor or service name',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'Brief description or company examples',
            },
            {
              name: 'highlight',
              type: 'boolean',
              title: 'Highlight',
              description: 'Highlight this column with blue background (typically your product)',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              highlight: 'highlight',
            },
            prepare({ title, subtitle, highlight }) {
              return {
                title: highlight ? `★ ${title}` : title,
                subtitle,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Feature Rows',
      description: 'Each row represents a feature comparison',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              type: 'string',
              title: 'Feature Name',
              description: 'Name of the feature being compared',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
              description: 'Detailed description (shown in tooltip)',
            },
            {
              name: 'values',
              type: 'array',
              title: 'Values',
              description: 'One value per competitor (must match competitor count)',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'status',
                      type: 'string',
                      title: 'Status',
                      description: 'Support level for this feature',
                      options: {
                        list: [
                          { title: '✅ Yes (Full Support)', value: 'yes' },
                          { title: '❌ No (Not Supported)', value: 'no' },
                          { title: '⚠️ Warning (Partial/Limited)', value: 'warning' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'no',
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label (Optional)',
                      description: 'Additional text like "Ads", "Manual", "$299/mo"',
                    },
                  ],
                  preview: {
                    select: {
                      status: 'status',
                      label: 'label',
                    },
                    prepare({ status, label }) {
                      const icons = {
                        yes: '✅',
                        no: '❌',
                        warning: '⚠️',
                      }
                      const icon = icons[status as keyof typeof icons] || '❓'
                      return {
                        title: label || icon,
                        subtitle: status,
                      }
                    },
                  },
                },
              ],
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'feature',
              description: 'description',
            },
            prepare({ title, description }) {
              return {
                title,
                subtitle: description?.substring(0, 60),
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(3).max(20),
    }),
    defineField({
      name: 'notes',
      type: 'array',
      title: 'Footer Notes',
      description: 'Optional notes displayed below the table',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      competitorCount: 'competitors',
      rowCount: 'rows',
    },
    prepare({ title, description, competitorCount, rowCount }) {
      const competitors = competitorCount?.length || 0
      const rows = rowCount?.length || 0
      return {
        title: `📊 ${title || 'Comparison Table'}`,
        subtitle: `${competitors} competitors × ${rows} features | ${description?.substring(0, 50) || ''}`,
      }
    },
  },
})
