import { defineType, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  icon: BlockElementIcon,
  of: [
    defineArrayMember({ type: 'imageHero' }),
    defineArrayMember({ type: 'infoColumns' }),
  ],
})
