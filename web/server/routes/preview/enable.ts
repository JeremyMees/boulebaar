import { createError, setCookie, sendRedirect, getRequestHeader } from 'h3'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import defu from 'defu'

export default defineEventHandler(async event => {
  const $config = useRuntimeConfig(event)
  const sanity = useSanity()
  const sanityConfig = defu($config.sanity, $config.public.sanity)

  const client = sanity.client.withConfig({
    token:
      sanityConfig.visualEditing && 'token' in sanityConfig.visualEditing
        ? sanityConfig.visualEditing.token
        : undefined,
  })

  // Construct the full URL manually to avoid getRequestURL bugs in H3 v2 RC
  // when deployed on Vercel (where event.url may be a relative path).
  const host =
    getRequestHeader(event, 'x-forwarded-host') ||
    getRequestHeader(event, 'host') ||
    'localhost'
  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const rawPath = event.node.req.url || '/preview/enable'
  const requestUrl = new URL(rawPath, `${proto}://${host}`).toString()

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    requestUrl,
  )

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid secret' })
  }

  const id: string =
    sanityConfig.visualEditing && 'previewModeId' in sanityConfig.visualEditing
      ? ((sanityConfig.visualEditing.previewModeId as string) ?? '')
      : ''

  setCookie(event, 'sanity-preview-id', id, {
    httpOnly: true,
    sameSite: import.meta.dev ? 'lax' : 'none',
    secure: !import.meta.dev,
    path: '/',
  })

  await sendRedirect(event, redirectTo, 307)
})
