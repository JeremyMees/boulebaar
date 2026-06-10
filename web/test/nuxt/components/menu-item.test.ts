import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MenuItem from '~/components/menu-item.vue'

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

const itemWithExtras = {
  _key: 'item-3',
  _type: 'menuItem' as const,
  name: 'Pasta',
  price: '€12',
  vegan: false,
  extras: [
    {
      _type: 'option' as const,
      _key: 'extra-1',
      name: 'Extra cheese',
      price: '€1.5',
    },
    { _type: 'option' as const, _key: 'extra-2', name: 'Extra sauce' },
  ],
}

describe('MenuItem', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders item name', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.find('[data-test-item-name]').text()).toContain(
      menuItem.name,
    )
  })

  it('renders item price', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.find('[data-test-item-price]').text().trim()).toBe(
      menuItem.price,
    )
  })

  it('renders ingredients when present', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.find('[data-test-item-description]').text()).toContain(
      menuItem.ingredients,
    )
  })

  it('does not render ingredients element when absent', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: veganItem },
    })

    expect(wrapper.find('[data-test-item-description]').exists()).toBe(false)
  })

  it('shows vegan badge for vegan items', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: veganItem },
    })

    expect(wrapper.find('[data-test-vegan]').exists()).toBe(true)
  })

  it('does not show vegan badge for non-vegan items', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.find('[data-test-vegan]').exists()).toBe(false)
  })

  it('does not render extras when item has none', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: menuItem },
    })

    expect(wrapper.find('[data-test-extras]').exists()).toBe(false)
  })

  it('renders extras section when item has extras', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: itemWithExtras },
    })

    expect(wrapper.find('[data-test-extras]').exists()).toBe(true)
  })

  it('renders one row per extra', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: itemWithExtras },
    })

    expect(wrapper.findAll('[data-test-extra]')).toHaveLength(
      itemWithExtras.extras.length,
    )
  })

  it('renders extra names', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: itemWithExtras },
    })

    const names = wrapper.findAll('[data-test-extra-name]').map(el => el.text())

    expect(names).toContain('Extra cheese')
    expect(names).toContain('Extra sauce')
  })

  it('renders extra price when present', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: itemWithExtras },
    })

    const prices = wrapper
      .findAll('[data-test-extra-price]')
      .map(el => el.text().trim())

    expect(prices).toContain('€1.5')
  })

  it('does not render price element when extra has no price', async () => {
    const wrapper = await mountSuspended(MenuItem, {
      props: { item: itemWithExtras },
    })

    expect(wrapper.findAll('[data-test-extra-price]')).toHaveLength(1)
  })
})
