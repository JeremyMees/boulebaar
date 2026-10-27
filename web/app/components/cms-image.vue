<script setup lang="ts">
import type { SanityImage } from '~/types/blocks'

const props = defineProps<{ image: SanityImage | null | undefined }>()

const modifiers = computed(() => ({
  ...(props.image?.crop ? { crop: props.image.crop } : {}),
  ...(props.image?.hotspot ? { hotspot: props.image.hotspot } : {}),
}))
</script>

<template>
  <NuxtImg
    v-if="image?.asset"
    provider="sanity"
    :src="image.asset._ref"
    :modifiers="modifiers"
    :alt="stripStega(image.altText)"
    fit="max"
  />
</template>
