<script setup lang="ts">
const { visualEditing } = useSanityConfig()
const state = useSanityVisualEditingState()
const route = useRoute()

const disableUrl = computed(
  () => `/preview/disable?redirect=${encodeURIComponent(route.fullPath)}`,
)

const studioUrl = computed(() => {
  const base = visualEditing?.studioUrl?.replace(/\/$/, '')
  if (!base) return undefined
  return `${base}/presentation/?preview=${encodeURIComponent(route.fullPath)}`
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="state?.enabled && !state.inFrame"
      data-test-preview-banner
      class="fixed inset-x-0 bottom-0 z-5 bg-primary text-sm text-primary-foreground py-4"
    >
      <div
        class="content-container flex flex-wrap gap-y-4 gap-x-10 justify-between items-center"
      >
        <div class="flex gap-2 items-center">
          <Icon name="tabler:eye" size="24" />
          <span class="font-medium">
            Preview-modus actief, je ziet ongepubliceerde wijzigingen.
          </span>
        </div>
        <div class="flex gap-2">
          <Button v-if="studioUrl" as-child size="sm" variant="secondary">
            <NuxtLink
              :to="studioUrl"
              target="_blank"
              rel="noopener"
              data-test-preview-banner-studio
            >
              <Icon name="tabler:external-link" />
              Ga naar Studio
            </NuxtLink>
          </Button>
          <Button as-child size="sm" variant="secondary">
            <NuxtLink :to="disableUrl" data-test-preview-banner-disable>
              <Icon name="tabler:x" />
              Preview afsluiten
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
