<script setup lang="ts">
const isInEditor = useIsSanityPresentationTool()
const hasFinePointer = useMediaQuery('(pointer: fine)')
</script>

<template>
  <NuxtRouteAnnouncer />

  <ClientOnly>
    <LazyCursor v-if="hasFinePointer && !isInEditor" />
  </ClientOnly>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
