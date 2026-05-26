export const BLOCK_TYPES = [] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export const PAGE_BUILDER_TYPES = ['page'] as const

export type PageBuilderType = (typeof PAGE_BUILDER_TYPES)[number]

export interface BlockMeta {
  documentId: string
  documentType: string
}
