import { blockTypes } from './blocks'

const blockBlacklist = [
  'menuItem',
  'accordionMenuSubSection',
  'accordionMenuSection',
] as const
type BlacklistedBlock = (typeof blockBlacklist)[number]

export type BlockTypeName = Exclude<
  (typeof blockTypes)[number]['name'],
  BlacklistedBlock
>

export const blockTypeNames: readonly BlockTypeName[] = blockTypes
  .map(block => block.name)
  .filter(
    (name): name is BlockTypeName =>
      !(blockBlacklist as readonly string[]).includes(name),
  )

export const pageDocumentTypeNames = ['page'] as const
