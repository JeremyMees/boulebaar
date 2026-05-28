<script lang="ts" setup>
import type {
  PortableTextComponents,
  PortableTextComponentProps,
} from '@nuxtjs/sanity/runtime/types'
import type { PortableTextValue } from '~/types/blocks'

defineProps<{
  value: PortableTextValue
  components?: PortableTextComponents
}>()

const customComponents: PortableTextComponents['types'] = {
  inlineLink: ({ value }: PortableTextComponentProps<InlineLink>) =>
    h(resolveComponent('SanityLink'), { ...value.link }, () => value.label),
}
</script>

<template>
  <SanityContent
    v-if="value"
    data-test-richtext
    :value="value"
    :components="{
      ...components,
      types: {
        ...customComponents,
        ...components?.types,
      },
    }"
  />
</template>
