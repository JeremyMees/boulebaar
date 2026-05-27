import { defineField, defineType } from 'sanity'
import { CogIcon, LinkIcon } from '@sanity/icons'
import { requiredLinkField } from 'sanity-plugin-link-field'

const navigationLinkType = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: rule => rule.custom(field => requiredLinkField(field)),
    }),
  ],
})

const configType = defineType({
  name: 'config',
  title: 'Global config',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'number',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'facebook',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'instagram',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'navigationLink',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'openingHours',
      type: 'object',
      fields: [
        defineField({
          name: 'monday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'tuesday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'wednesday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'thursday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'friday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'saturday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'sunday',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'cta',
          type: 'text',
        }),
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'navigationLinks',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      validation: rule => rule.required() && rule.min(1) && rule.max(10),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Config',
      }
    },
  },
})

export const globalConfigTypes = [navigationLinkType, configType]
