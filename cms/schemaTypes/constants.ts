import { blockTypes } from './blocks'

export type BlockTypeName = (typeof blockTypes)[number]['name']

export const blockTypeNames: readonly BlockTypeName[] = blockTypes.map(
  block => block.name,
)

export const pageDocumentTypeNames = ['page'] as const
