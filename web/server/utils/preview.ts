export const SANITY_PREVIEW_COOKIE = 'sanity-preview-id'
export const VERCEL_BYPASS_COOKIE = '__prerender_bypass'

export const previewCookieOptions = {
  httpOnly: true,
  sameSite: import.meta.dev ? ('lax' as const) : ('none' as const),
  secure: !import.meta.dev,
  path: '/',
}
