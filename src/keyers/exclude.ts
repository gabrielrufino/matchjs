export function exclude(...items: Array<any>) {
  return JSON.stringify({
    keyer: exclude.name,
    items,
  })
}
