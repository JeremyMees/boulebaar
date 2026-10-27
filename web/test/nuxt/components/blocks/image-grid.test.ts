import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ImageGrid from '~/components/blocks/image-grid.vue'
import { mockImage } from '~~/test/mock'

const props = {
  documentId: 'doc-1',
  documentType: 'page',
  blockKey: 'block-1',
  images: [mockImage, mockImage, mockImage],
}

const desktop = '[data-test-layout="3"]'
const mobile = '[data-test-layout="2"]'

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

    expect(wrapper.findAll(`${desktop} [data-test-item]`)).toHaveLength(
      props.images.length,
    )
  })

  it('renders an image for each item with an asset', async () => {
    const wrapper = await mountSuspended(ImageGrid, { props })

    expect(wrapper.findAll(`${desktop} [data-test-image]`)).toHaveLength(
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

  it('loads the first 2 images in each column eagerly', async () => {
    const images = Array.from({ length: 9 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })
    const allImages = wrapper.findAll(`${desktop} [data-test-image]`)

    ;[0, 1, 3, 4, 6, 7].forEach(i => {
      expect(allImages[i]?.attributes('loading')).toBe('eager')
    })
  })

  it('loads images beyond the first 2 in each column lazily', async () => {
    const images = Array.from({ length: 9 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })
    const allImages = wrapper.findAll(`${desktop} [data-test-image]`)

    ;[2, 5, 8].forEach(i => {
      expect(allImages[i]?.attributes('loading')).toBe('lazy')
    })
  })

  it('renders nothing when images array is empty', async () => {
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images: [] },
    })

    expect(wrapper.findAll('[data-test-item]')).toHaveLength(0)
  })

  it('renders a 2 column layout for mobile and a 3 column layout for desktop', async () => {
    const images = Array.from({ length: 4 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })

    expect(wrapper.find(mobile).classes()).toContain('md:hidden')
    expect(wrapper.find(desktop).classes()).toContain('md:flex')
    expect(wrapper.findAll(`${mobile} > div`)).toHaveLength(2)
    expect(wrapper.findAll(`${desktop} > div`)).toHaveLength(3)
    expect(wrapper.findAll(`${mobile} [data-test-item]`)).toHaveLength(4)
    expect(wrapper.findAll(`${desktop} [data-test-item]`)).toHaveLength(4)
  })

  it('shows the first 2 rows without waiting for the fade in', async () => {
    const images = Array.from({ length: 9 }, () => mockImage)
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images },
    })
    const items = wrapper.findAll(`${desktop} [data-test-item]`)

    ;[0, 1, 3, 4, 6, 7].forEach(i => {
      expect(items[i]?.attributes('style') ?? '').not.toContain('opacity: 0')
    })
    ;[2, 5, 8].forEach(i => {
      expect(items[i]?.attributes('style')).toContain('opacity: 0')
    })
  })

  it('renders images without crop or hotspot', async () => {
    const imageNoCropNoHotspot = {
      ...mockImage,
      crop: undefined,
      hotspot: undefined,
    }
    const wrapper = await mountSuspended(ImageGrid, {
      props: { ...props, images: [imageNoCropNoHotspot] },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })

  it('does not render an image for null entries in the images array', async () => {
    const wrapper = await mountSuspended(ImageGrid, {
      props: {
        ...props,
        images: [null as unknown as SanityImage & { _key: string }],
      },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })
})
