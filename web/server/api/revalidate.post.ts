import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { withLeadingSlash, withoutTrailingSlash } from 'ufo'

type WebhookPayload = {
  _type?: string
  slug?: string
}

export default defineEventHandler(async event => {
  const { revalidateSecret, vercelBypassToken } = useRuntimeConfig(event)
  const { baseUrl } = useRuntimeConfig(event).public
  const signature = getHeader(event, SIGNATURE_HEADER_NAME)
  const body = (await readRawBody(event, 'utf8')) ?? ''

  if (
    !revalidateSecret ||
    !signature ||
    !(await isValidSignature(body, signature, revalidateSecret))
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid signature' })
  }

  if (!vercelBypassToken || !baseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Env variable is not correctly configured',
    })
  }

  const payload = parsePayload(body)

  const paths =
    payload._type === 'page' && payload.slug
      ? [withoutTrailingSlash(withLeadingSlash(payload.slug))]
      : await getAllPaths()

  const results = await Promise.allSettled(
    paths.map(path =>
      $fetch.raw(new URL(path, baseUrl).href, {
        headers: { 'x-prerender-revalidate': vercelBypassToken },
      }),
    ),
  )

  const failed = paths.filter(
    (_, index) => results[index]?.status === 'rejected',
  )

  return { revalidated: paths.length - failed.length, failed }
})

function parsePayload(body: string): WebhookPayload {
  try {
    return JSON.parse(body) as WebhookPayload
  } catch {
    return {}
  }
}

async function getAllPaths(): Promise<string[]> {
  const urls = await $fetch<{ loc: string }[]>('/api/__sitemap__/urls')

  return [...new Set(urls.map(({ loc }) => withoutTrailingSlash(loc)))]
}
