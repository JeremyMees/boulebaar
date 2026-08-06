import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { resolve } from 'node:path'

const ignoredLogs = [
  /^<Suspense>/,
  /Cannot destructure property 'canonicalQueryWhitelist'.*seo-utils/,
]

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            '~': resolve(__dirname, 'app'),
          },
        },
        test: {
          name: 'unit',
          include: ['test/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          environment: 'nuxt',
          setupFiles: ['./test/nuxt/setup.ts'],
        },
      }),
    ],
    onConsoleLog: l => {
      return !ignoredLogs.some(p => p.test(l))
    },
  },
})
