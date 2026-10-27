import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async event => {
  const pages = await listPages(useSanity(event))

  return pages.map<SitemapUrlInput>(({ path, lastmod }) => ({
    loc: path,
    lastmod,
  }))
})
