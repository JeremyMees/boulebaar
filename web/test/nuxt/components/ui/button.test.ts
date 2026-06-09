import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Button } from '~/components/ui/button'

describe('Button', () => {
  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(Button)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a button element by default', async () => {
    const wrapper = await mountSuspended(Button)

    expect(wrapper.find('[data-slot="button"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="button"]').element.tagName).toBe('BUTTON')
  })

  it('applies the default variant class', async () => {
    const wrapper = await mountSuspended(Button)

    expect(wrapper.find('[data-slot="button"]').classes()).toContain(
      'bg-primary',
    )
  })

  it('applies the outline variant class when variant is outline', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { variant: 'outline' },
    })

    expect(wrapper.find('[data-slot="button"]').classes()).toContain(
      'bg-transparent',
    )
  })

  it('merges a custom class with the variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { class: 'my-custom-class' },
    })
    const el = wrapper.find('[data-slot="button"]')

    expect(el.classes()).toContain('my-custom-class')
    expect(el.classes()).toContain('bg-primary')
  })

  it('applies the sm size class', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { size: 'sm' },
    })

    expect(wrapper.find('[data-slot="button"]').classes()).toContain('h-9')
  })

  it('renders as a different element when as prop is set', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { as: 'a' },
    })

    expect(wrapper.find('[data-slot="button"]').element.tagName).toBe('A')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: { default: 'Click me' },
    })

    expect(wrapper.find('[data-slot="button"]').text()).toBe('Click me')
  })

  it('renders as the slot child when asChild is true', async () => {
    const wrapper = await mountSuspended(Button, {
      props: { asChild: true },
      slots: { default: '<a href="#">Link</a>' },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').text()).toBe('Link')
  })
})
