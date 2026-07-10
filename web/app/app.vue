<script setup lang="ts">
const isInEditor = useIsSanityPresentationTool()
</script>

<template>
  <NuxtRouteAnnouncer />

  <ClientOnly>
    <Cursor v-if="!isInEditor" />
  </ClientOnly>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
