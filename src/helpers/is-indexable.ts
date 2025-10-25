export function isIndexable(value: unknown): value is string | number | symbol {
  return ['string', 'number', 'symbol'].includes(typeof value)
}
