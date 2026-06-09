import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PageBuilder from '~/components/page-builder.vue'

const menuBlock = {
  _key: 'block-1',
  _type: 'menu' as const,
  title: 'Test Menu',
  menuBlock: [],
}

const baseProps = {
  documentId: 'doc-1',
  documentType: 'page',
}

describe('PageBuilder', () => {
  it('renders nothing when content is null', async () => {
    const wrapper = await mountSuspended(PageBuilder, {
      props: { ...baseProps, content: null },
    })

    expect(wrapper.findAll('[data-test-page-builder-block]')).toHaveLength(0)
  })

  it('renders nothing when content is an empty array', async () => {
    const wrapper = await mountSuspended(PageBuilder, {
      props: { ...baseProps, content: [] as never[] },
    })

    expect(wrapper.findAll('[data-test-page-builder-block]')).toHaveLength(0)
  })

  it('renders a block wrapper for each content item', async () => {
    const wrapper = await mountSuspended(PageBuilder, {
      props: {
        ...baseProps,
        content: [menuBlock, menuBlock] as never[],
      },
    })

    expect(wrapper.findAll('[data-test-page-builder-block]')).toHaveLength(2)
  })

  it('renders the correct block component for a known type', async () => {
    const wrapper = await mountSuspended(PageBuilder, {
      props: {
        ...baseProps,
        content: [menuBlock] as never[],
      },
    })

    expect(wrapper.find('[data-test-page-builder-block]').exists()).toBe(true)
  })

  it('falls back to a div for an unknown block type', async () => {
    const unknownBlock = {
      _key: 'unknown-1',
      _type: 'unknownType' as never,
    }
    const wrapper = await mountSuspended(PageBuilder, {
      props: {
        ...baseProps,
        content: [unknownBlock] as never[],
      },
    })

    expect(wrapper.find('[data-test-page-builder-block]').exists()).toBe(true)
  })
})
