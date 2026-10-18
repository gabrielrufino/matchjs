export function isIndexable(value: unknown): value is string | number | symbol | boolean {
  return ['string', 'number', 'symbol', 'boolean'].includes(typeof value)
}
