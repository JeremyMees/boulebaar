import {
  blockTypeNames,
  pageDocumentTypeNames,
} from '#cms/schemaTypes/constants'

export const BLOCK_TYPES = blockTypeNames
export const PAGE_BUILDER_TYPES = pageDocumentTypeNames

export type BlockType = (typeof BLOCK_TYPES)[number]
export type PageBuilderType = (typeof PAGE_BUILDER_TYPES)[number]

export interface BlockMeta {
  documentId: string
  documentType: string
}
