export function regex(pattern: RegExp) {
  return JSON.stringify({
    keyer: regex.name,
    pattern: pattern.source,
    flags: pattern.flags,
  })
}
