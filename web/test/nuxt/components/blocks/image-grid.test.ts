import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ImageGrid from '~/components/blocks/image-grid.vue'
import { mockImage } from '~~/test/mock'

const props = {
  documentId: 'doc-1',
  documentType: 'page',
  images: [mockImage, mockImage, mockImage],
}

describe('ImageGrid', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the grid', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    expect(wrapper.find('[data-test-image-grid]').exists()).toBe(true)
  })

  it('renders an item for each image', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    expect(wrapper.findAll('[data-test-item]')).toHaveLength(
      props.images.length,
    )
  })

  it('renders an image for each item with an asset', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    expect(wrapper.findAll('[data-test-image]')).toHaveLength(
      props.images.length,
    )
  })

  it('does not render an image when the asset is absent', async () => {
    const wrapper = await mountSuspended(ImageGrid, {
      props: {
        ...props,
        images: [{ ...mockImage, asset: undefined }],
      },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })

  it('passes alt text to each image', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    wrapper.findAll('[data-test-image]').forEach(img => {
      expect(img.attributes('alt')).toBe(mockImage.altText)
    })
  })

  it('generates a Sanity CDN url containing the asset hash', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })
    const src = wrapper.find('[data-test-image]').attributes('src') ?? ''

    expect(src).toContain('cdn.sanity.io')
    expect(src).toContain('abc123-800x600')
  })

  it('loads the first 6 images eagerly', async () => {
    const images = Array.from({ length: 8 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })
    const allImages = wrapper.findAll('[data-test-image]')

    allImages.slice(0, 6).forEach(img => {
      expect(img.attributes('loading')).toBe('eager')
    })
  })

  it('loads images from index 6 onward lazily', async () => {
    const images = Array.from({ length: 8 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })
    const allImages = wrapper.findAll('[data-test-image]')

    allImages.slice(6).forEach(img => {
      expect(img.attributes('loading')).toBe('lazy')
    })
  })

  it('renders nothing when images array is empty', async () => {
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images: [] },
    })

    expect(wrapper.findAll('[data-test-item]')).toHaveLength(0)
  })
})
