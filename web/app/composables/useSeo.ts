export function useSeo(
  sanitySeo: MaybeRefOrGetter<NonNullable<PageQueryResult>['seo'] | undefined>,
) {
  const { data: config } = useGlobalConfig()
  const { urlFor } = useImageBuilder()

  const title = computed(
    () => stripStega(toValue(sanitySeo)?.title) || defaultSeo.name,
  )

  const description = computed(
    () => stripStega(toValue(sanitySeo)?.description) || defaultSeo.description,
  )

  const image = computed(() => {
    const img = toValue(sanitySeo)?.image
    return img ? urlFor(img).width(1200).height(630).url() : '/social-share.png'
  })

  useHead({
    titleTemplate: 'Boulebaar | %s',
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  })

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: 'website',
    ogLocale: 'nl_BE',
    ogImage: () => image.value,
    twitterImage: () => image.value,
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterCard: 'summary_large_image',
  })

  const { url: siteUrl } = useSiteConfig()

  useSchemaOrg(() => {
    const siteConfig = config.value
    const email = stripStega(siteConfig?.email)
    const telephone = stripStega(siteConfig?.number)
    const sameAs = [
      stripStega(siteConfig?.instagram),
      stripStega(siteConfig?.facebook),
    ].filter(Boolean) as string[]
    const contactPoint = {
      telephone,
      contactType: 'Customer Service',
      email,
      availableLanguage: ['Dutch', 'English'],
    }

    return [
      defineFoodEstablishment({
        '@type': 'CafeOrCoffeeShop',
        name: 'Boulebaar',
        description: defaultSeo.description,
        logo: '/logo.webp',
        image: '/boulebaar.jpg',
        email,
        telephone,
        // @unhead/schema-org types servesCuisine as string, but
        // schema.org allows an array and it serializes correctly
        servesCuisine: [
          'Coffee',
          'Brunch',
          'Breakfast',
          'International',
          'Fusion',
        ] as unknown as string,
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Bancontact, Credit Card',
        hasMenu: `${siteUrl}/#menu`,
        openingHoursSpecification:
          generateOpeningHoursSpecification(siteConfig),
        contactPoint,
        sameAs,
        areaServed: {
          '@type': 'City',
          name: 'Hasselt',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.927925,
          longitude: 5.335662,
        },
        address: {
          streetAddress: 'Leopoldplein 17',
          addressLocality: 'Hasselt',
          addressRegion: 'Limburg',
          postalCode: '3500',
          addressCountry: 'BE',
        },
      }),
      defineWebSite(),
      defineWebPage(),
    ]
  })
}
