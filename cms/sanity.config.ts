import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { iconify } from 'sanity-plugin-iconify'
import { media } from 'sanity-plugin-media'
import { linkField } from 'sanity-plugin-link-field'
import { pageDocumentTypes } from './schemaTypes/page'

export default defineConfig({
  name: 'default',
  title: 'boulebaar',

  projectId: 'cicps48l',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    media(),
    iconify({ collections: ['tabler'] }),
    linkField({
      linkableSchemaTypes: pageDocumentTypes.map(page => page.type),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
