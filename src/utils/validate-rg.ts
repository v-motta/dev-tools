import { calculateRGDigit } from './generate-rg'

/** Validates an RG with São Paulo's check digit rule (see `calculateRGDigit`). */
export function validateRG(rg: string): boolean {
  const clean = rg.replace(/[^\dX]/gi, '').toUpperCase()

  if (!/^\d{8}[\dX]$/.test(clean)) return false
  if (/^(\d)\1+$/.test(clean)) return false

  return calculateRGDigit(clean) === clean[8]
}
