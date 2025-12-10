import { randomInt } from 'node:crypto'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

function getRandomChars(length: number): string {
  const chars = new Set<string>()
  while (chars.size < length) {
    const randomChar = ALPHABET[randomInt(0, ALPHABET.length)]
    chars.add(randomChar)
  }

  return Array.from(chars).join('')
}

export function generatePassword() {
  const randomPositions = new Set<number>()
  while (randomPositions.size < 2) {
    randomPositions.add(randomInt(18))
  }

  const [uppercasePosition, digitPosition] = Array.from(randomPositions)

  const groups = new Set<string>()
  while (groups.size < 3) groups.add(getRandomChars(6))

  const pool = Array.from(groups).join('').split('')

  pool[uppercasePosition] = ALPHABET[randomInt(0, 26)].toUpperCase()
  pool[digitPosition] = String(randomInt(10))

  return `${pool.slice(0, 6).join('')}-${pool.slice(6, 12).join('')}-${pool.slice(12, 18).join('')}`
}
