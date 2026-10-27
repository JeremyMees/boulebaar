import type { ConfigQueryResult } from '../../.nuxt/types/sanity-typegen'
import type { Day } from '../types/components'

type OpeningHoursInput =
  NonNullable<ConfigQueryResult>['openingHours'] | null | undefined

export interface OpeningHoursDay {
  day: Day
  label: string
  text: string | undefined
  opens: string | null
  closes: string | null
}

const days = [
  { day: 'monday', label: 'ma', schemaDay: 'Monday' },
  { day: 'tuesday', label: 'di', schemaDay: 'Tuesday' },
  { day: 'wednesday', label: 'wo', schemaDay: 'Wednesday' },
  { day: 'thursday', label: 'do', schemaDay: 'Thursday' },
  { day: 'friday', label: 'vr', schemaDay: 'Friday' },
  { day: 'saturday', label: 'za', schemaDay: 'Saturday' },
  { day: 'sunday', label: 'zo', schemaDay: 'Sunday' },
] as const

// Matches free text like "12:00 - 22:00", "11u30 – 17u" or "11.30-17.30"
const timeRange =
  /(\d{1,2})(?:[:.u](\d{2})?)?\s*[-–]\s*(\d{1,2})(?:[:.u](\d{2})?)?/i

function toTime(hours: string, minutes?: string) {
  return `${hours.padStart(2, '0')}:${minutes ?? '00'}`
}

export function parseOpeningHours(
  openingHours: OpeningHoursInput,
): OpeningHoursDay[] {
  return days.map(({ day, label }) => {
    const text = openingHours?.[day]
    const match = text?.match(timeRange)
    const isOpen = !!match?.[1] && !!match[3]

    return {
      day,
      label,
      text,
      opens: isOpen ? toTime(match[1]!, match[2]) : null,
      closes: isOpen ? toTime(match[3]!, match[4]) : null,
    }
  })
}

export function toOpeningHoursSpecification(openingHours: OpeningHoursInput) {
  return parseOpeningHours(openingHours).flatMap(({ opens, closes }, i) =>
    opens && closes
      ? [
          {
            '@type': 'OpeningHoursSpecification' as const,
            dayOfWeek: days[i]!.schemaDay,
            opens,
            closes,
          },
        ]
      : [],
  )
}
