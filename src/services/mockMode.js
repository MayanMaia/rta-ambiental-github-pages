export const MOCK_MODE_KEY = 'rta.mock.enabled'

export function isMockModeEnabled() {
  const envValue = import.meta.env.VITE_USE_MOCKS
  const envEnabled = envValue === 'true'
  const envDisabled = envValue === 'false'
  const hasExplicitApiUrl = Boolean(import.meta.env.VITE_API_URL)

  if (typeof window === 'undefined') {
    if (envEnabled) return true
    if (envDisabled) return false
    return !import.meta.env.PROD && !hasExplicitApiUrl
  }

  const savedValue = localStorage.getItem(MOCK_MODE_KEY)
  if (savedValue === 'true') return true
  if (savedValue === 'false') return false
  if (envEnabled) return true
  if (envDisabled) return false

  return !import.meta.env.PROD && !hasExplicitApiUrl
}

export function setMockModeEnabled(value) {
  if (typeof window === 'undefined') {
    return value
  }

  localStorage.setItem(MOCK_MODE_KEY, String(value))
  return value
}
