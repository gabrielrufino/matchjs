import { otherwise } from './symbols'

export function match<T extends string | number>(value: T) {
  return function (options: Record<T | symbol, () => any>) {
    if (options[value]) {
      return options[value]()
    }

    if (options[otherwise]) {
      return options[otherwise]()
    }
  }
}
