import { nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import Navigation from '~/components/navigation.vue'
import { mockConfig } from '~~/test/mock'

let currentConfig = mockConfig

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(currentConfig) }))
mockNuxtImport('useWindowScroll', () => () => ({ y: ref(0) }))
mockNuxtImport('useMediaQuery', () => () => ref(false))

describe('Navigation', () => {
  beforeEach(() => {
    currentConfig = mockConfig
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(Navigation)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the header', async () => {
    const wrapper = await mountSuspended(Navigation)

    expect(wrapper.find('[data-test-navigation]').exists()).toBe(true)
  })

  it('renders the site name as a screen-reader heading', async () => {
    const wrapper = await mountSuspended(Navigation)

    expect(wrapper.find('h1.sr-only').text()).toBe(mockConfig.name)
  })

  it('renders all navigation links in the desktop nav', async () => {
    const wrapper = await mountSuspended(Navigation)
    const nav = wrapper.find('[data-test-navigation-links]')

    mockConfig.navigationLinks
      .map(item => item.name)
      .forEach(name => {
        expect(nav.text()).toContain(name)
      })
  })

  it('shows the open menu button', async () => {
    const wrapper = await mountSuspended(Navigation)

    expect(wrapper.find('[data-test-navigation-open]').exists()).toBe(true)
  })

  it('does not show the overlay by default', async () => {
    const wrapper = await mountSuspended(Navigation)

    expect(wrapper.find('[data-test-navigation-overlay]').exists()).toBe(false)
  })

  it('opens the overlay when the hamburger button is clicked', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-overlay]').exists()).toBe(true)
  })

  it('shows all nav links in the overlay when open', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')
    const overlay = wrapper.find('[data-test-navigation-overlay]')

    mockConfig.navigationLinks
      .map(item => item.name)
      .forEach(name => {
        expect(overlay.text()).toContain(name)
      })
  })

  it('shows numbered index labels in the overlay', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')
    const overlay = wrapper.find('[data-test-navigation-overlay]')

    mockConfig.navigationLinks.forEach((_, i) => {
      expect(overlay.text()).toContain(String(i + 1).padStart(2, '0'))
    })
  })

  it('shows the close button in the overlay', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-close]').exists()).toBe(true)
  })

  it('closes the overlay when the close button is clicked', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')
    await wrapper.find('[data-test-navigation-close]').trigger('click')

    expect(wrapper.find('[data-test-navigation-overlay]').exists()).toBe(false)
  })

  it('closes the overlay on Escape key', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(wrapper.find('[data-test-navigation-overlay]').exists()).toBe(false)
  })

  it('shows the address in the overlay footer', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-address]').text()).toContain(
      mockConfig.address.name,
    )
  })

  it('shows the instagram link in the overlay footer', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-instagram]').exists()).toBe(true)
  })

  it('shows the facebook link in the overlay footer', async () => {
    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-facebook]').exists()).toBe(true)
  })

  it('does not show the instagram link when config has no instagram', async () => {
    currentConfig = { ...mockConfig, instagram: '' }

    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-instagram]').exists()).toBe(
      false,
    )
  })

  it('does not show the facebook link when config has no facebook', async () => {
    currentConfig = { ...mockConfig, facebook: '' }

    const wrapper = await mountSuspended(Navigation)

    await wrapper.find('[data-test-navigation-open]').trigger('click')

    expect(wrapper.find('[data-test-navigation-facebook]').exists()).toBe(false)
  })
})
