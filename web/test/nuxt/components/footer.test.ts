import { describe, expect, it, beforeEach } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '~/components/footer.vue'
import { mockConfig } from '~~/test/mock'

let currentConfig = mockConfig

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(currentConfig) }))

describe('Footer', () => {
  beforeEach(() => {
    currentConfig = mockConfig
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(Footer)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the footer', async () => {
    const wrapper = await mountSuspended(Footer)

    expect(wrapper.find('[data-test-footer]').exists()).toBe(true)
  })

  it('renders the wordmark', async () => {
    const wrapper = await mountSuspended(Footer)

    expect(wrapper.find('[data-test-footer-wordmark]').exists()).toBe(true)
  })

  it('does not render links when they are undefined', async () => {
    currentConfig = {
      ...mockConfig,
      number: '',
      email: '',
      instagram: '',
      facebook: '',
      address: {
        ...mockConfig.address,
        link: { ...mockConfig.address.link, url: undefined } as Link,
      },
    }

    const wrapper = await mountSuspended(Footer)

    expect(wrapper.find('[data-test-address]').exists()).toBe(false)
    expect(wrapper.find('[data-test-number]').exists()).toBe(false)
    expect(wrapper.find('[data-test-email]').exists()).toBe(false)
    expect(wrapper.find('[data-test-instagram]').exists()).toBe(false)
    expect(wrapper.find('[data-test-facebook]').exists()).toBe(false)
  })

  it('renders links when the values are provided', async () => {
    const wrapper = await mountSuspended(Footer)

    expect(wrapper.find('[data-test-address]').exists()).toBe(true)
    expect(wrapper.find('[data-test-address]').text()).toContain(
      mockConfig.address.name,
    )
    expect(wrapper.find('[data-test-number]').exists()).toBe(true)
    expect(wrapper.find('[data-test-number]').text()).toContain(
      '+32 11 00 00 00',
    )
    expect(wrapper.find('[data-test-email]').exists()).toBe(true)
    expect(wrapper.find('[data-test-email]').text()).toContain(
      'info@boulebaar.be',
    )
    expect(wrapper.find('[data-test-instagram]').exists()).toBe(true)
    expect(wrapper.find('[data-test-facebook]').exists()).toBe(true)
  })

  it('renders the copyright with the current year', async () => {
    const wrapper = await mountSuspended(Footer)
    const copyright = wrapper.find('[data-test-footer-copyright]')

    expect(copyright.exists()).toBe(true)
    expect(copyright.text()).toContain(String(new Date().getFullYear()))
  })
})
