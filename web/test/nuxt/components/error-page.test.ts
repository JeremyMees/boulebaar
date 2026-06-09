import { describe, expect, it, beforeEach } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import ErrorPage from '~/components/error-page.vue'
import { mockConfig } from '~~/test/mock'

let currentConfig = mockConfig

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(currentConfig) }))

describe('ErrorPage', () => {
  beforeEach(() => {
    currentConfig = mockConfig
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the error section', async () => {
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.find('[data-test-error-page]').exists()).toBe(true)
  })

  it('renders the 404 heading', async () => {
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.find('[data-test-error-page]').text()).toContain('404')
  })

  it('shows the email section when config has an email', async () => {
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.find('[data-test-error-email]').exists()).toBe(true)
    expect(wrapper.find('[data-test-error-email]').text()).toContain(
      mockConfig.email,
    )
  })

  it('does not show the email section when config has no email', async () => {
    currentConfig = { ...mockConfig, email: '' }
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.find('[data-test-error-email]').exists()).toBe(false)
  })

  it('does not show the email section when config is null', async () => {
    currentConfig = null as unknown as typeof mockConfig
    const wrapper = await mountSuspended(ErrorPage)

    expect(wrapper.find('[data-test-error-email]').exists()).toBe(false)
  })
})
