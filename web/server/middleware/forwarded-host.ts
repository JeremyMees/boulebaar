import { getHeader } from 'h3'

export default defineEventHandler(event => {
  if (!event.node.req.headers.host) {
    const host =
      getHeader(event, 'x-forwarded-host') ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      new URL(process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000').host

    if (host) {
      event.node.req.headers.host = host
    }
  }

  const xForwardedProto = getHeader(event, 'x-forwarded-proto')
  if (!event.node.req.headers['x-forwarded-proto'] && xForwardedProto) {
    event.node.req.headers['x-forwarded-proto'] = xForwardedProto
  }
})
