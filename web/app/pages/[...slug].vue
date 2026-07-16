<script setup lang="ts">
import { withLeadingSlash } from 'ufo'

const route = useRoute()
const navVariant = useState<NavigationVariant>('nav-variant', () => 'default')

const slug = computed(() => {
  const param = route.params.slug ?? ''
  return Array.isArray(param)
    ? withLeadingSlash(param.join('/'))
    : withLeadingSlash(param)
})

const { data } = await useSanityQuery<PageQueryResult>(pageQuery, {
  slug: slug.value,
})

if (import.meta.server && !data.value) {
  setResponseStatus(useRequestEvent()!, 404)
}

useSeo(() => data.value?.seo)

watchEffect(() => {
  const noData = !data.value

  if (noData) navVariant.value = 'simple'

  const hasHero =
    data.value?._type === 'page' &&
    data.value.content?.some(block => block._type === 'imageHero')

  navVariant.value = hasHero ? 'default' : 'simple'
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
