import { evaluateKeyer } from './helpers/evaluate-keyer'
import { isIndexable } from './helpers/is-indexable'
import { parseKeySafe } from './helpers/parse-key-safe'
import { otherwise } from './symbols'

export function match(value: string | symbol | number | Record<string, any>) {
  return function (options: Record<string | symbol, () => any>) {
    if (isIndexable(value) && options[value]) {
      return options[value]()
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
