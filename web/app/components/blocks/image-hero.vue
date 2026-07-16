<script setup lang="ts">
import type { BlockProps, SanityImage } from '@/types/blocks'

const props = defineProps<BlockProps & ImageHero & { image: SanityImage }>()
const attr = useBlockAttribute(props)
</script>

<template>
  <section>
    <div
      class="h-[60vw] sm:aspect-16/10 sm:h-auto sm:max-h-dvh w-full overflow-hidden"
    >
      <SanityImage
        v-if="image?.asset"
        data-test-image
        :data-sanity="attr('image')"
        :asset-id="image.asset._ref"
        :modifiers="{
          ...(image.crop ? { crop: image.crop } : {}),
          ...(image.hotspot ? { hotspot: image.hotspot } : {}),
        }"
        :alt="stripStega(image.altText)"
        preload
        loading="eager"
        fetchpriority="high"
        class="object-cover w-full h-full"
      />
    </div>
    <div
      data-test-content
      class="content-container py-8 md:pt-16 flex justify-between gap-10"
    >
      <div class="flex flex-col gap-6">
        <h2 data-test-title :data-sanity="attr('title')">
          {{ title }}
        </h2>
        <OpeningHours data-test-opening-hours show-cta />
        <div class="flex gap-1 text-primary">
          <SvgIcon class="size-6" />
          <SvgIcon class="size-6" />
          <SvgIcon class="size-6" />
          <SvgIcon class="size-6" />
        </div>
      </div>
      <div class="hidden md:flex flex-col justify-center text-primary">
        <SvgIcon class="size-50 scale-x-[-1]" />
      </div>
    </div>
  </section>
</template>
