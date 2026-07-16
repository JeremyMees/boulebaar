<script setup lang="ts">
import type { BlockProps, InfoColumnsBlock } from '@/types/blocks'

const props = defineProps<BlockProps & InfoColumnsBlock>()
const attr = useBlockAttribute(props)
</script>

<template>
  <section
    data-test-info-columns
    class="content-container py-8 md:py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
  >
    <div
      v-for="(column, index) in columns"
      :key="column._key ?? index"
      class="flex flex-col gap-6 md:gap-10"
    >
      <SanityImage
        v-if="column.image?.asset"
        data-test-image
        :data-sanity="attr('columns', { _key: column._key }, 'image')"
        :asset-id="column.image.asset._ref"
        :modifiers="{
          ...(column.image.crop ? { crop: column.image.crop } : {}),
          ...(column.image.hotspot ? { hotspot: column.image.hotspot } : {}),
        }"
        :alt="stripStega(column.image.altText)"
        sizes="100vw md:50vw lg:33vw"
        class="object-cover w-full aspect-10/12"
      />
      <div data-test-content class="flex flex-col gap-2">
        <p
          class="font-semibold"
          :data-sanity="attr('columns', { _key: column._key }, 'title')"
        >
          {{ column.title }}
        </p>
        <div
          v-if="column.text"
          data-test-text
          :data-sanity="attr('columns', { _key: column._key }, 'text')"
          class="[&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-muted-foreground [&_a]:underline"
        >
          <Richtext :value="column.text" />
        </div>
      </div>
    </div>
  </section>
</template>
