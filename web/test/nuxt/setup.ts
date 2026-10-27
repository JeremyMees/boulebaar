import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { config } from '@vue/test-utils'
import type { SanityImage } from '~/types/blocks'

config.global.stubs = {
  ...config.global.stubs,
  CmsImage: defineComponent({
    name: 'CmsImage',
    props: {
      image: { type: Object as PropType<SanityImage | null>, default: null },
    },
    setup(props, { attrs }) {
      return () =>
        props.image?.asset
          ? h('img', {
              src: `https://cdn.sanity.io/images/test/test/${props.image.asset._ref}`,
              alt: props.image.altText,
              ...attrs,
            })
          : null
    },
  }),
}
