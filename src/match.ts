import { include } from './keyers'
import { otherwise } from './symbols'

export function match<T extends string | number>(value: T) {
  return function (options: Record<T | symbol, () => any>) {
    if (options[value]) {
      return options[value]()
    }

    const parsedKeyers = Object
      .keys(options)
      .filter(key => key.match(/^\s*\{(?:\s*\"[^\"]+\"\s*:\s*(\"[^\"]*\"|\d+|true|false|null|\{.*?\}|\[.*?\])\s*,?)*\}\s*$/)?.length)
      .map(key => [key, JSON.parse(key)])

    for (const [key, parsed] of parsedKeyers) {
      if (parsed.keyer === include.name && parsed.items.includes(value)) {
        return options[key]()
      }
    }

    if (options[otherwise]) {
      return options[otherwise]()
    }
  }
}
