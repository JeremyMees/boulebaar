import {
  HeartIcon,
  ImageIcon,
  ImagesIcon,
  InlineElementIcon,
  TruncateIcon,
  UlistIcon,
  BottleIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const imageHeroType = defineType({
  name: 'imageHero',
  title: 'Image Hero',
  type: 'object',
  icon: ImageIcon,
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
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: 'Image Hero',
        media: media ?? ImageIcon,
      }
    },
  },
})

const infoColumnsType = defineType({
  name: 'infoColumns',
  title: 'Info Columns',
  type: 'object',
  icon: InlineElementIcon,
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
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Info Columns',
        media: InlineElementIcon,
      }
    },
  },
})

const accordionMenuSubSectionType = defineType({
  name: 'accordionMenuSubSection',
  title: 'Accordion Menu Sub Section',
  type: 'object',
  icon: UlistIcon,
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
      validation: rule => rule.required() && rule.min(1) && rule.max(50),
    }),
  ],
})

const accordionMenuSectionType = defineType({
  name: 'accordionMenuSection',
  title: 'Accordion Menu Section',
  type: 'object',
  icon: TruncateIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'subSections',
      type: 'array',
      of: [{ type: 'accordionMenuSubSection' }],
      validation: rule => rule.required() && rule.min(1) && rule.max(10),
    }),
  ],
})

const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: UlistIcon,
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
      type: 'text',
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
  icon: BottleIcon,
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
                rule.required() && rule.min(1) && rule.max(50),
            }),
          ],
        }),
        {
          type: 'accordionMenuSection',
        },
      ],
      validation: rule => rule.required() && rule.min(1) && rule.max(10),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Menu',
        media: BottleIcon,
      }
    },
  },
})

const imageGridType = defineType({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'object',
  icon: ImagesIcon,
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
        media: ImagesIcon,
      }
    },
  },
})

const weServeType = defineType({
  name: 'weServe',
  title: 'We Serve',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'We Serve',
        media: HeartIcon,
      }
    },
  },
})

export const blockTypes = [
  imageHeroType,
  infoColumnsType,
  menuItemType,
  accordionMenuSubSectionType,
  accordionMenuSectionType,
  menuType,
  imageGridType,
  weServeType,
]
