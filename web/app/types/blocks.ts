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

type RichBlock = {
  _type: 'block'
  _key: string
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
  listItem?: 'bullet' | 'number'
  markDefs?: Array<{ href?: string; _type: 'link'; _key: string }>
  level?: number
}

export type SanityImage = {
  asset?: SanityImageAssetReference | undefined
  media?: unknown
  hotspot?: SanityImageHotspot
  crop?: SanityImageCrop
  _type: 'image'
  url?: string
  altText?: string
  title?: string
  description?: string
}

export type PortableTextValue =
  | Array<RichBlock | InlineLinkBlock>
  | null
  | undefined

export interface InlineLinkBlock {
  _type: 'inlineLink'
  _key?: string
  label?: string
  link?: SanityLink | null
}

export interface ImageAsset {
  hotspot?: SanityImageHotspot | null
  crop?: SanityImageCrop | null
  assetRef: string | null
  url: string | null
  altText: string
  title: string
  description: string
}

export interface SanityLink {
  type?: string | null
  url?: string | null
  blank?: boolean | null
  parameters?: string | null
  anchor?: string | null
}

export type SanityIcon = {
  _type: 'icon'
  name?: string
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never

export type InfoColumnsBlock = Omit<InfoColumns, 'columns'> & {
  columns: Array<
    DistributiveOmit<NonNullable<InfoColumns['columns']>[number], 'image'> & {
      image: SanityImage | null
    }
  >
}
