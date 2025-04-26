import type { ValueType } from '../types'

export function exclude(...items: Array<ValueType>) {
  return JSON.stringify({
    keyer: exclude.name,
    items,
  })
}
