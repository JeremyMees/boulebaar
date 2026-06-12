import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import WeServe from '~/components/blocks/we-serve.vue'
import { mockImage } from '~~/test/mock'

const baseMeta = {
  documentId: 'doc-1',
  documentType: 'page',
}

const baseLink = {
  _type: 'link' as const,
  type: 'external',
  url: 'https://example.com',
  blank: false,
}

const baseProps = {
  ...baseMeta,
  _type: 'weServe' as const,
  title: 'We serve great food',
  link: baseLink,
  logo: null,
}

describe('WeServe', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(WeServe, { props: baseProps })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the section', async () => {
    const wrapper = await mountSuspended(WeServe, { props: baseProps })

    expect(wrapper.find('[data-test-serve]').exists()).toBe(true)
  })

  it('renders the title', async () => {
    const wrapper = await mountSuspended(WeServe, { props: baseProps })

    expect(wrapper.find('[data-test-title]').text()).toContain(baseProps.title)
  })

  it('renders the link', async () => {
    const wrapper = await mountSuspended(WeServe, { props: baseProps })

    expect(wrapper.find('[data-test-link]').exists()).toBe(true)
  })

  it('does not render the image when logo is null', async () => {
    const wrapper = await mountSuspended(WeServe, { props: baseProps })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })

  it('renders the image when logo has an asset', async () => {
    const wrapper = await mountSuspended(WeServe, {
      props: { ...baseProps, logo: mockImage },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })

  it('does not render the image when logo has no asset', async () => {
    const wrapper = await mountSuspended(WeServe, {
      props: {
        ...baseProps,
        logo: { _type: 'image' as const, altText: 'Logo' },
      },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })
})
