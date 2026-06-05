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
    const match = val?.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/)

    if (!match) return []

    return [
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: dayName,
        opens: match[1],
        closes: match[2],
      },
    ]
  })
}
