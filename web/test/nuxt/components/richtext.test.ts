import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Richtext from '~/components/richtext.vue'

const simpleBlock = [
  {
    _type: 'block' as const,
    _key: 'a',
    children: [{ _type: 'span' as const, _key: 'b', text: 'Hello world' }],
  },
]

const props = {
  value: simpleBlock,
}

describe('Richtext', () => {
  it('matches snapshot for a simple block', async () => {
    const wrapper = await mountSuspended(Richtext, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot when value is null', async () => {
    const wrapper = await mountSuspended(Richtext, {
      props: { value: null },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the text content', async () => {
    const wrapper = await mountSuspended(Richtext, { props })

    expect(wrapper.text()).toContain('Hello world')
  })

  it('renders nothing when value is null', async () => {
    const wrapper = await mountSuspended(Richtext, {
      props: { value: null },
    })

    expect(wrapper.find('[data-test-richtext]').exists()).toBeFalsy()
  })

  it('renders nothing when value is undefined', async () => {
    const wrapper = await mountSuspended(Richtext, {
      props: { value: undefined },
    })

    expect(wrapper.find('[data-test-richtext]').exists()).toBeFalsy()
  })

  it('renders content when value is provided', async () => {
    const wrapper = await mountSuspended(Richtext, { props })

    expect(wrapper.html()).not.toBe('')
  })

  it('renders an inlineLink as a SanityLink with the label text', async () => {
    const inlineLinkValue = [
      {
        _type: 'inlineLink' as const,
        _key: 'link-1',
        link: {
          _type: 'link' as const,
          url: 'https://example.com',
        },
        label: 'Click here',
      },
    ]

    const wrapper = await mountSuspended(Richtext, {
      props: { value: inlineLinkValue },
    })

    expect(wrapper.text()).toContain('Click here')
  })
})
