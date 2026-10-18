# Agent Guidelines

## Commands

- **Build**: `npm run build` (runs `tsc`, outputs to `dist/`)
- **Lint**: `npm run lint` or `npm run lint:fix` (`@antfu/eslint-config`, single quotes, no semicolons, prefers `interface` over `type`)
- **Test**: `npm test` (`vitest run`)
- **Single Test**: `npx vitest run <path-to-spec>` or `npx vitest run -t "<test-name>"`
- **Coverage**: `npm run test:cov` (enforces 100% coverage across stmts/branch/funcs/lines)
- **Mutation Tests**: `npm run test:mutation` (`npx stryker run`, runs in CI; maintains 100% mutation score)
- **Verification Order**: `npm run lint && npm run build && npm run test:cov && npm run test:mutation`

## Architecture & Keyer Pattern

- **Pattern Matching Mechanism**:
  - `match(value)(options)` first checks direct indexable key lookup (`options[value]`).
  - Next, it parses object keys with `parseKeySafe` (accepts only JSON objects, rejects arrays/primitives) and evaluates keyers via `evaluateKeyer`.
  - If no key matches, it falls back to `options[otherwise]`.
- **Keyers**:
  - Keyers serialize config as JSON strings (`{ keyer: <fn>.name, ... }`) used as computed property names in the options object.
  - Adding a new keyer requires:
    1. Implementing the keyer function in `src/keyers/<name>.ts`.
    2. Exporting it from `src/keyers/index.ts`.
    3. Adding its evaluation logic in `src/helpers/evaluate-keyer.ts`.
    4. Adding comprehensive unit tests in `src/helpers/evaluate-keyer.spec.ts` and integration tests in `src/match.spec.ts`.

## Testing & Quality Requirements

- **100% Test Coverage**: All statements, branches, functions, and lines must be covered.
- **100% Mutation Score**: Stryker mutation testing runs in CI. All mutants must be killed by tests. Always verify `npm run test:mutation` before finishing changes.

## Git & Commits

- Never commit unless explicitly instructed.
- Commits must follow Conventional Commits (e.g. `feat:`, `fix:`, `test:`, `chore:`).
- Active development branch is `develop`; `main` triggers automated CD releases.
