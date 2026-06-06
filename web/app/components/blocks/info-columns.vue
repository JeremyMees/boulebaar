<script setup lang="ts">
import type { BlockMeta, InfoColumnsBlock } from '@/types/blocks'

defineProps<BlockMeta & InfoColumnsBlock>()
</script>

<template>
  <section
    data-test-info-columns
    class="content-container py-8 md:py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
  >
    <div
      v-for="(column, index) in columns"
      :key="index"
      class="flex flex-col gap-6 md:gap-10"
    >
      <SanityImage
        v-if="column.image?.asset"
        data-test-image
        :asset-id="column.image.asset._ref"
        :modifiers="{
          ...(column.image.crop ? { crop: column.image.crop } : {}),
          ...(column.image.hotspot ? { hotspot: column.image.hotspot } : {}),
        }"
        :alt="column.image.altText"
        sizes="100vw md:50vw lg:33vw"
        class="object-cover w-full aspect-10/12"
      />
      <div data-test-content class="flex flex-col gap-2">
        <p class="font-semibold">{{ column.title }}</p>
        <OpeningHours
          v-if="column._type === 'openingHoursColumn'"
          show-cta
          data-test-opening-hours
        />
        <div
          v-else-if="column._type === 'textColumn' && column.text"
          data-test-text
          class="[&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-muted-foreground"
        >
          <Richtext :value="column.text" />
        </div>
      </div>
    </div>
  </section>
</template>
