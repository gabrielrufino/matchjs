export function include<T>(...items: Array<T>) {
  return JSON.stringify({
    keyer: include.name,
    items
  })
}