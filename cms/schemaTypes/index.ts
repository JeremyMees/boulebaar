import { blockTypes } from './blocks'
import { portableBlockTypes } from './portable-blocks'
import { pageBuilderType } from './page-builder'
import { pageType } from './page'
import { seoType } from './seo'
import { globalConfigTypes } from './global-config'

export const schemaTypes = [
  ...blockTypes,
  ...portableBlockTypes,
  ...globalConfigTypes,
  pageBuilderType,
  pageType,
  seoType,
]
