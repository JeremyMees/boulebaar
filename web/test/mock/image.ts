import type { SanityImage } from '~/types/blocks'

export const mockImage: SanityImage = {
  _type: 'image',
  asset: { _ref: 'image-abc123-800x600-jpg', _type: 'reference' },
  hotspot: {
    _type: 'sanity.imageHotspot',
    x: 0.5,
    y: 0.3,
    width: 0.2,
    height: 0.2,
  },
  crop: {
    _type: 'sanity.imageCrop',
    top: 0.1,
    bottom: 0.1,
    left: 0,
    right: 0,
  },
  altText: 'Alt text of image',
  title: 'Title of image',
  description: 'Description of image',
}
