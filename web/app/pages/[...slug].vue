<script setup lang="ts">
import { withLeadingSlash } from 'ufo'

const route = useRoute()

const slug = computed(() => {
  return Array.isArray(route.params.slug)
    ? withLeadingSlash(String(route.params.slug.join('/')))
    : withLeadingSlash(String(route.params.slug ?? ''))
})

const { data } = await useSanityQuery<PageQueryResult>(pageQuery, {
  slug: slug.value,
})
</script>

<template>
  <div v-if="data">
    <PageBuilder
      v-if="data._type === 'page'"
      :document-id="data._id"
      :document-type="data._type"
      :content="data.content"
    />
  </div>
  <ErrorPage v-else />
</template>
