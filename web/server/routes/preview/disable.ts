export default defineEventHandler(async event => {
  const { redirect } = getQuery(event)

  deleteCookie(event, SANITY_PREVIEW_COOKIE, previewCookieOptions)
  deleteCookie(event, VERCEL_BYPASS_COOKIE, previewCookieOptions)

  await sendRedirect(event, redirect?.toString() || '/')
})
