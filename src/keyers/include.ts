export function include(...items: Array<any>) {
  return JSON.stringify({
    keyer: include.name,
    items,
  })
}
