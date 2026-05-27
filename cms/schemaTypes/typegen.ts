import { defineField, defineType } from 'sanity'
import { schemaTypes } from './index'

const linkType = defineType({
  name: 'link',
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'string' }),
    defineField({ name: 'type', type: 'string' }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
    defineField({ name: 'url', type: 'url' }),
    defineField({ name: 'email', type: 'email' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'value', type: 'string' }),
    defineField({ name: 'blank', type: 'boolean' }),
    defineField({ name: 'parameters', type: 'string' }),
    defineField({ name: 'anchor', type: 'string' }),
  ],
})

export const typegenSchemaTypes = [...schemaTypes, linkType]
