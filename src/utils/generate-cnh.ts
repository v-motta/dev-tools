import { randomDigits } from './random'

/**
 * Check digits of a CNH (the 11-digit registration number), following
 * Denatran's rule. Returns `null` for the bases whose second digit would be
 * negative, which no valid CNH has.
 */
export function calculateCNHDigits(base: string) {
  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(base[i]) * (9 - i)

  let firstDigit = sum % 11
  // A first digit of 10 or more becomes 0 and lowers the second one by 2
  let discount = 0
  if (firstDigit >= 10) {
    firstDigit = 0
    discount = 2
  }

  sum = 0
  for (let i = 0; i < 9; i++) sum += Number(base[i]) * (i + 1)

  const remainder = sum % 11
  const secondDigit = remainder >= 10 ? 0 : remainder - discount
  if (secondDigit < 0) return null

  return `${firstDigit}${secondDigit}`
}

export function generateCNH() {
  for (;;) {
    const base = randomDigits(9)
    if (/^(\d)\1+$/.test(base)) continue

    const digits = calculateCNHDigits(base)
    if (digits) return base + digits
  }
}
