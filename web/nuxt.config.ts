import { createResolver } from 'nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/a11y',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sanity',
    'motion-v/nuxt',
  ],

  alias: {
    '#cms': resolve('../cms'),
  },

  css: ['~/assets/css/tailwind.css'],

  imports: { dirs: ['~/types/*.ts'] },

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
    },
  },

  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    apiVersion: process.env.NUXT_SANITY_API_VERSION,
    typegen: {
      enabled: true,
      schemaTypesPath: '../cms/schemaTypes/typegen.ts',
      schemaTypesExport: 'typegenSchemaTypes',
    },
    visualEditing: {
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
    },
  },

  image: {
    quality: 90,
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
      dataset: process.env.NUXT_SANITY_DATASET ?? '',
    },
  },

  icon: {
    customCollections: [
      {
        prefix: 'boulebaar',
        dir: resolve('./app/assets/vectors'),
      },
    ],
  },

  shadcn: { prefix: '' },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@sanity/client',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
      ],
    },
  },
})
