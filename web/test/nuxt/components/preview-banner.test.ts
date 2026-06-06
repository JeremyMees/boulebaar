import { describe, expect, it, beforeEach } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import PreviewBanner from '~/components/preview-banner.vue'

type VisualEditingState =
  | { enabled: boolean; inFrame: boolean | undefined }
  | undefined

const STUDIO_URL = 'https://test.sanity.studio'
const ENCODED_PATH = encodeURIComponent('/')

let state: VisualEditingState
let studioUrl: string | undefined

mockNuxtImport('useSanityVisualEditingState', () => () => state)
mockNuxtImport('useSanityConfig', () => () => ({
  visualEditing: { studioUrl },
}))

describe('PreviewBanner', () => {
  beforeEach(() => {
    state = { enabled: true, inFrame: false }
    studioUrl = STUDIO_URL
  })

  it('matches snapshot when visible', async () => {
    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the banner when preview mode is enabled and not framed', async () => {
    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner]').exists()).toBe(true)
  })

  it('shows the preview-mode message', async () => {
    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner]').text()).toContain(
      'Preview-modus actief',
    )
  })

  it('does not render when preview mode is disabled', async () => {
    state = { enabled: false, inFrame: false }

    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner]').exists()).toBe(false)
  })

  it('does not render inside the Studio iframe', async () => {
    state = { enabled: true, inFrame: true }
    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner]').exists()).toBe(false)
  })

  it('does not render when visual editing state is undefined', async () => {
    state = undefined
    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner]').exists()).toBe(false)
  })

  it('links the disable button to the disable route with the current path', async () => {
    const wrapper = await mountSuspended(PreviewBanner)
    const href = wrapper
      .find('[data-test-preview-banner-disable]')
      .attributes('href')

    expect(href).toBe(`/preview/disable?redirect=${ENCODED_PATH}`)
  })

  it('links the studio button to the Presentation tool for the current path', async () => {
    const wrapper = await mountSuspended(PreviewBanner)
    const link = wrapper.find('[data-test-preview-banner-studio]')

    expect(link.attributes('href')).toBe(
      `${STUDIO_URL}/presentation/?preview=${ENCODED_PATH}`,
    )
  })

  it('opens the studio link in a new tab safely', async () => {
    const wrapper = await mountSuspended(PreviewBanner)
    const link = wrapper.find('[data-test-preview-banner-studio]')

    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toContain('noopener')
  })

  it('strips a trailing slash from the studio URL', async () => {
    studioUrl = `${STUDIO_URL}/`
    const wrapper = await mountSuspended(PreviewBanner)

    expect(
      wrapper.find('[data-test-preview-banner-studio]').attributes('href'),
    ).toBe(`${STUDIO_URL}/presentation/?preview=${ENCODED_PATH}`)
  })

  it('does not render the studio button when no studio URL is configured', async () => {
    studioUrl = undefined

    const wrapper = await mountSuspended(PreviewBanner)

    expect(wrapper.find('[data-test-preview-banner-studio]').exists()).toBe(
      false,
    )
    expect(wrapper.find('[data-test-preview-banner-disable]').exists()).toBe(
      true,
    )
  })
})
