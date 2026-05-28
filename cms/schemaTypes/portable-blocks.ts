import { defineField, defineType } from 'sanity'
import { CubeIcon } from '@sanity/icons'
import { requiredLinkField } from 'sanity-plugin-link-field'

const inlineLinkType = defineType({
  name: 'inlineLink',
  title: 'Inline Link',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: rule => rule.custom(field => requiredLinkField(field)),
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare(selection) {
      const { label } = selection

      return {
        title: label,
        subtitle: 'Inline Link',
        icon: CubeIcon,
      }
    },
  },
})

export const portableComponents = [{ type: 'block' }, { type: 'inlineLink' }]

export const portableBlockTypes = [inlineLinkType]
