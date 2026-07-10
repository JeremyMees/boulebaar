import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { withoutTrailingSlash } from 'ufo'

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

  const urls = await $fetch<{ loc: string }[]>('/api/__sitemap__/urls')
  const paths = [...new Set(urls.map(({ loc }) => withoutTrailingSlash(loc)))]

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
