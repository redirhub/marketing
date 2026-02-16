import { postType } from './postType'
import { authorType } from './authorType'
import { supportType } from './supportType'
import { legalType } from './legalType'
import { faqSetType } from './faqSetType'
import { landingPageType } from './landingPageType'
import { ctaType } from './ctaType'
import { changelogType } from './changelogType'

export const schema = {
  types: [postType, authorType, supportType, legalType, faqSetType, landingPageType, ctaType, changelogType],
}
