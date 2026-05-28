import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { vercelProtectionBypassTool } from '@sanity/vercel-protection-bypass'
import { iconify } from 'sanity-plugin-iconify'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { linkField } from 'sanity-plugin-link-field'

import { schemaTypes } from './schemaTypes'
import { pageDocumentTypes } from './schemaTypes/page'

export default defineConfig({
  name: 'default',
  title: 'boulebaar',

  projectId: 'cicps48l',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    media(),
    iconify({ collections: ['tabler'] }),
    linkField({
      linkableSchemaTypes: pageDocumentTypes.map(page => page.type),
    }),
    vercelProtectionBypassTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    image: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(
          assetSource => assetSource !== mediaAssetSource,
        )
      },
    },
    file: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(
          assetSource => assetSource !== mediaAssetSource,
        )
      },
    },
  },
})
