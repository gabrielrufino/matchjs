import { dequal } from 'dequal'
import { exclude, include, object, range, regex } from '../keyers'

export function evaluateKeyer(parsed: any, value: any) {
  if (parsed.keyer === include.name) {
    return parsed.items.some((item: any) => dequal(item, value))
  }

  if (parsed.keyer === exclude.name) {
    return !parsed.items.some((item: any) => dequal(item, value))
  }

  if (parsed.keyer === object.name) {
    return dequal(value, parsed.value)
  }

  if (parsed.keyer === regex.name && typeof value === 'string') {
    const pattern = new RegExp(parsed.pattern, parsed.flags)
    return pattern.test(value)
  }

  if (parsed.keyer === range.name && typeof value === 'number') {
    const minMatch = parsed.minInclusive ? value >= parsed.min : value > parsed.min
    const maxMatch = parsed.maxInclusive ? value <= parsed.max : value < parsed.max

    return minMatch && maxMatch
  }

  return false
}
