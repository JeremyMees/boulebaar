import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Menu from '~/components/blocks/menu.vue'

const menuItem = {
  _key: 'item-1',
  _type: 'menuItem' as const,
  name: 'Croque monsieur',
  price: '€8',
  ingredients: 'Ham, cheese, bread',
  vegan: false,
}

const veganItem = {
  _key: 'item-2',
  _type: 'menuItem' as const,
  name: 'Avocado toast',
  price: '€9',
  vegan: true,
}

const menuSection = {
  _type: 'menuSection' as const,
  _key: 'section-1',
  title: 'Snacks',
  items: [menuItem, veganItem],
}

const props: BlockMeta & Menu = {
  documentId: 'doc-1',
  documentType: 'page',
  _type: 'menu',
  title: 'Our Menu',
  menuBlock: [menuSection],
}

describe('Menu', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the section title', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.find('[data-test-title]').text()).toBe(props.title)
  })

  it('renders a block for each menu section', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { ...props, menuBlock: [menuSection, menuSection] },
    })

    expect(wrapper.findAll('[data-test-block]')).toHaveLength(2)
  })

  it('renders the block title', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.find('[data-test-block-title]').text()).toBe(
      menuSection.title,
    )
  })

  it('renders two columns', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.findAll('[data-test-block-column]')).toHaveLength(2)
  })

  it('renders all items', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.findAll('[data-test-block-column-item]')).toHaveLength(
      menuSection.items.length,
    )
  })

  it('renders item names', async () => {
    const wrapper = await mountSuspended(Menu, { props })
    const names = wrapper.findAll('[data-test-item-name]').map(el => el.text())

    expect(names.some(t => t.includes(menuItem.name))).toBe(true)
    expect(names.some(t => t.includes(veganItem.name))).toBe(true)
  })

  it('renders item prices', async () => {
    const wrapper = await mountSuspended(Menu, { props })
    const prices = wrapper
      .findAll('[data-test-item-price]')
      .map(el => el.text().trim())

    expect(prices).toContain(menuItem.price)
    expect(prices).toContain(veganItem.price)
  })

  it('renders ingredients when present', async () => {
    const wrapper = await mountSuspended(Menu, { props })
    const descriptions = wrapper.findAll('[data-test-item-description]')

    expect(
      descriptions.some(el => el.text().includes(menuItem.ingredients!)),
    ).toBe(true)
  })

  it('does not render ingredients element when absent', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { ...props, menuBlock: [{ ...menuSection, items: [veganItem] }] },
    })

    expect(wrapper.find('[data-test-item-description]').exists()).toBe(false)
  })

  it('shows vegan badge for vegan items', async () => {
    const wrapper = await mountSuspended(Menu, { props })

    expect(wrapper.find('[data-test-vegan]').exists()).toBe(true)
  })

  it('does not show vegan badge for non-vegan items', async () => {
    const wrapper = await mountSuspended(Menu, {
      props: { ...props, menuBlock: [{ ...menuSection, items: [menuItem] }] },
    })

    expect(wrapper.find('[data-test-vegan]').exists()).toBe(false)
  })
})
