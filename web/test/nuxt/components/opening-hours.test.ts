import { describe, expect, it, beforeEach } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import OpeningHours from '~/components/opening-hours.vue'
import { mockConfig } from '~~/test/mock'

const dayOrder: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const dayLabelMap: Record<Day, string> = {
  monday: 'ma',
  tuesday: 'di',
  wednesday: 'wo',
  thursday: 'do',
  friday: 'vr',
  saturday: 'za',
  sunday: 'zo',
}

let currentConfig = mockConfig

mockNuxtImport('useGlobalConfig', () => () => ({ data: ref(currentConfig) }))

describe('OpeningHours', () => {
  beforeEach(() => {
    currentConfig = mockConfig
  })

  it('matches snapshot', async () => {
    const wrapper = await mountSuspended(OpeningHours)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the list', async () => {
    const wrapper = await mountSuspended(OpeningHours)

    expect(wrapper.find('[data-test-opening-hours]').exists()).toBe(true)
  })

  it('renders a row for each day', async () => {
    const wrapper = await mountSuspended(OpeningHours)

    expect(wrapper.findAll('[data-test-opening-hours-day]')).toHaveLength(
      dayOrder.length,
    )
  })

  it('shows the correct label for each day', async () => {
    const wrapper = await mountSuspended(OpeningHours)
    const labels = wrapper
      .findAll('[data-test-opening-hours-day]')
      .map(r => r.find('[data-test-opening-hours-label]').text())

    expect(labels).toEqual(dayOrder.map(day => dayLabelMap[day]))
  })

  it('shows the opening hours value for each day', async () => {
    const wrapper = await mountSuspended(OpeningHours)
    const values = wrapper
      .findAll('[data-test-opening-hours-day]')
      .map(r => r.find('[data-test-opening-hours-value]').text())

    expect(values).toEqual(dayOrder.map(day => mockConfig.openingHours[day]))
  })

  it('applies dark variant classes by default', async () => {
    const wrapper = await mountSuspended(OpeningHours)
    const row = wrapper.find('[data-test-opening-hours-day]')

    expect(row.classes()).toContain('text-muted-foreground')
    expect(row.classes()).toContain('border-muted')
  })

  it('applies light variant classes when variant is light', async () => {
    const wrapper = await mountSuspended(OpeningHours, {
      props: { variant: 'light' },
    })
    const row = wrapper.find('[data-test-opening-hours-day]')

    expect(row.classes()).toContain('text-background/85')
    expect(row.classes()).toContain('border-background/15')
  })
})
