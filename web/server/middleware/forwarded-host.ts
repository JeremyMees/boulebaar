import { getHeader } from 'h3'

export default defineEventHandler(event => {
  const xForwardedHost = getHeader(event, 'x-forwarded-host')
  const xForwardedProto = getHeader(event, 'x-forwarded-proto')

  if (xForwardedHost) {
    event.node.req.headers.host = xForwardedHost
  }
  if (xForwardedProto) {
    event.node.req.headers['x-forwarded-proto'] = xForwardedProto
  }
})
