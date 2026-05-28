import { describe, expect, it } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const PROJECT_ID = 'testproject'
const DATASET = 'production'
const IMAGE_REF = 'image-abc123def456-800x600-jpg'

mockNuxtImport('useSanity', () => () => ({
  config: { projectId: PROJECT_ID, dataset: DATASET },
}))

const { urlFor } = useImageBuilder()

describe('useImageBuilder', () => {
  describe('urlFor', () => {
    it('returns an image URL builder object', () => {
      const result = urlFor({ _ref: IMAGE_REF, _type: 'reference' })

      expect(result).toBeDefined()
      expect(typeof result.url).toBe('function')
    })

    it('generates a cdn.sanity.io URL', () => {
      const url = urlFor({ _ref: IMAGE_REF, _type: 'reference' }).url()

      expect(url).toContain('cdn.sanity.io')
      expect(url).toContain(PROJECT_ID)
      expect(url).toContain(DATASET)
    })

    it('applies auto format by default', () => {
      const url = urlFor({ _ref: IMAGE_REF, _type: 'reference' }).url()

      expect(url).toContain('auto=format')
    })

    it('allows chaining width and height', () => {
      const url = urlFor({ _ref: IMAGE_REF, _type: 'reference' })
        .width(400)
        .height(300)
        .url()

      expect(url).toContain('w=400')
      expect(url).toContain('h=300')
    })

    it('allows chaining fit', () => {
      const url = urlFor({ _ref: IMAGE_REF, _type: 'reference' })
        .fit('crop')
        .url()

      expect(url).toContain('fit=crop')
    })
  })
})
