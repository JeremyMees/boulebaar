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

export const blockTypes = [imageHeroType]
