type Handler = () => any

export const Underscore: unique symbol = Symbol('_')

export function match<T extends string | number>(match: T) {
  return function (options: Record<T | typeof Underscore, Handler>) {
    
  }
}
