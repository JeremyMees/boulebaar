import { withLeadingSlash, withoutTrailingSlash } from 'ufo'

interface SanityFetcher {
  fetch: <T>(query: string) => Promise<T>
}

export interface RevalidationPayload {
  _type?: string
  slug?: string | null
  previousSlug?: string | null
}

export interface Page {
  path: string
  lastmod: string
}

const pagesQuery = `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
  }
`

const alwaysRevalidated = ['/llms.txt', '/sitemap.md', '/sitemap.xml']

function toPagePath(slug: string) {
  return withoutTrailingSlash(withLeadingSlash(slug))
}

function toMarkdownPath(path: string) {
  return path === '/' ? '/index.md' : `${path}.md`
}

export async function listPages(client: SanityFetcher): Promise<Page[]> {
  const pages =
    await client.fetch<{ slug: string; _updatedAt: string }[]>(pagesQuery)

  return pages.map(({ slug, _updatedAt }) => ({
    path: toPagePath(slug),
    lastmod: _updatedAt,
  }))
}

export async function revalidationPaths(
  payload: RevalidationPayload,
  client: SanityFetcher,
): Promise<string[]> {
  const changedPaths =
    payload._type === 'page'
      ? [payload.slug, payload.previousSlug]
          .filter((slug): slug is string => !!slug)
          .map(toPagePath)
      : []

  const pagePaths = changedPaths.length
    ? changedPaths
    : (await listPages(client)).map(page => page.path)

  return [
    ...new Set([
      ...pagePaths,
      ...pagePaths.map(toMarkdownPath),
      ...alwaysRevalidated,
    ]),
  ]
}
