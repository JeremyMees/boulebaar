import * as Sentry from '@sentry/nuxt'

if (!import.meta.dev) {
  Sentry.init({
    dsn: 'https://e8dad9acb353e076b5b752d525fd997e@o1373533.ingest.us.sentry.io/4511556903108608',
    tracesSampleRate: 0.1,

    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: {
        request: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
        response: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
      },
      httpBodies: [],
      urlQueryParams: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
      genAI: { inputs: false, outputs: false },
      databaseQueryData: false,
      queues: false,
      graphQL: { document: false, variables: false },
    },
  })
}
