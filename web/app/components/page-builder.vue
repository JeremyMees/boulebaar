<script lang="ts" setup>
import type { BlockMeta } from '~/types/blocks'

defineProps<
  BlockMeta & {
    content: NonNullable<NonNullable<PageQueryResult>['content']> | null
  }
>()

const blockComponents: Record<string, ReturnType<typeof resolveComponent>> = {}
</script>

<template>
  <template v-if="Array.isArray(content)">
    <div v-for="block in content" :key="block._key">
      <component
        :is="blockComponents[block._type] ?? 'div'"
        v-bind="block"
        :document-id="documentId"
        :document-type="documentType"
      />
    </div>
  </template>
</template>
