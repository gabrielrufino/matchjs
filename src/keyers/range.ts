export interface RangeOptions {
  minInclusive?: boolean
  maxInclusive?: boolean
}

export function range(min: number, max: number, { minInclusive = true, maxInclusive = true }: RangeOptions = {}) {
  return JSON.stringify({
    keyer: range.name,
    min,
    max,
    minInclusive,
    maxInclusive,
  })
}
