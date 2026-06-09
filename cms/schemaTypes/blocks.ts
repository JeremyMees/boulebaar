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
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'array',
              of: [{ type: 'block' }],
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: rule => rule.required(),
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
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: rule => rule.required(),
            }),
          ],
        }),
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(3),
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

const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'ingredients',
      type: 'string',
    }),
    defineField({
      name: 'extras',
      type: 'array',
      of: [
        defineField({
          name: 'option',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'price',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'vegan',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

const menuType = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'menuBlock',
      type: 'array',
      of: [
        defineField({
          name: 'menuSection',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'items',
              type: 'array',
              of: [{ type: 'menuItem' }],
              validation: rule =>
                rule.required() && rule.min(1) && rule.max(10),
            }),
          ],
        }),
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(10),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu',
      }
    },
  },
})

const imageGridType = defineType({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          validation: rule => rule.required(),
        }),
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(20),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Image Grid',
      }
    },
  },
})

export const blockTypes = [
  imageHeroType,
  infoColumnsType,
  menuItemType,
  menuType,
  imageGridType,
]
