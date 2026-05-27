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
})
