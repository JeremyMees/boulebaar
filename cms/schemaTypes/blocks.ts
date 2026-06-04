import { ComponentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const imageHeroType = defineType({
  name: 'imageHero',
  title: 'Image Hero',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Hero',
      }
    },
  },
})

const infoColumnsType = defineType({
  name: 'infoColumns',
  title: 'Info Columns',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'columns',
      type: 'array',
      of: [
        defineField({
          name: 'textColumn',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
        defineField({
          name: 'openingHoursColumn',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Info Columns',
      }
    },
  },
})

export const blockTypes = [imageHeroType, infoColumnsType]
