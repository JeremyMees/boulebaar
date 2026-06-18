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

  it('does not render cta by default', async () => {
    const wrapper = await mountSuspended(OpeningHours)

    expect(wrapper.find('[data-test-opening-hours-cta]').exists()).toBe(false)
  })

  it('does not render cta when showCta is true but config has no cta', async () => {
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    expect(wrapper.find('[data-test-opening-hours-cta]').exists()).toBe(false)
  })

  it('passes a custom class to the list element', async () => {
    const wrapper = await mountSuspended(OpeningHours, {
      props: { class: 'my-custom-class' },
    })

    expect(wrapper.find('[data-test-opening-hours]').classes()).toContain(
      'my-custom-class',
    )
  })

  it('renders cta when showCta is true and config has cta', async () => {
    currentConfig = {
      ...mockConfig,
      openingHours: { ...mockConfig.openingHours, cta: 'Reserveer nu!' },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    expect(wrapper.find('[data-test-opening-hours-cta]').exists()).toBe(true)
    expect(wrapper.find('[data-test-opening-hours-cta]').text()).toBe(
      'Reserveer nu!',
    )
  })

  it('matches snapshot with an instagram link in the cta', async () => {
    currentConfig = {
      ...mockConfig,
      instagram: 'https://instagram.com/boulebaar',
      openingHours: {
        ...mockConfig.openingHours,
        cta: 'Volg ons op Instagram!',
      },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    expect(
      wrapper.find('[data-test-opening-hours-cta]').html(),
    ).toMatchSnapshot()
  })

  it('renders an underlined instagram link inside the cta', async () => {
    currentConfig = {
      ...mockConfig,
      instagram: 'https://instagram.com/boulebaar',
      openingHours: {
        ...mockConfig.openingHours,
        cta: 'Volg ons op Instagram!',
      },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    const link = wrapper.find('[data-test-opening-hours-cta] a')

    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Instagram')
    expect(link.attributes('href')).toBe('https://instagram.com/boulebaar')
    expect(link.classes()).toContain('underline')
    expect(wrapper.find('[data-test-opening-hours-cta]').text()).toContain(
      'Volg ons op Instagram!',
    )
  })

  it('matches the instagram word case-insensitively', async () => {
    currentConfig = {
      ...mockConfig,
      instagram: 'https://instagram.com/boulebaar',
      openingHours: {
        ...mockConfig.openingHours,
        cta: 'Volg ons op instagram',
      },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    const link = wrapper.find('[data-test-opening-hours-cta] a')

    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('instagram')
  })

  it('does not render a link when the cta has no instagram mention', async () => {
    currentConfig = {
      ...mockConfig,
      instagram: 'https://instagram.com/boulebaar',
      openingHours: { ...mockConfig.openingHours, cta: 'Reserveer nu!' },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    expect(wrapper.find('[data-test-opening-hours-cta] a').exists()).toBe(false)
  })

  it('does not render a link when instagram is mentioned but no url is set', async () => {
    currentConfig = {
      ...mockConfig,
      instagram: '',
      openingHours: {
        ...mockConfig.openingHours,
        cta: 'Volg ons op Instagram!',
      },
    }
    const wrapper = await mountSuspended(OpeningHours, {
      props: { showCta: true },
    })

    expect(wrapper.find('[data-test-opening-hours-cta] a').exists()).toBe(false)
    expect(wrapper.find('[data-test-opening-hours-cta]').text()).toBe(
      'Volg ons op Instagram!',
    )
  })
})
