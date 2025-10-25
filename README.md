# MatchJS

[![Black Tech by Gabriel Rufino](https://img.shields.io/badge/Black_Tech-by_Gabriel_Rufino_%F0%9F%96%A4-white?style=flat-square&labelColor=444444)](https://gabrielrufino.com)
[![CI](https://github.com/gabrielrufino/matchjs/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielrufino/matchjs/actions/workflows/ci.yml)
[![CD](https://github.com/gabrielrufino/matchjs/actions/workflows/cd.yml/badge.svg)](https://github.com/gabrielrufino/matchjs/actions/workflows/cd.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gabrielrufino_matchjs&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gabrielrufino_matchjs)

`MatchJS` is a flexible library that implements a value matching mechanism with support for custom cases, including special operators like `include`, `exclude`, `object`, and a fallback `otherwise`. It supports matching both primitive values and complex objects with deep equality comparison.

## 📦 Installation

Install the library using npm or yarn:

```sh
npm install @gabrielrufino/matchjs
# or
yarn add @gabrielrufino/matchjs
```

## 🚀 Usage

### Import

```ts
import { exclude, include, match, object, otherwise } from '@gabrielrufino/matchjs'
```

### Basic Example

```ts
const result = match('a')({
  a: () => 'Letter A',
  b: () => 'Letter B',
  [otherwise]: () => 'Other value'
})

console.log(result) // Output: "Letter A"
```

### Using `include`

```ts
const result = match('a')({
  [include('a', 'b', 'c')]: () => 'In set A, B, or C',
  [otherwise]: () => 'Other value'
})

console.log(result) // Output: "In set A, B, or C"
```

### Using `exclude`

```ts
const result = match('d')({
  [exclude('a', 'b', 'c')]: () => 'Not in A, B, or C',
  [otherwise]: () => 'Other value'
})

console.log(result) // Output: "Not in A, B, or C"
```

### Using `object`

```ts
const user = { name: 'John', age: 30 }

const result = match(user)({
  [object({ name: 'John', age: 30 })]: () => 'Exact user match',
  [object({ name: 'Jane' })]: () => 'Different user',
  [otherwise]: () => 'Unknown user'
})

console.log(result) // Output: "Exact user match"
```

### Complex Object Matching

```ts
const data = {
  user: { id: 1, profile: { name: 'Alice' } },
  settings: { theme: 'dark' }
}

const result = match(data)({
  [object({
    user: { id: 1, profile: { name: 'Alice' } },
    settings: { theme: 'dark' }
  })]: () => 'Complex match found',
  [otherwise]: () => 'No match'
})

console.log(result) // Output: "Complex match found"
```

## 🛠️ API

### `match(value)`

#### Parameters
- `value`: The value to be evaluated (string, number, symbol, or object).

#### Returns
A function that accepts an `options` object in the format `{ key: () => any }`, where:
- `key` can be:
  - An exact value to match (for primitive values).
  - An operator like `include`, `exclude`, or `object`.
  - The `otherwise` symbol as a fallback.

#### Examples
See the [Usage](#-usage) section.

---

### `include(...values)`

Defines a set of values. Returns true if the value is included in the set.

---

### `exclude(...values)`

Defines a set of values. Returns true if the value is **not** included in the set.

---

### `object(value)`

Defines an object pattern for deep equality matching. Returns true if the input value deeply equals the provided object.

#### Parameters
- `value`: The object pattern to match against.

#### Example
```ts
const result = match({ a: 1, b: { c: 2 } })({
  [object({ a: 1, b: { c: 2 } })]: () => 'Deep match!',
  [otherwise]: () => 'No match'
})
```

---

### `otherwise`

A special symbol used as a fallback for unmatched cases.

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing.

To run the tests:

```bash
npm test
```

## 🛡️ Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes: `git checkout -b my-feature`.
3. Make your changes and commit: `git commit -m "My new feature"`.
4. Push to your branch: `git push origin my-feature`.
5. Open a Pull Request.

## 📄 License

This project is licensed under The Unlicense. See the [LICENSE](./LICENSE) file for details.
