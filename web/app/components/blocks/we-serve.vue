<script setup lang="ts">
import type { BlockMeta, WeServeBlock } from '@/types/blocks'

defineProps<BlockMeta & WeServeBlock>()
</script>

<template>
  <section
    data-test-serve
    class="content-container py-8 md:py-16 flex justify-center"
  >
    <SanityLink
      v-bind="link"
      data-test-link
      class="flex flex-col items-center gap-2"
    >
      <h4 data-test-title>
        {{ title }}
      </h4>
      <SanityImage
        v-if="logo?.asset"
        data-test-image
        :asset-id="logo.asset._ref"
        :alt="stripStega(logo.altText)"
        width="341"
        height="168"
      />
    </SanityLink>
  </section>
</template>
