import { defineComponent, h } from 'vue'
import { config } from '@vue/test-utils'

config.global.stubs = {
  ...config.global.stubs,
  SanityImage: defineComponent({
    name: 'SanityImage',
    props: {
      assetId: { type: String, required: true },
      alt: String,
    },
    setup(props, { attrs }) {
      return () =>
        h('img', {
          src: `https://cdn.sanity.io/images/test/test/${props.assetId}`,
          alt: props.alt,
          ...attrs,
        })
    },
  }),
}
