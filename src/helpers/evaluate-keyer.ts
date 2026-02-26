import { dequal } from 'dequal'
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
    return dequal(value, parsed.value)
  }

  if (parsed.keyer === regex.name && typeof value === 'string') {
    const pattern = new RegExp(parsed.pattern, parsed.flags)
    return pattern.test(value)
  }

  return false
}
