import { calculateCNHDigits } from './generate-cnh'

export function validateCNH(cnh: string): boolean {
  const clean = cnh.replace(/\D/g, '')

  if (clean.length !== 11) return false
  if (/^(\d)\1+$/.test(clean)) return false

  return calculateCNHDigits(clean.slice(0, 9)) === clean.slice(9)
}
