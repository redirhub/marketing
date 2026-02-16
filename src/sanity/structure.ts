import type { StructureResolver } from 'sanity/structure'
import { LANGUAGES, defaultLocale } from './config/i18n'

const contentTypes = [
  {
    id: 'posts',
    type: 'post',
    title: 'Posts',
    icon: '📝',
    orderBy: { field: 'publishedAt', direction: 'desc' as const },
  },
  {
    id: 'landingPages',
    type: 'landingPage',
    title: 'Landing Pages',
    icon: '🚀',
    orderBy: { field: 'publishedAt', direction: 'desc' as const },
  },
  {
    id: 'support',
    type: 'support',
    title: 'Support Articles',
    icon: '❓',
    orderBy: { field: 'publishedAt', direction: 'desc' as const },
  },
  {
    id: 'changelog',
    type: 'changelog',
    title: 'Changelog',
    icon: '📋',
    orderBy: { field: 'publishedAt', direction: 'desc' as const },
  },
  {
    id: 'legal',
    type: 'legal',
    title: 'Legal Documents',
    icon: '⚖️',
    orderBy: { field: 'title', direction: 'asc' as const },
  },
  {
    id: 'faqSets',
    type: 'faqSet',
    title: 'FAQ Sets',
    icon: '💬',
    orderBy: { field: 'pageSlug', direction: 'asc' as const },
  },
  {
    id: 'testimonial',
    type: 'testimonial',
    title: 'Testimonials',
    icon: '✅',
    orderBy: { field: 'order', direction: 'desc' as const },
  },
]

export const structure: StructureResolver = (S) => {
  // Get language from sessionStorage (client-side), default to 'en'
  let selectedLanguage = defaultLocale
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem('studio-lang')
    selectedLanguage = saved || defaultLocale
  }

  // Find the selected language info
  const selectedLang =
    LANGUAGES.find((l) => l.id === selectedLanguage) || LANGUAGES[0]

  const langLabel = `${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`

  return S.list()
    .title('Content')
    .items([
      ...contentTypes.map((content) =>
        S.listItem()
          .id(content.id)
          .title(content.title)
          .icon(() => content.icon)
          .child(
            S.documentTypeList(content.type)
              .title(`${content.title} - ${langLabel}`)
              .filter(`_type == "${content.type}" && locale == $locale`)
              .params({ locale: selectedLanguage })
              .defaultOrdering([content.orderBy])
          )
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !contentTypes.map((c) => c.type).includes(listItem.getId() || '')
      ),
    ])
}
