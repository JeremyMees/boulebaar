import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://e8dad9acb353e076b5b752d525fd997e@o1373533.ingest.us.sentry.io/4511556903108608',

  sendDefaultPii: true,

  // Tracing
  tracesSampleRate: 1.0,

  // Vue component lifecycle tracking
  integrations: [
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true,
      },
    }),
  ],
})
