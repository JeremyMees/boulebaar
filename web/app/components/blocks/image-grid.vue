<script setup lang="ts">
import type { BlockMeta, SanityImage } from '@/types/blocks'

defineProps<BlockMeta & { images: SanityImage[] }>()
</script>

<template>
  <section data-test-image-grid class="content-container pt-nav pb-8 md:pb-16">
    <div class="columns-2 md:columns-3 gap-3 md:gap-4">
      <Motion
        v-for="(image, index) in images"
        :key="index"
        as="div"
        data-test-item
        class="break-inside-avoid mb-3 md:mb-4"
        :initial="{ opacity: 0, y: 16 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.1 }"
        :transition="{ duration: 0.45, ease: 'easeOut' }"
      >
        <SanityImage
          v-if="image?.asset"
          data-test-image
          :asset-id="image.asset._ref"
          :modifiers="{
            ...(image.crop ? { crop: image.crop } : {}),
            ...(image.hotspot ? { hotspot: image.hotspot } : {}),
          }"
          :alt="stripStega(image.altText)"
          sizes="50vw md:33vw"
          :loading="index >= 6 ? 'lazy' : 'eager'"
          class="w-full h-auto"
        />
      </Motion>
    </div>
  </section>
</template>
