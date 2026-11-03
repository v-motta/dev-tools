import { randomInt } from 'node:crypto'

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 64

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
// No quotes, backslashes or spaces, which often break when pasted into
// config files or shells
const SYMBOLS = '!@#$%&*-_=+?'

export interface PasswordOptions {
  length?: number
  uppercase?: boolean
  numbers?: boolean
  symbols?: boolean
}

function pick(chars: string) {
  return chars[randomInt(chars.length)]
}

export function generatePassword({
  length = 16,
  uppercase = true,
  numbers = true,
  symbols = true,
}: PasswordOptions = {}) {
  if (length < PASSWORD_MIN_LENGTH || length > PASSWORD_MAX_LENGTH) {
    throw new RangeError(
      `The length must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH}.`
    )
  }

  const sets = [
    LOWERCASE,
    uppercase && UPPERCASE,
    numbers && NUMBERS,
    symbols && SYMBOLS,
  ].filter((set) => typeof set === 'string')
  const pool = sets.join('')

  // One character from each enabled set guarantees the password meets the
  // rules it was asked for; the rest come from all of them
  const chars = sets.map(pick)
  while (chars.length < length) chars.push(pick(pool))

  // Fisher-Yates, so the guaranteed characters don't always lead
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }

  return chars.join('')
}
