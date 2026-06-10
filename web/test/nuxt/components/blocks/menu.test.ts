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

const beerSubSection = {
  _key: 'sub-1',
  _type: 'accordionMenuSubSection' as const,
  title: 'Beers',
  items: [
    {
      _key: 'drink-1',
      _type: 'menuItem' as const,
      name: 'Lager',
      price: '€4',
      vegan: false,
    },
  ],
}

const wineSubSection = {
  _key: 'sub-2',
  _type: 'accordionMenuSubSection' as const,
  title: 'Wines',
  items: [
    {
      _key: 'drink-2',
      _type: 'menuItem' as const,
      name: 'Red wine',
      price: '€6',
      vegan: false,
    },
  ],
}

const accordionSection = {
  _type: 'accordionMenuSection' as const,
  _key: 'acc-section-1',
  title: 'Drinks',
  subSections: [beerSubSection, wineSubSection],
}

const props: BlockMeta & Menu = {
  documentId: 'doc-1',
  documentType: 'page',
  _type: 'menu',
  title: 'Our Menu',
  menuBlock: [menuSection],
}

describe('Menu', () => {
  describe('MenuSection', () => {
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

    it('renders a block section with no items', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          ...props,
          menuBlock: [{ ...menuSection, items: [] }],
        },
      })

      expect(wrapper.find('[data-test-block]').exists()).toBe(true)
      expect(wrapper.findAll('[data-test-block-column-item]')).toHaveLength(0)
    })
  })

  describe('AccordionMenuSection', () => {
    const accordionProps: BlockMeta & Menu = {
      ...props,
      menuBlock: [accordionSection],
    }

    it('matches snapshot', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders the block title', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })

      expect(wrapper.find('[data-test-block-title]').text()).toBe(
        accordionSection.title,
      )
    })

    it('renders a toggle button', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })

      expect(wrapper.find('[data-test-toggle]').exists()).toBe(true)
    })

    it('renders a column per subsection', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })

      expect(wrapper.findAll('[data-test-block-column]')).toHaveLength(
        accordionSection.subSections.length,
      )
    })

    it('renders subsection titles', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })
      const titles = wrapper
        .findAll('[data-test-subsection-title]')
        .map(el => el.text())

      expect(titles).toContain(beerSubSection.title)
      expect(titles).toContain(wineSubSection.title)
    })

    it('renders items within each subsection', async () => {
      const wrapper = await mountSuspended(Menu, { props: accordionProps })
      const totalItems = accordionSection.subSections.reduce(
        (sum, s) => sum + s.items.length,
        0,
      )

      expect(wrapper.findAll('[data-test-block-column-item]')).toHaveLength(
        totalItems,
      )
    })
  })

  describe('Mixed blocks', () => {
    it('renders both menuSection and accordionMenuSection blocks', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: { ...props, menuBlock: [menuSection, accordionSection] },
      })

      expect(wrapper.findAll('[data-test-block]')).toHaveLength(2)
      expect(wrapper.find('[data-test-toggle]').exists()).toBe(true)
    })
  })
})
