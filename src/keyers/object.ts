export function object(value: Record<string, any>) {
  return JSON.stringify({
    keyer: object.name,
    value,
  })
}
