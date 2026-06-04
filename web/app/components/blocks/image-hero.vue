<script setup lang="ts">
import type { BlockMeta, SanityImage } from '@/types/blocks'

defineProps<BlockMeta & ImageHero & { image: SanityImage }>()
</script>

<template>
  <section>
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

    <div
      data-test-content
      class="content-container py-8 md:pt-16 flex justify-between gap-10"
    >
      <div class="flex flex-col gap-6">
        <div class="w-14 h-0.5 bg-foreground" />
        <div class="richtext max-w-prose">
          <Richtext :value="text" />
        </div>
      </div>
      <div class="hidden md:block text-primary">
        <Icon name="boulebaar:icon" size="200" class="scale-x-[-1]" />
      </div>
    </div>
  </section>
</template>
