<script setup lang="ts">
import type { BlockMeta, SanityImage } from '@/types/blocks'

const props = defineProps<BlockMeta & { images: SanityImage[] }>()

const isMobile = useMediaQuery('(max-width: 767px)')

const columns = computed(() =>
  distributeIntoColumns(props.images, isMobile.value ? 2 : 3),
)
</script>

<template>
  <section data-test-image-grid class="content-container pt-nav pb-8 md:pb-16">
    <div class="flex gap-3 md:gap-4">
      <div
        v-for="(col, c) in columns"
        :key="c"
        class="flex-1 flex flex-col gap-3 md:gap-4"
      >
        <Motion
          v-for="(image, index) in col"
          :key="index"
          as="div"
          data-test-item
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
            :loading="index < 2 ? 'eager' : 'lazy'"
            class="w-full h-auto"
          />
        </Motion>
      </div>
    </div>
  </section>
</template>
