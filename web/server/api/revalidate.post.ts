import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

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

  const paths = await revalidationPaths(parsePayload(body), useSanity(event))

  const results = await Promise.allSettled(
    paths.map(path =>
      $fetch.raw(new URL(path, baseUrl).href, {
        headers: { 'x-prerender-revalidate': vercelBypassToken },
        ignoreResponseError: true,
      }),
    ),
  )

  const failed = paths.filter((_, index) => {
    const result = results[index]
    return result?.status !== 'fulfilled' || result.value.status >= 500
  })

  return { revalidated: paths.length - failed.length, failed }
})

function parsePayload(body: string): RevalidationPayload {
  try {
    return JSON.parse(body) as RevalidationPayload
  } catch {
    return {}
  }
}
