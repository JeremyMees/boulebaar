import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'documentTitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      documentTitle: 'documentTitle',
    },
    prepare(selection) {
      const { documentTitle } = selection

      return {
        title: `${documentTitle ?? 'No title'}`,
        subtitle: 'Page component',
      }
    },
  },
})

export const pageDocumentTypes = [{ type: 'page' }]
