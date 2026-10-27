import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CmsImage from '~/components/cms-image.vue'
import { mockImage } from '~~/test/mock'

const mountImage = (props = {}, attrs = {}) =>
  mountSuspended(CmsImage, { props: { image: mockImage, ...props }, attrs })

const src = async (props = {}, attrs = {}) =>
  (await mountImage(props, attrs)).find('img').attributes('src') ?? ''

describe('CmsImage', () => {
  it('renders a Sanity CDN url for the asset', async () => {
    const url = await src()

    expect(url).toContain('cdn.sanity.io')
    expect(url).toContain('abc123-800x600.jpg')
  })

  it('turns the crop into a rect relative to the original size', async () => {
    expect(await src()).toContain('rect=0,60,800,480')
  })

  it('turns the hotspot into a focal point', async () => {
    const url = await src()

    expect(url).toContain('fp-x=0.5')
    expect(url).toContain('fp-y=0.3')
  })

  it('leaves out crop and hotspot when the image has none', async () => {
    const url = await src({
      image: { ...mockImage, crop: undefined, hotspot: undefined },
    })

    expect(url).not.toContain('rect=')
    expect(url).not.toContain('fp-x=')
  })

  it('never upscales by default', async () => {
    expect(await src()).toContain('fit=max')
  })

  it('lets the caller override fit', async () => {
    const url = await src({}, { fit: 'cover' })

    expect(url).not.toContain('fit=max')
    expect(url).toContain('fit=crop')
  })

  it('uses the alt text from the image', async () => {
    const wrapper = await mountImage()

    expect(wrapper.find('img').attributes('alt')).toBe(mockImage.altText)
  })

  it('lets the caller override the alt text', async () => {
    const wrapper = await mountImage({}, { alt: 'Custom alt' })

    expect(wrapper.find('img').attributes('alt')).toBe('Custom alt')
  })

  it('passes other attributes through to the image', async () => {
    const wrapper = await mountImage(
      {},
      { sizes: 'sm:100vw md:50vw', loading: 'lazy', class: 'w-full' },
    )
    const img = wrapper.find('img')

    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('sizes')).toBe('(max-width: 767px) 100vw, 50vw')
    expect(img.classes()).toContain('w-full')
  })

  it.each([
    ['without an asset', { ...mockImage, asset: undefined }],
    ['for null', null],
  ])('renders nothing %s', async (_, image) => {
    const wrapper = await mountImage({ image })

    expect(wrapper.find('img').exists()).toBe(false)
  })
})
