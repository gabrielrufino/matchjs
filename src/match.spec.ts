import { describe, expect, it } from 'vitest'

import { exclude, include, range, regex } from './keyers'
import { object } from './keyers/object'
import { match } from './match'
import { otherwise } from './symbols'

describe(match.name, () => {
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

  describe('object', () => {
    it('should return the expected result when the value deeply equals the object provided to the `object` keyer', () => {
      const testObject = { a: 1, b: { c: 2 } }

      const result = match(testObject)({
        [object({ a: 1, b: { c: 2 } })]: () => 'matched object',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('matched object')
    })

    it('should return the otherwise case when the value does not deeply equal the object provided to the `object` keyer', () => {
      const testObject = { a: 1, b: { c: 3 } }

      const result = match(testObject)({
        [object({ a: 1, b: { c: 2 } })]: () => 'matched object',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('other')
    })
  })

  describe('range', () => {
    it('should match when value is within inclusive range', () => {
      const result = match(5)({
        [range(1, 10)]: () => 'between 1 and 10',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('between 1 and 10')
    })

    it('should match when value is at the boundary of inclusive range', () => {
      const resultMin = match(1)({
        [range(1, 10)]: () => 'matched',
        [otherwise]: () => 'other',
      })
      const resultMax = match(10)({
        [range(1, 10)]: () => 'matched',
        [otherwise]: () => 'other',
      })

      expect(resultMin).toBe('matched')
      expect(resultMax).toBe('matched')
    })

    it('should not match when value is at the boundary of exclusive range', () => {
      const resultMin = match(1)({
        [range(1, 10, { minInclusive: false })]: () => 'matched',
        [otherwise]: () => 'other',
      })
      const resultMax = match(10)({
        [range(1, 10, { maxInclusive: false })]: () => 'matched',
        [otherwise]: () => 'other',
      })

      expect(resultMin).toBe('other')
      expect(resultMax).toBe('other')
    })

    it('should match when value is within exclusive range', () => {
      const result = match(5)({
        [range(1, 10, { minInclusive: false, maxInclusive: false })]: () => 'between 1 and 10',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('between 1 and 10')
    })

    it('should not match when value is outside range', () => {
      const result = match(11)({
        [range(1, 10)]: () => 'between 1 and 10',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('other')
    })

    it('should not throw and return otherwise if value is not a number', () => {
      const result = match('5')({
        [range(1, 10)]: () => 'matched',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('other')
    })
  })

  describe('regex', () => {
    it('should return the expected result when the string value matches the regex pattern', () => {
      const result = match('hello world')({
        [regex(/^hello/)]: () => 'starts with hello',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('starts with hello')
    })

    it('should return the otherwise case when the string value does not match the regex pattern', () => {
      const result = match('goodbye world')({
        [regex(/^hello/)]: () => 'starts with hello',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('other')
    })

    it('should not throw and return otherwise if value is not a string', () => {
      const result = match(123)({
        [regex(/\d+/)]: () => 'is number',
        [otherwise]: () => 'other',
      })

      expect(result).toBe('other')
    })
  })
})
