import { describe, expect, it } from 'vitest'
import { stripStega } from '~/utils/sanity-utils'

describe('Sanity utils', () => {
  describe('stripStega', () => {
    it('should return a plain string unchanged', () => {
      expect(stripStega('hello world')).toBe('hello world')
    })

    it('should strip Unicode format characters (stega encoding)', () => {
      // U+200B (zero-width space) and U+200D (zero-width joiner) are Cf category
      const withStega = 'hel​lo‍ world'
      expect(stripStega(withStega)).toBe('hello world')
    })

    it('should return an empty string unchanged', () => {
      expect(stripStega('')).toBe('')
    })

    it('should return null as null', () => {
      expect(stripStega(null)).toBeNull()
    })

    it('should return undefined as undefined', () => {
      expect(stripStega(undefined)).toBeUndefined()
    })

    it('should strip all format characters leaving only visible text', () => {
      const onlyFormatChars = '​‌‍'
      expect(stripStega(onlyFormatChars)).toBe('')
    })

    it('should preserve numbers and special characters', () => {
      expect(stripStega('€100.00 — special!')).toBe('€100.00 — special!')
    })
  })
})
