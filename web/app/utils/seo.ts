import type { ConfigQueryResult } from '../../.nuxt/types/sanity-typegen'

export const defaultSeo = {
  name: 'Boulebaar',
  description:
    'Boulebaar op het Leopoldplein in Hasselt: specialty coffee, ambitieuze keuken en foodcultuur. Meer dan een koffiebar, een plek met smaak en attitude.',
  logo: '/logo.webp',
}

export function generateOpeningHoursSpecification(
  config: ConfigQueryResult | undefined,
) {
  const dayMap = [
    ['monday', 'Monday'],
    ['tuesday', 'Tuesday'],
    ['wednesday', 'Wednesday'],
    ['thursday', 'Thursday'],
    ['friday', 'Friday'],
    ['saturday', 'Saturday'],
    ['sunday', 'Sunday'],
  ] as const

  return dayMap.flatMap(([key, dayName]) => {
    const val = config?.openingHours?.[key]
    const match = val?.match(
      /(\d{1,2})(?:[:.u](\d{2})?)?\s*[-–]\s*(\d{1,2})(?:[:.u](\d{2})?)?/i,
    )

    if (!match?.[1] || !match[3]) return []

    const toTime = (hours: string, minutes?: string) =>
      `${hours.padStart(2, '0')}:${minutes ?? '00'}`

    return [
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: dayName,
        opens: toTime(match[1], match[2]),
        closes: toTime(match[3], match[4]),
      },
    ]
  })
}
