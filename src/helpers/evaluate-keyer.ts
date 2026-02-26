import { deepStrictEqual } from 'node:assert'
import { exclude, include } from '../keyers'
import { object } from '../keyers/object'
import { regex } from '../keyers/regex'

export function evaluateKeyer(parsed: any, value: any) {
  if (parsed.keyer === include.name) {
    return parsed.items.includes(value)
  }

  if (parsed.keyer === exclude.name) {
    return !parsed.items.includes(value)
  }

  if (parsed.keyer === object.name) {
    try {
      deepStrictEqual(value, parsed.value)
      return true
    }
    catch {
      return false
    }
  }

  if (parsed.keyer === regex.name && typeof value === 'string') {
    const pattern = new RegExp(parsed.pattern, parsed.flags)
    return pattern.test(value)
  }

  return false
}
