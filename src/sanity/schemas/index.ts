import { postType } from './postType'
import { authorType } from './authorType'
import { supportType } from './supportType'
import { legalType } from './legalType'

export const schema = {
  types: [postType, authorType, supportType, legalType],
}
