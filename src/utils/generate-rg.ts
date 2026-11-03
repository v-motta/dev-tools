import { randomDigits } from './random'

/**
 * Check digit of an RG following São Paulo's rule, the one most systems use
 * since each state issues RGs its own way: the 8 digits are weighted 2 to 9,
 * and a result of 10 becomes "X".
 */
export function calculateRGDigit(digits: string) {
  let sum = 0
  for (let i = 0; i < 8; i++) sum += Number(digits[i]) * (i + 2)

  const digit = 11 - (sum % 11)
  if (digit === 10) return 'X'
  if (digit === 11) return '0'
  return String(digit)
}

export function generateRG(formatted = true) {
  const digits = randomDigits(8)
  const rg = digits + calculateRGDigit(digits)

  return formatted
    ? rg.replace(/^(\d{2})(\d{3})(\d{3})(\w)$/, '$1.$2.$3-$4')
    : rg
}
