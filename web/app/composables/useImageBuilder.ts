import { createImageUrlBuilder } from '@sanity/image-url'
import type {
  SanityClientLike,
  SanityModernClientLike,
  SanityProjectDetails,
  SanityImageSource,
} from '@sanity/image-url'

type ImageBuilderConfig =
  | SanityClientLike
  | SanityProjectDetails
  | SanityModernClientLike
  | undefined

export function useImageBuilder() {
  const builder = createImageUrlBuilder(
    useSanity().config as ImageBuilderConfig,
  )

  function urlFor(source: SanityImageSource) {
    return builder.image(source).auto('format')
  }

  return {
    urlFor,
  }
}
