import { describe, expect, it } from 'vitest'
import { generateOpeningHoursSpecification } from '~/utils/seo'
import { mockConfig } from '../../mock'

describe('generateOpeningHoursSpecification', () => {
  it('returns empty array for undefined config', () => {
    expect(generateOpeningHoursSpecification(undefined)).toEqual([])
  })

  it('returns empty array for null config', () => {
    expect(generateOpeningHoursSpecification(null as never)).toEqual([])
  })

  it('skips days with non-time strings like "gesloten"', () => {
    const result = generateOpeningHoursSpecification(mockConfig)
    const days = result.map(r => r.dayOfWeek)

    expect(days).not.toContain('Wednesday')
    expect(days).not.toContain('Sunday')
  })

  it('returns only open days from the mock config', () => {
    const result = generateOpeningHoursSpecification(mockConfig)

    expect(result).toHaveLength(5)
  })

  it('preserves Monday-to-Sunday order', () => {
    const result = generateOpeningHoursSpecification(mockConfig)

    expect(result.map(r => r.dayOfWeek)).toEqual([
      'Monday',
      'Tuesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
  })

  it('correctly parses opens and closes times', () => {
    const result = generateOpeningHoursSpecification(mockConfig)
    const friday = result.find(r => r.dayOfWeek === 'Friday')

    expect(friday?.opens).toBe('12:00')
    expect(friday?.closes).toBe('00:00')
  })

  it('sets @type to OpeningHoursSpecification on every entry', () => {
    const result = generateOpeningHoursSpecification(mockConfig)

    expect(result.every(r => r['@type'] === 'OpeningHoursSpecification')).toBe(
      true,
    )
  })

  it('parses en-dash separator without spaces', () => {
    const config = {
      ...mockConfig,
      openingHours: { ...mockConfig.openingHours, monday: '10:00–22:00' },
    }
    const result = generateOpeningHoursSpecification(config)
    const monday = result.find(r => r.dayOfWeek === 'Monday')

    expect(monday?.opens).toBe('10:00')
    expect(monday?.closes).toBe('22:00')
  })

  it('parses single-digit hour times', () => {
    const config = {
      ...mockConfig,
      openingHours: { ...mockConfig.openingHours, monday: '9:00 - 22:00' },
    }
    const result = generateOpeningHoursSpecification(config)
    const monday = result.find(r => r.dayOfWeek === 'Monday')

    expect(monday?.opens).toBe('9:00')
    expect(monday?.closes).toBe('22:00')
  })

  it('returns empty array when all days are empty strings', () => {
    const config = {
      ...mockConfig,
      openingHours: {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      },
    }

    expect(generateOpeningHoursSpecification(config)).toEqual([])
  })
})
