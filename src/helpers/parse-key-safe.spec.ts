import { describe, expect, it } from 'vitest'
import { parseKeySafe } from './parse-key-safe'

describe(parseKeySafe.name, () => {
  it('should return a parsed object if the string is a valid JSON object', () => {
    const key = JSON.stringify({ keyer: 'include', items: [1, 2] })
    const result = parseKeySafe(key)

    expect(result).toEqual({ keyer: 'include', items: [1, 2] })
  })

  it('should return null if the string is a valid JSON array', () => {
    const key = JSON.stringify([1, 2, 3])
    const result = parseKeySafe(key)

    expect(result).toBeNull()
  })

  it('should return null if the string is a valid JSON but a primitive value', () => {
    const resultString = parseKeySafe(JSON.stringify('string'))
    const resultNumber = parseKeySafe(JSON.stringify(123))
    const resultBoolean = parseKeySafe(JSON.stringify(true))
    const resultNull = parseKeySafe(JSON.stringify(null))

    expect(resultString).toBeNull()
    expect(resultNumber).toBeNull()
    expect(resultBoolean).toBeNull()
    expect(resultNull).toBeNull()
  })

  it('should return null if the string is not valid JSON', () => {
    const key = '{ invalid json'
    const result = parseKeySafe(key)

    expect(result).toBeNull()
  })
})
