import { randomUUID } from 'node:crypto'

type Constructor = new (...args: Array<any>) => any

const constructorMap = new Map<string, Constructor>()

export function instanceOf(constructor: Constructor) {
  const id = randomUUID()
  constructorMap.set(id, constructor)
  return JSON.stringify({
    keyer: instanceOf.name,
    id,
  })
}

export function getConstructor(id: string): Constructor | undefined {
  return constructorMap.get(id)
}
