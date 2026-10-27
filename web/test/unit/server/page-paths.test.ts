import { describe, expect, it, vi } from 'vitest'
import { listPages, revalidationPaths } from '../../../server/utils/page-paths'

const aiAndSitemapFiles = ['/llms.txt', '/sitemap.md', '/sitemap.xml']

const fakeClient = (pages: { slug: string; _updatedAt?: string }[] = []) => ({
  fetch: vi
    .fn()
    .mockResolvedValue(
      pages.map(page => ({ _updatedAt: '2026-10-27T12:00:00Z', ...page })),
    ),
})

describe('listPages', () => {
  it('returns a path and lastmod for each page', async () => {
    const client = fakeClient([
      { slug: '/', _updatedAt: '2026-10-01T00:00:00Z' },
      { slug: 'vibe', _updatedAt: '2026-10-02T00:00:00Z' },
    ])

    expect(await listPages(client)).toEqual([
      { path: '/', lastmod: '2026-10-01T00:00:00Z' },
      { path: '/vibe', lastmod: '2026-10-02T00:00:00Z' },
    ])
  })

  it('normalises slugs to a leading and no trailing slash', async () => {
    const client = fakeClient([{ slug: 'menu/' }, { slug: '/about/' }])

    expect((await listPages(client)).map(page => page.path)).toEqual([
      '/menu',
      '/about',
    ])
  })
})

describe('revalidationPaths', () => {
  it('revalidates a changed page, its markdown and the AI and sitemap files', async () => {
    const client = fakeClient()

    expect(
      await revalidationPaths({ _type: 'page', slug: 'vibe' }, client),
    ).toEqual(['/vibe', '/vibe.md', ...aiAndSitemapFiles])
    expect(client.fetch).not.toHaveBeenCalled()
  })

  it('uses /index.md for the home page', async () => {
    const paths = await revalidationPaths(
      { _type: 'page', slug: '/' },
      fakeClient(),
    )

    expect(paths).toContain('/')
    expect(paths).toContain('/index.md')
  })

  it('revalidates both the old and new path when a page is renamed', async () => {
    const paths = await revalidationPaths(
      { _type: 'page', slug: 'menu', previousSlug: 'kaart' },
      fakeClient(),
    )

    expect(paths).toEqual([
      '/menu',
      '/kaart',
      '/menu.md',
      '/kaart.md',
      ...aiAndSitemapFiles,
    ])
  })

  it('revalidates the old path when a page is deleted or unpublished', async () => {
    const paths = await revalidationPaths(
      { _type: 'page', slug: null, previousSlug: 'kaart' },
      fakeClient(),
    )

    expect(paths).toEqual(['/kaart', '/kaart.md', ...aiAndSitemapFiles])
  })

  it('does not repeat a path when the slug did not change', async () => {
    const paths = await revalidationPaths(
      { _type: 'page', slug: 'vibe', previousSlug: '/vibe/' },
      fakeClient(),
    )

    expect(paths).toEqual(['/vibe', '/vibe.md', ...aiAndSitemapFiles])
  })

  it('revalidates every page for other document types like the global config', async () => {
    const client = fakeClient([{ slug: '/' }, { slug: 'vibe' }])

    expect(await revalidationPaths({ _type: 'config' }, client)).toEqual([
      '/',
      '/vibe',
      '/index.md',
      '/vibe.md',
      ...aiAndSitemapFiles,
    ])
  })

  it('revalidates every page when a page payload has no slugs', async () => {
    const client = fakeClient([{ slug: 'vibe' }])

    expect(await revalidationPaths({ _type: 'page' }, client)).toEqual([
      '/vibe',
      '/vibe.md',
      ...aiAndSitemapFiles,
    ])
  })

  it('revalidates every page for an empty payload', async () => {
    const client = fakeClient([{ slug: 'vibe' }])

    expect(await revalidationPaths({}, client)).toContain('/vibe')
  })
})
