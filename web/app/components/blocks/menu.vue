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
      <template v-if="block._type === 'menuSection'">
        <h3 data-test-block-title class="text-center">{{ block.title }}</h3>
        <div class="flex flex-col gap-4 lg:flex-row lg:gap-x-16">
          <div
            v-for="(column, colIndex) in splitInHalf(block.items)"
            :key="colIndex"
            data-test-block-column
            class="flex flex-1 flex-col gap-4"
          >
            <MenuItem
              v-for="(item, itemIndex) in column"
              :key="itemIndex"
              :item="item"
              data-test-block-column-item
            />
          </div>
        </div>
      </template>

      <Collapsible
        v-else-if="block._type === 'accordionMenuSection'"
        class="flex flex-col gap-2"
      >
        <div class="flex items-center justify-center gap-4">
          <h3 data-test-block-title class="text-center">{{ block.title }}</h3>
          <CollapsibleTrigger as-child>
            <Button data-test-toggle size="icon-sm" class="group">
              <Icon
                name="tabler:chevron-down"
                class="group-data-[state=open]:rotate-180 transition-transform duration-300"
              />
              <span class="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div
            class="pt-6 flex flex-col gap-x-4 gap-y-8 lg:grid lg:grid-cols-2 lg:gap-x-16"
          >
            <div
              v-for="(subSection, colIndex) in block.subSections"
              :key="colIndex"
              data-test-block-column
              class="flex flex-col gap-4"
            >
              <h4 data-test-subsection-title class="border-b pb-2">
                {{ subSection.title }}
              </h4>
              <MenuItem
                v-for="(item, itemIndex) in subSection.items"
                :key="itemIndex"
                :item="item"
                data-test-block-column-item
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </section>
</template>
