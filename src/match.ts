import { deepStrictEqual } from 'node:assert'
import { isIndexable } from './helpers/is-indexable'
import { exclude, include } from './keyers'
import { object } from './keyers/object'
import { otherwise } from './symbols'

export function match(value: string | symbol | number | Record<string, any>) {
  return function (options: Record<string | symbol, () => any>) {
    if (isIndexable(value) && options[value]) {
      return options[value]()
    }

    const parsedKeyers = Object
      .keys(options)
      .filter((key) => {
        try {
          const parsed = JSON.parse(key)
          return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        }
        catch {
          return false
        }
      })
      .map(key => [key, JSON.parse(key)])

    for (const [key, parsed] of parsedKeyers) {
      if (parsed.keyer === include.name && parsed.items.includes(value)) {
        return options[key]()
      }

      if (parsed.keyer === exclude.name && !parsed.items.includes(value)) {
        return options[key]()
      }

      if (parsed.keyer === object.name) {
        try {
          deepStrictEqual(value, parsed.value)
          return options[key]()
        }
        catch { }
      }

      if (parsed.keyer === 'regex' && typeof value === 'string') {
        const pattern = new RegExp(parsed.pattern, parsed.flags)
        if (pattern.test(value)) {
          return options[key]()
        }
      }
    }

    if (options[otherwise]) {
      return options[otherwise]()
    }
  }
}
