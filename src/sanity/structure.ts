import type { StructureResolver } from 'sanity/structure'
import { LANGUAGES, defaultLocale } from './config/i18n'

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

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('posts')
        .title('Posts')
        .icon(() => '📝')
        .child(
          S.documentTypeList('post')
            .title(
              `Posts - ${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`
            )
            .filter('_type == "post" && locale == $locale')
            .params({ locale: selectedLanguage })
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .id('support')
        .title('Support Articles')
        .icon(() => '❓')
        .child(
          S.documentTypeList('support')
            .title(
              `Support Articles - ${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`
            )
            .filter('_type == "support" && locale == $locale')
            .params({ locale: selectedLanguage })
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .id('legal')
        .title('Legal Documents')
        .icon(() => '⚖️')
        .child(
          S.documentTypeList('legal')
            .title(
              `Legal Documents - ${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`
            )
            .filter('_type == "legal" && locale == $locale')
            .params({ locale: selectedLanguage })
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.listItem()
        .id('faqSets')
        .title('FAQ Sets')
        .icon(() => '💬')
        .child(
          S.documentTypeList('faqSet')
            .title(
              `FAQ Sets - ${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`
            )
            .filter('_type == "faqSet" && locale == $locale')
            .params({ locale: selectedLanguage })
            .defaultOrdering([{ field: 'pageSlug', direction: 'asc' }])
        ),
      S.listItem()
        .id('landingPages')
        .title('Landing Pages')
        .icon(() => '🚀')
        .child(
          S.documentTypeList('landingPage')
            .title(
              `Landing Pages - ${selectedLang.flag} ${selectedLang.nativeName || selectedLang.title}`
            )
            .filter('_type == "landingPage" && locale == $locale')
            .params({ locale: selectedLanguage })
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'support', 'legal', 'faqSet', 'landingPage'].includes(
            listItem.getId() || ''
          )
      ),
    ])
}
