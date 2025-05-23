import { describe, expect, it } from 'vitest'

import { exclude, include } from './keyers'
import { match } from './match'
import { otherwise } from './symbols'

describe('match', () => {
  it('should return the result of the matched case', () => {
    const result = match('test')({
      test: () => 'matched',
      [otherwise]: () => 'not matched',
    })
    expect(result).toBe('matched')
  })

  it('should return the result of the otherwise case if no match is found', () => {
    const result = match('notFound')({
      test: () => 'matched',
      [otherwise]: () => 'not matched',
    })
    expect(result).toBe('not matched')
  })

  it('should return undefined if no match is found and no otherwise case is provided', () => {
    const result = match('notFound')({
      test: () => 'matched',
    })
    expect(result).toBeUndefined()
  })

  it('should work with numeric values', () => {
    const result = match(1)({
      1: () => 'one',
      2: () => 'two',
      [otherwise]: () => 'other',
    })
    expect(result).toBe('one')
  })

  it('should return the otherwise case with numeric values if no match is found', () => {
    const result = match(3)({
      1: () => 'one',
      2: () => 'two',
      [otherwise]: () => 'other',
    })
    expect(result).toBe('other')
  })

  describe('include', () => {
    it('should return the expected result when the value matches one of the value in the `include` arguments', () => {
      const result = match('a')({
        [include('a', 'b', 'c')]: () => 'a, b or c',
        [include('d', 'e', 'f')]: () => 'd, e or f',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('a, b or c')
    })
  })

  describe('exclude', () => {
    it('should return the expected result when the value does not match one of the value in the `exclude` arguments', () => {
      const result = match('d')({
        [exclude('a', 'b', 'c')]: () => 'a, b or c',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('a, b or c')
    })
  })
})
