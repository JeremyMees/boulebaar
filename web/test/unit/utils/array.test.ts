import { describe, expect, it } from 'vitest'
import { splitInHalf } from '~/utils/array'

describe('splitInHalf', () => {
  it('splits an even array into two equal halves', () => {
    const [first, second] = splitInHalf([1, 2, 3, 4])

    expect(first).toEqual([1, 2])
    expect(second).toEqual([3, 4])
  })

  it('puts the extra item in the first half for odd arrays', () => {
    const [first, second] = splitInHalf([1, 2, 3])

    expect(first).toEqual([1, 2])
    expect(second).toEqual([3])
  })

  it('returns the single item in the first half for a one-item array', () => {
    const [first, second] = splitInHalf([1])

    expect(first).toEqual([1])
    expect(second).toEqual([])
  })

  it('returns two empty arrays for an empty array', () => {
    const [first, second] = splitInHalf([])

    expect(first).toEqual([])
    expect(second).toEqual([])
  })

  it('preserves item order within each half', () => {
    const [first, second] = splitInHalf(['a', 'b', 'c', 'd', 'e', 'f'])

    expect(first).toEqual(['a', 'b', 'c'])
    expect(second).toEqual(['d', 'e', 'f'])
  })

  it('works with objects', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const [first, second] = splitInHalf(items)

    expect(first).toHaveLength(2)
    expect(second).toHaveLength(1)
    expect(first[0]).toBe(items[0])
  })
})
