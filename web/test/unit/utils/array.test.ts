import { describe, expect, it } from 'vitest'
import { distributeIntoColumns, splitInHalf } from '~/utils/array'

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

describe('distributeIntoColumns', () => {
  it('distributes items round-robin so each column starts with the earliest items', () => {
    const cols = distributeIntoColumns([1, 2, 3, 4, 5, 6], 3)

    expect(cols[0]).toEqual([1, 4])
    expect(cols[1]).toEqual([2, 5])
    expect(cols[2]).toEqual([3, 6])
  })

  it('handles uneven distribution by putting extra items in the first columns', () => {
    const cols = distributeIntoColumns([1, 2, 3, 4, 5], 3)

    expect(cols[0]).toEqual([1, 4])
    expect(cols[1]).toEqual([2, 5])
    expect(cols[2]).toEqual([3])
  })

  it('returns empty columns for an empty array', () => {
    const cols = distributeIntoColumns([], 3)

    expect(cols).toHaveLength(3)
    expect(cols.every(c => c.length === 0)).toBe(true)
  })

  it('works with 2 columns', () => {
    const cols = distributeIntoColumns([1, 2, 3, 4], 2)

    expect(cols[0]).toEqual([1, 3])
    expect(cols[1]).toEqual([2, 4])
    expect(cols[2]).toBeUndefined()
  })

  it('preserves object references', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const cols = distributeIntoColumns(items, 2)

    expect(cols[0][0]).toBe(items[0])
    expect(cols[1][0]).toBe(items[1])
    expect(cols[0][1]).toBe(items[2])
  })
})
