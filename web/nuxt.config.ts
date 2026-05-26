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
    'shadcn-nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/tailwind.css'],

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
  },
})
