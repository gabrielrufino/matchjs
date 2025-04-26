import type { ValueType } from '../types'

export function include(...items: Array<ValueType>) {
  return JSON.stringify({
    keyer: include.name,
    items,
  })
}
