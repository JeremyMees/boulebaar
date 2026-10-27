import { describe, expect, it } from 'vitest'
import {
  parseOpeningHours,
  toOpeningHoursSpecification,
} from '~/utils/opening-hours'
import { mockConfig } from '../../mock'

const withMonday = (monday: string) => ({
  ...mockConfig.openingHours,
  monday,
})

describe('parseOpeningHours', () => {
  it('returns all 7 days from Monday to Sunday', () => {
    const result = parseOpeningHours(mockConfig.openingHours)

    expect(result.map(d => d.day)).toEqual([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ])
  })

  it('adds the Dutch short label for each day', () => {
    const result = parseOpeningHours(mockConfig.openingHours)

    expect(result.map(d => d.label)).toEqual([
      'ma',
      'di',
      'wo',
      'do',
      'vr',
      'za',
      'zo',
    ])
  })

  it('keeps the original text from the CMS', () => {
    const result = parseOpeningHours(mockConfig.openingHours)

    expect(result[0]?.text).toBe('12:00 - 22:00')
    expect(result[2]?.text).toBe('gesloten')
  })

  it('returns all 7 days without times when there are no opening hours', () => {
    const result = parseOpeningHours(undefined)

    expect(result).toHaveLength(7)
    expect(result.every(d => !d.text && !d.opens && !d.closes)).toBe(true)
  })

  it('returns null times for days with non-time text like "gesloten"', () => {
    const wednesday = parseOpeningHours(mockConfig.openingHours)[2]

    expect(wednesday).toMatchObject({ opens: null, closes: null })
  })

  it('returns null times for empty text', () => {
    const [monday] = parseOpeningHours(withMonday(''))

    expect(monday).toMatchObject({ opens: null, closes: null })
  })

  it.each([
    ['12:00 - 22:00', '12:00', '22:00'],
    ['12:00 - 00:00', '12:00', '00:00'],
    ['10:00–22:00', '10:00', '22:00'],
    ['9:00 - 22:00', '09:00', '22:00'],
    ['11u - 17u', '11:00', '17:00'],
    ['11u30 - 17u30', '11:30', '17:30'],
    ['11.30 - 17.30', '11:30', '17:30'],
  ])('parses "%s" as %s to %s', (text, opens, closes) => {
    const [monday] = parseOpeningHours(withMonday(text))

    expect(monday).toMatchObject({ opens, closes })
  })
})

describe('toOpeningHoursSpecification', () => {
  it('returns an empty array without opening hours', () => {
    expect(toOpeningHoursSpecification(undefined)).toEqual([])
    expect(toOpeningHoursSpecification(null)).toEqual([])
  })

  it('only returns open days, in Monday-to-Sunday order', () => {
    const result = toOpeningHoursSpecification(mockConfig.openingHours)

    expect(result.map(r => r.dayOfWeek)).toEqual([
      'Monday',
      'Tuesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
  })

  it('maps parsed times to opens and closes', () => {
    const friday = toOpeningHoursSpecification(mockConfig.openingHours).find(
      r => r.dayOfWeek === 'Friday',
    )

    expect(friday).toEqual({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '12:00',
      closes: '00:00',
    })
  })

  it('returns an empty array when every day is closed', () => {
    const closed = Object.fromEntries(
      Object.keys(mockConfig.openingHours).map(k => [k, '']),
    ) as typeof mockConfig.openingHours

    expect(toOpeningHoursSpecification(closed)).toEqual([])
  })
})
