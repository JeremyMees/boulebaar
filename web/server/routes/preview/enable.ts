import { createClient } from '@sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const { projectId, dataset, apiVersion } = config.public.sanity
  const { token, previewModeId } = config.sanity.visualEditing

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    getRequestURL(event).toString(),
  )

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid secret' })
  }

  setCookie(event, SANITY_PREVIEW_COOKIE, previewModeId, previewCookieOptions)

  const { vercelBypassToken } = config
  if (vercelBypassToken) {
    setCookie(
      event,
      VERCEL_BYPASS_COOKIE,
      vercelBypassToken,
      previewCookieOptions,
    )
  }

  await sendRedirect(event, redirectTo, 307)
})
