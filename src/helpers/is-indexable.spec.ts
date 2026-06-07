import { describe, expect, it } from 'vitest'
import { isIndexable } from './is-indexable'

describe(isIndexable.name, () => {
  it('should return true for string', () => {
    expect(isIndexable('test')).toBe(true)
  })

  it('should return true for number', () => {
    expect(isIndexable(123)).toBe(true)
  })

  it('should return true for symbol', () => {
    expect(isIndexable(Symbol('test'))).toBe(true)
  })

  it('should return false for object', () => {
    expect(isIndexable({})).toBe(false)
  })

  it('should return false for null', () => {
    expect(isIndexable(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isIndexable(undefined)).toBe(false)
  })

  it('should return false for boolean', () => {
    expect(isIndexable(true)).toBe(false)
  })
})
