import { describe, expect, it } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ImageHero from '~/components/blocks/image-hero.vue'
import type { SanityImage } from '~/types/blocks'
import { mockConfig, mockImage } from '~~/test/mock'

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(mockConfig) }))

const props = {
  documentId: 'doc-1',
  documentType: 'page',
  blockKey: 'block-1',
  _type: 'imageHero' as const,
  image: mockImage,
  title: 'Test title',
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

  it('renders the content section', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.find('[data-test-content]').exists()).toBe(true)
  })

  it('renders the title in the content section', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.find('[data-test-title]').text()).toBe(props.title)
  })

  it('renders the opening hours component', async () => {
    const wrapper = await mountSuspended(ImageHero, { props })

    expect(wrapper.find('[data-test-opening-hours]').exists()).toBe(true)
  })

  it('renders image without crop or hotspot', async () => {
    const imageNoCropNoHotspot = {
      ...mockImage,
      crop: undefined,
      hotspot: undefined,
    }
    const wrapper = await mountSuspended(ImageHero, {
      props: { ...props, image: imageNoCropNoHotspot },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })

  it('renders image without altText', async () => {
    const imageNoAlt = { ...mockImage, altText: undefined }
    const wrapper = await mountSuspended(ImageHero, {
      props: { ...props, image: imageNoAlt },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })
})
