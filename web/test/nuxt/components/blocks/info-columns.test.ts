import { describe, expect, it, beforeEach } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import InfoColumns from '~/components/blocks/info-columns.vue'
import { mockConfig, mockImage, mockRichtext } from '~~/test/mock'

let currentConfig = mockConfig

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(currentConfig) }))

const textColumn = {
  _type: 'textColumn' as const,
  _key: 'col-1',
  title: 'Text column title',
  text: mockRichtext,
  image: mockImage,
}

const openingHoursColumn = {
  _type: 'openingHoursColumn' as const,
  _key: 'col-2',
  title: 'Opening hours title',
  image: null,
}

const props = {
  documentId: 'doc-1',
  documentType: 'page',
  _type: 'infoColumns' as const,
  columns: [openingHoursColumn, textColumn, textColumn],
}

describe('InfoColumns', () => {
  beforeEach(() => {
    currentConfig = mockConfig
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(InfoColumns, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the section', async () => {
    const wrapper = await mountSuspended(InfoColumns, { props })

    expect(wrapper.find('[data-test-info-columns]').exists()).toBe(true)
  })

  it('renders a column for each item', async () => {
    const wrapper = await mountSuspended(InfoColumns, { props })

    expect(wrapper.findAll('[data-test-content]')).toHaveLength(
      props.columns.length,
    )
  })

  it('renders the image when asset is present', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: { ...props, columns: [textColumn] },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(true)
  })

  it('does not render the image when image has no asset', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: {
        ...props,
        columns: [{ ...textColumn, image: { ...mockImage, asset: undefined } }],
      },
    })

    expect(wrapper.find('[data-test-image]').exists()).toBe(false)
  })

  it('passes alt text to the image', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: { ...props, columns: [textColumn] },
    })

    expect(wrapper.find('[data-test-image]').attributes('alt')).toBe(
      mockImage.altText,
    )
  })

  it('renders the column title', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: { ...props, columns: [textColumn] },
    })

    expect(wrapper.find('[data-test-content]').text()).toContain(
      textColumn.title,
    )
  })

  it('renders richtext content', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: { ...props, columns: [textColumn] },
    })

    expect(wrapper.find('[data-test-content]').text()).toContain(
      'Mock richtext content',
    )
  })

  it('does not render richtext when text is absent', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: {
        ...props,
        columns: [{ ...textColumn, text: undefined }],
      },
    })

    expect(wrapper.find('[data-test-content]').text()).not.toContain(
      'Mock richtext content',
    )
  })

  it('renders the opening hours component', async () => {
    const wrapper = await mountSuspended(InfoColumns, {
      props: { ...props, columns: [openingHoursColumn] },
    })

    expect(wrapper.find('[data-test-opening-hours]').exists()).toBe(true)
  })
})
