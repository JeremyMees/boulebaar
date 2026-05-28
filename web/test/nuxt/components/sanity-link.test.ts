import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SanityLink from '~/components/sanity-link.vue'

const props = {
  url: 'https://example.com',
}

const slots = {
  default: 'Click me',
}

describe('SanityLink', () => {
  it('matches snapshot for a basic link', async () => {
    const wrapper = await mountSuspended(SanityLink, { props, slots })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot for a link with all options', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: {
        url: '/page',
        blank: true,
        parameters: 'utm_source=test',
        anchor: 'section',
      },
      slots: { default: 'Full link' },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot when url is undefined', async () => {
    const wrapper = await mountSuspended(SanityLink, { props: {} })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a link for a valid URL', async () => {
    const wrapper = await mountSuspended(SanityLink, { props, slots })

    expect(wrapper.find('[data-test-sanity-link]').exists()).toBeTruthy()
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders nothing when url is undefined', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: {},
    })

    expect(wrapper.find('[data-test-sanity-link]').exists()).toBeFalsy()
  })

  it('sets target _blank when blank is true', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: 'https://example.com', blank: true },
      slots,
    })

    expect(wrapper.find('[data-test-sanity-link]').attributes('target')).toBe(
      '_blank',
    )
  })

  it('does not set target when blank is false', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: 'https://example.com', blank: false },
      slots,
    })

    expect(
      wrapper.find('[data-test-sanity-link]').attributes('target'),
    ).toBeUndefined()
  })

  it('adds a leading slash to a relative URL', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: 'about' },
      slots,
    })

    const href = wrapper.find('[data-test-sanity-link]').attributes('href')
    expect(href).toBe('/about')
  })

  it('appends query parameters', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: '/page', parameters: 'foo=bar&baz=1' },
      slots,
    })

    const href = wrapper.find('[data-test-sanity-link]').attributes('href')
    expect(href).toContain('foo=bar')
    expect(href).toContain('baz=1')
  })

  it('appends a fragment / anchor', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: '/page', anchor: 'section' },
      slots,
    })

    const href = wrapper.find('[data-test-sanity-link]').attributes('href')
    expect(href).toContain('#section')
  })

  it('strips a leading # from the anchor', async () => {
    const wrapper = await mountSuspended(SanityLink, {
      props: { url: '/page', anchor: '#section' },
      slots,
    })

    const href = wrapper.find('[data-test-sanity-link]').attributes('href')
    expect(href).toContain('#section')
    expect(href).not.toContain('##')
  })

  it.each(['javascript', 'vbscript', 'data'])(
    'blocks the %s: protocol',
    async protocol => {
      const wrapper = await mountSuspended(SanityLink, {
        props: { url: `${protocol}:alert(1)` },
        slots,
      })

      expect(wrapper.find('[data-test-sanity-link]').exists()).toBeFalsy()
    },
  )
})
