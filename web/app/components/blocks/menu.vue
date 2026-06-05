<script setup lang="ts">
import type { BlockMeta } from '@/types/blocks'

defineProps<BlockMeta & Menu>()
</script>

<template>
  <section
    id="menu"
    class="content-container max-w-300 flex flex-col gap-4 py-8 md:py-16"
  >
    <h2 data-test-title>{{ title }}</h2>
    <div
      v-for="(block, index) in menuBlock"
      :key="index"
      data-test-block
      class="py-8 flex flex-col gap-6 border-t last:border-b"
    >
      <h3 data-test-block-title class="text-center">{{ block.title }}</h3>
      <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-16">
        <div
          v-for="(column, colIndex) in splitInHalf(block.items)"
          :key="colIndex"
          data-test-block-column
          class="flex flex-col gap-4"
        >
          <div
            v-for="(item, itemIndex) in column"
            :key="itemIndex"
            data-test-block-column-item
            class="flex flex-col gap-0.5"
          >
            <div class="flex items-center justify-between">
              <h4 data-test-item-name class="relative">
                {{ item.name }}
                <span
                  v-if="item.vegan"
                  data-test-vegan
                  class="absolute top-0 -right-4 text-xs font-bold"
                >
                  vg
                </span>
              </h4>
              <small data-test-item-price>
                {{ item.price }}
              </small>
            </div>
            <small v-if="item.ingredients" data-test-item-description>
              {{ item.ingredients }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
