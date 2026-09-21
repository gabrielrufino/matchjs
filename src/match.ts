import { evaluateKeyer } from './helpers/evaluate-keyer'
import { isIndexable } from './helpers/is-indexable'
import { parseKeySafe } from './helpers/parse-key-safe'
import { otherwise } from './symbols'

export function match<V = unknown>(value: V) {
  return function <R>(options: Record<PropertyKey, () => R>): R | undefined {
    if (isIndexable(value) && Object.prototype.hasOwnProperty.call(options, value as any)) {
      return (options as Record<any, () => R>)[value as any]()
    }

    const parsedKeyers = Object
      .keys(options)
      .map(key => [key, parseKeySafe(key)])
      .filter(([_, parsed]) => parsed !== null)

    for (const [key, parsed] of parsedKeyers) {
      if (evaluateKeyer(parsed, value)) {
        return options[key]()
      }
    }

    if (options[otherwise]) {
      return options[otherwise]()
    }
  }
}
