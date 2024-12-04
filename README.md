# MatchJS

`MatchJS` is a flexible library that implements a value matching mechanism with support for custom cases, including special operators like `include`, `exclude`, and a fallback `otherwise`.

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
import { match, otherwise, include, exclude } from '@gabrielrufino/matchjs'
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

## 🛠️ API

### `match(value)`

#### Parameters
- `value`: The value to be evaluated.

#### Returns
A function that accepts an `options` object in the format `{ key: () => any }`, where:
- `key` can be:
  - An exact value to match.
  - An operator like `include` or `exclude`.
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

## 💡 Acknowledgments

Thanks to all contributors and users who made this project possible!

---

<div align="center">
Made with ❤️ by [Gabriel Rufino](https://github.com/gabrielrufino)
</div>
