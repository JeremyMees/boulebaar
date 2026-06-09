<script lang="ts" setup>
import type { BlockTypeName } from '#cms/schemaTypes/constants'
import type { BlockMeta } from '~/types/blocks'

defineProps<
  BlockMeta & {
    content: NonNullable<NonNullable<PageQueryResult>['content']> | null
  }
>()

const blockComponents: Record<
  BlockTypeName,
  ReturnType<typeof resolveComponent>
> = {
  imageHero: resolveComponent('BlocksImageHero'),
  infoColumns: resolveComponent('BlocksInfoColumns'),
  menu: resolveComponent('BlocksMenu'),
  imageGrid: resolveComponent('BlocksImageGrid'),
}
</script>

<template>
  <template v-if="Array.isArray(content)">
    <div
      v-for="block in content"
      :key="block._key"
      data-test-page-builder-block
    >
      <component
        :is="blockComponents[block._type] ?? 'div'"
        v-bind="block"
        :document-id="documentId"
        :document-type="documentType"
      />
    </div>
  </template>
</template>
