<script setup lang="ts">
import type { BlockProps, WeServeBlock } from '@/types/blocks'

const props = defineProps<BlockProps & WeServeBlock>()
const attr = useBlockAttribute(props)
</script>

<template>
  <section
    data-test-serve
    class="content-container py-8 md:py-16 flex justify-center"
  >
    <SanityLink
      v-bind="link"
      data-test-link
      :data-sanity="attr('link')"
      class="flex flex-col items-center gap-2"
    >
      <h4 data-test-title :data-sanity="attr('title')">
        {{ title }}
      </h4>
      <SanityImage
        v-if="logo?.asset"
        data-test-image
        :data-sanity="attr('logo')"
        :asset-id="logo.asset._ref"
        :alt="stripStega(logo.altText)"
        width="341"
        height="168"
      />
    </SanityLink>
  </section>
</template>
