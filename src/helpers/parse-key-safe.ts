export function parseKeySafe(key: string) {
  try {
    const parsed = JSON.parse(key)
    if (typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed
    }
  }
  catch { }

  return null
}
