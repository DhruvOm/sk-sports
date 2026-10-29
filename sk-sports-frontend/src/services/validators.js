// Simple form validation helpers (Indian phone numbers)

export const isValidPhone = (value) => /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(value.trim())

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export function required(value, label) {
  return String(value ?? '').trim() ? '' : `${label} is required`
}
