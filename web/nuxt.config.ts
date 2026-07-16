import { createResolver } from 'nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
import { defaultSeo } from './app/utils/seo'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  $production: {
    routeRules: {
      '/**': { isr: 1800 },
      '/api/**': { isr: false },
      '/preview/**': { isr: false },
      '/_sanity/**': { isr: false },
    },
    nitro: {
      vercel: {
        config: {
          bypassToken: process.env.NUXT_VERCEL_BYPASS_TOKEN,
        },
      },
    },
    sanity: {
      useCdn: false,
    },
  },

  devtools: { enabled: true },

  experimental: { viewTransition: true },

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
    '@nuxtjs/seo',
    '@sentry/nuxt/module',
  ],

  alias: {
    '#cms': resolve('../cms'),
  },

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    revalidateSecret: process.env.NUXT_REVALIDATE_SECRET,
    vercelBypassToken: process.env.NUXT_VERCEL_BYPASS_TOKEN,
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },

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
      stega: false,
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
      previewMode: {
        enable: '/preview/_enable',
        disable: '/preview/_disable',
      },
    },
  },

  image: {
    quality: 90,
    sanity: {
      projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
      dataset: process.env.NUXT_SANITY_DATASET ?? '',
    },
  },

  shadcn: { prefix: '' },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL,
    name: defaultSeo.name,
    description: defaultSeo.description,
    defaultLocale: 'nl',
    trailingSlash: false,
    indexable: true,
  },

  ogImage: {
    enabled: false,
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': '',
        'Content-Security-Policy': `frame-ancestors 'self' ${process.env.NUXT_SANITY_STUDIO_URL} https://*.sanity.studio https://www.sanity.io https://sanity.io http://localhost:3333`,
      },
    },
  },

  sourcemap: { client: 'hidden' },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@sanity/client',
        '@sanity/image-url',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
      ],
    },
  },
})
