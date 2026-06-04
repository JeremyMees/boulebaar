<script setup lang="ts">
import type { BlockMeta, SanityImage } from '@/types/blocks'
import type { ImageHero } from '#imports'

defineProps<BlockMeta & ImageHero & { image: SanityImage }>()
</script>

<template>
  <div class="h-[60vw] sm:h-auto max-h-125 w-full overflow-hidden">
    <SanityImage
      v-if="image?.asset"
      data-test-image
      :asset-id="image.asset._ref"
      :modifiers="{ crop: image.crop, hotspot: image.hotspot }"
      :alt="image.altText"
      preload
      class="object-cover w-full h-full"
    />
  </div>
</template>
