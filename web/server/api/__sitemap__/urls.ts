import { createClient } from '@sanity/client'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
  const client = createClient({
    projectId: process.env.NUXT_SANITY_PROJECT_ID!,
    dataset: process.env.NUXT_SANITY_DATASET!,
    apiVersion: process.env.NUXT_SANITY_API_VERSION,
    token: process.env.NUXT_SANITY_API_READ_TOKEN,
    useCdn: false,
  })

  const pages = await client.fetch<{ slug: string; _updatedAt: string }[]>(`
    *[_type == "page" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt,
    }
  `)

  return pages.map<SitemapUrlInput>(({ slug, _updatedAt }) => ({
    loc: slug === 'home' ? '/' : `/${slug}`,
    lastmod: _updatedAt,
  }))
})
