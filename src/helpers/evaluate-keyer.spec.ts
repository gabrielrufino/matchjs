import { describe, expect, it } from 'vitest'
import { exclude, include } from '../keyers'
import { object } from '../keyers/object'
import { regex } from '../keyers/regex'
import { evaluateKeyer } from './evaluate-keyer'

describe(evaluateKeyer.name, () => {
  describe(include.name, () => {
    it('should return true when using include keyer and value is in items', () => {
      const parsed = { keyer: include.name, items: ['a', 'b', 'c'] }
      const result = evaluateKeyer(parsed, 'b')

      expect(result).toBe(true)
    })

    it('should return false when using include keyer and value is not in items', () => {
      const parsed = { keyer: include.name, items: ['a', 'b', 'c'] }
      const result = evaluateKeyer(parsed, 'd')

      expect(result).toBe(false)
    })
  })

  describe(exclude.name, () => {
    it('should return false when using exclude keyer and value is in items', () => {
      const parsed = { keyer: exclude.name, items: ['a', 'b', 'c'] }
      const result = evaluateKeyer(parsed, 'b')

      expect(result).toBe(false)
    })

    it('should return true when using exclude keyer and value is not in items', () => {
      const parsed = { keyer: exclude.name, items: ['a', 'b', 'c'] }
      const result = evaluateKeyer(parsed, 'd')

      expect(result).toBe(true)
    })
  })

  describe(object.name, () => {
    it('should return true when using object keyer and value deeply strictly equals parsed.value', () => {
      const parsed = { keyer: object.name, value: { nested: { prop: 1 } } }
      const result = evaluateKeyer(parsed, { nested: { prop: 1 } })

      expect(result).toBe(true)
    })

    it('should return false when using object keyer and value does not deeply strictly equal parsed.value', () => {
      const parsed = { keyer: object.name, value: { nested: { prop: 1 } } }
      const result = evaluateKeyer(parsed, { nested: { prop: 2 } })

      expect(result).toBe(false)
    })
  })

  describe(regex.name, () => {
    it('should return true when using regex keyer and value matches the pattern', () => {
      const parsed = { keyer: regex.name, pattern: '^hello', flags: 'i' }
      const result = evaluateKeyer(parsed, 'Hello world')

      expect(result).toBe(true)
    })

    it('should return false when using regex keyer and value does not match the pattern', () => {
      const parsed = { keyer: regex.name, pattern: '^hello', flags: 'i' }
      const result = evaluateKeyer(parsed, 'goodbye world')

      expect(result).toBe(false)
    })

    it('should return false when using regex keyer but value is not a string', () => {
      const parsed = { keyer: regex.name, pattern: '^123', flags: '' }
      const result = evaluateKeyer(parsed, 12345)

      expect(result).toBe(false)
    })
  })

  describe('unknown', () => {
    it('should return false for unknown keyer names', () => {
      const parsed = { keyer: 'unknown', data: 123 }
      const result = evaluateKeyer(parsed, 'any')

      expect(result).toBe(false)
    })
  })
})
