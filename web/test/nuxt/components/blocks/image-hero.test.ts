import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ImageHero from '~/components/blocks/image-hero.vue'
import { mockImage } from '~~/test/mock'

const props = {
  documentId: 'doc-1',
  documentType: 'page',
  _type: 'imageHero' as const,
  image: mockImage,
}

describe('ImageHero', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the image when image prop is provided', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })

  it('does not render the image when image prop is absent', async () => {
    const wrapper = await mountSuspended(ImageHero, {
      props: { ...props, image: undefined as unknown as SanityImage },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })

  it('generates a Sanity CDN url containing the asset hash', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })
    const src = wrapper.find('[data-test-image]').attributes('src') ?? ''

    expect(src).toContain('cdn.sanity.io')
    expect(src).toContain('abc123-800x600')
  })

  it('passes alt text to the image', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.find('[data-test-image]').attributes('alt')).toBe(
      mockImage.altText,
    )
  })
})
