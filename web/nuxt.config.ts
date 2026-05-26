import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/icon'],

  icon: {
    customCollections: [
      {
        prefix: 'boulebaar',
        dir: resolve('./app/assets/vectors'),
      },
    ],
  },
})
