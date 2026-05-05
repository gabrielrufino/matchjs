export type RangeOptions = {
  minInclusive?: boolean
  maxInclusive?: boolean
}

export function range(min: number, max: number, options: RangeOptions = { minInclusive: true, maxInclusive: true }) {
  return JSON.stringify({
    keyer: range.name,
    min,
    max,
    minInclusive: options.minInclusive ?? true,
    maxInclusive: options.maxInclusive ?? true,
  })
}
