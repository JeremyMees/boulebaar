<script setup lang="ts">
import type { BlockProps, SanityImage } from '@/types/blocks'

const props = defineProps<
  BlockProps & { images: Array<SanityImage & { _key: string }> }
>()
const attr = useBlockAttribute(props)

const layouts = computed(() => [
  {
    count: 2,
    class: 'flex md:hidden',
    columns: distributeIntoColumns(props.images, 2),
  },
  {
    count: 3,
    class: 'hidden md:flex',
    columns: distributeIntoColumns(props.images, 3),
  },
])
</script>

<template>
  <section data-test-image-grid class="content-container pt-nav pb-8 md:pb-16">
    <div
      v-for="layout in layouts"
      :key="layout.count"
      :data-test-layout="layout.count"
      class="gap-3 md:gap-4"
      :class="layout.class"
    >
      <div
        v-for="(col, c) in layout.columns"
        :key="c"
        class="flex-1 flex flex-col gap-3 md:gap-4"
      >
        <Motion
          v-for="(image, index) in col"
          :key="index"
          as="div"
          data-test-item
          :initial="index < 2 ? false : { opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.45, ease: 'easeOut' }"
        >
          <CmsImage
            :image="image"
            data-test-image
            :data-sanity="image && attr('images', { _key: image._key })"
            sizes="sm:50vw md:33vw lg:33vw xl:33vw 2xl:33vw"
            :loading="index < 2 ? 'eager' : 'lazy'"
            class="w-full h-auto"
          />
        </Motion>
      </div>
    </div>
  </section>
</template>
