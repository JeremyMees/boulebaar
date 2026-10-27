<script lang="ts" setup>
import {
  withQuery,
  withFragment,
  parseQuery,
  parseURL,
  withLeadingSlash,
  hasProtocol,
} from 'ufo'
import type { SanityLink } from '~/types/blocks'
import type { HTMLAttributes } from 'vue'

const BLOCKED_PROTOCOLS = new Set(['javascript', 'vbscript', 'data'])

const props = defineProps<
  SanityLink & {
    class?: HTMLAttributes['class']
  }
>()

const to = computed(() => {
  const urlTo = props.url
  if (!urlTo) return undefined

  const { protocol } = parseURL(urlTo)
  if (protocol && BLOCKED_PROTOCOLS.has(protocol.replace(':', '')))
    return undefined

  let result = hasProtocol(urlTo) ? urlTo : withLeadingSlash(urlTo)

  if (props.parameters) {
    result = withQuery(result, parseQuery(props.parameters))
  }

  if (props.anchor) {
    result = withFragment(result, props.anchor.replace(/^#/, ''))
  }

  return result
})
</script>

<template>
  <NuxtLink
    v-if="to"
    data-test-sanity-link
    :to="to"
    :target="blank ? '_blank' : null"
    :class="props.class"
  >
    <slot />
  </NuxtLink>
</template>
