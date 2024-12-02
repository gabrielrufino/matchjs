import { exclude, include } from './keyers'
import { otherwise } from './symbols'
import { ValueType } from './types'

export function match(value: ValueType) {
  return function (options: Record<ValueType | symbol, () => any>) {
    if (options[value]) {
      return options[value]()
    }

    const parsedKeyers = Object
      .keys(options)
      .filter(key => key.match(/^\s*\{(?:\s*\"[^\"]+\"\s*:\s*(\"[^\"]*\"|\d+|true|false|null|\{.*?\}|\[.*?\])\s*,?)*\}\s*$/))
      .map(key => [key, JSON.parse(key)])

    for (const [key, parsed] of parsedKeyers) {
      if (parsed.keyer === include.name && parsed.items.includes(value)) {
        return options[key]()
      }

      if (parsed.keyer === exclude.name && !parsed.items.includes(value)) {
        return options[key]()
      }
    }

    if (options[otherwise]) {
      return options[otherwise]()
    }
  }
}
