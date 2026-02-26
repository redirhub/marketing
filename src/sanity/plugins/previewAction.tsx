import { EyeOpenIcon } from '@sanity/icons'
import { definePlugin } from 'sanity'
import type { DocumentActionComponent } from 'sanity'
import { defaultLocale } from '../config/i18n'
import { APP_URL } from '@/lib/utils/constants'

const getPreviewUrl = (doc: any): string | null => {
  if (!doc || !doc.slug?.current) return null

  const locale = doc.locale || 'en'
  const slug = doc.slug?.current

  const baseUrl = "";
  const prefix = locale === defaultLocale ? `${baseUrl}` : `${baseUrl}/${locale}`

  switch (doc._type) {
    case 'post':
      return `${prefix}/blog/${slug}?version=drafts`
    case 'landingPage':
      return `${prefix}/${slug}?version=drafts`
    case 'support':
      return `${prefix}/support/${slug}?version=drafts`
    case 'legal':
      return `${prefix}/legal/${slug}?version=drafts`
    case 'changelog':
      return `${prefix}/changelog/${slug}?version=drafts`
    default:
      return null
  }
}

const PreviewAction: DocumentActionComponent = (props) => {
  const previewUrl = getPreviewUrl(props.draft || props.published)

  return {
    label: 'Preview',
    icon: EyeOpenIcon,
    disabled: !previewUrl,
    onHandle: () => {
      if (previewUrl) {
        window.open(previewUrl, '_blank')
      }
    },
  }
}

export const previewActionPlugin = definePlugin({
  name: 'preview-action',
  document: {
    actions: (prev, context) => {
      const contentTypes = ['post', 'landingPage', 'support', 'legal', 'changelog']
      if (contentTypes.includes(context.schemaType)) {
        return [...prev, PreviewAction]
      }
      return prev
    },
  },
})
