import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'cicps48l',
    dataset: 'production',
  },
  deployment: {
    appId: 'rcn09xu63bu8ohmxm3vgkb6r',
    autoUpdates: true,
  },
  typegen: {
    path: '../web/shared/utils/sanity-queries.ts',
    schema: './schema.json',
    generates: '../web/shared/types/sanity.ts',
  },
})
