import { randomDigits, randomInt } from './random'

export const PLATE_FORMATS = ['mercosul', 'old'] as const
export type PlateFormat = (typeof PLATE_FORMATS)[number]

function randomLetters(length: number) {
  return Array.from({ length }, () =>
    String.fromCharCode(randomInt(65, 90))
  ).join('')
}

/**
 * A Mercosul plate (ABC1D23, the 5th character is a letter) or an old one
 * (ABC-1234). Mercosul plates are written without a hyphen.
 */
export function generateLicensePlate(format: PlateFormat = 'mercosul') {
  if (format === 'old') return `${randomLetters(3)}-${randomDigits(4)}`

  return `${randomLetters(3)}${randomDigits(1)}${randomLetters(1)}${randomDigits(2)}`
}
