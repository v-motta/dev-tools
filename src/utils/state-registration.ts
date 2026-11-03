import { pick, randomDigits, randomInt } from './random'
import type { StateCode } from './states'

/*
 * Inscrição estadual (state tax registration) rules for every state, from the
 * SINTEGRA specifications. Each state has its own length, prefix and check
 * digits, but most weigh the digits 2, 3, ..., 9, 2, 3, ... from the right
 * and use the same modulo 11 rule, so those are the defaults below.
 */

/** Weights 2, 3, ..., `max`, 2, 3, ... counted from the rightmost digit. */
function cyclicWeights(length: number, max = 9) {
  return Array.from({ length }, (_, i) => ((length - 1 - i) % (max - 1)) + 2)
}

function weightedSum(digits: string, weights = cyclicWeights(digits.length)) {
  let sum = 0
  for (let i = 0; i < digits.length; i++) sum += Number(digits[i]) * weights[i]
  return sum
}

/** 11 minus the remainder, where remainders 0 and 1 give 0. */
function mod11(sum: number) {
  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

function mod10(sum: number) {
  return (10 - (sum % 10)) % 10
}

const standardDigit = (digits: string) => String(mod11(weightedSum(digits)))
// Paraná and Rio de Janeiro wrap the weights after 7 instead of 9
const digitUpTo7 = (digits: string) =>
  String(mod11(weightedSum(digits, cyclicWeights(digits.length, 7))))

interface Rule {
  /** Accepted digit counts; generated numbers use the first one */
  lengths: number[]
  mask: string
  /** Random digits without the check digits, prefix included */
  body: () => string
  /** The full number for a body, or `null` when that body can't be valid */
  complete: (body: string) => string | null
  /** Takes the body back out of a full number. Defaults to dropping the check digits from the end */
  bodyOf?: (digits: string) => string
  checkDigits?: number
  prefix?: RegExp
}

function oneCheckDigit(body: string) {
  return body + standardDigit(body)
}

function twoCheckDigits(body: string) {
  const first = standardDigit(body)
  return body + first + standardDigit(body + first)
}

const RULES: Record<StateCode, Rule> = {
  AC: {
    lengths: [13],
    mask: '##.###.###/###-##',
    body: () => `01${randomDigits(9)}`,
    complete: twoCheckDigits,
    checkDigits: 2,
    prefix: /^01/,
  },
  AL: {
    lengths: [9],
    mask: '#########',
    // The third digit is the kind of company
    body: () => `24${pick(['0', '3', '5', '7', '8'])}${randomDigits(5)}`,
    complete: (body) => {
      const remainder = (weightedSum(body) * 10) % 11
      return body + (remainder === 10 ? 0 : remainder)
    },
    prefix: /^24/,
  },
  AP: {
    lengths: [9],
    mask: '#########',
    body: () => `03${randomDigits(6)}`,
    complete: (body) => {
      // Each range of numbers adds its own constant and maps 11 differently
      const number = Number(body)
      let [extra, digitFor11] = [0, 0]
      if (number >= 3000001 && number <= 3017000) extra = 5
      else if (number >= 3017001 && number <= 3019022) {
        extra = 9
        digitFor11 = 1
      }

      const digit = 11 - ((extra + weightedSum(body)) % 11)
      return body + (digit === 10 ? 0 : digit === 11 ? digitFor11 : digit)
    },
    prefix: /^03/,
  },
  AM: {
    lengths: [9],
    mask: '##.###.###-#',
    body: () => randomDigits(8),
    complete: (body) => {
      const sum = weightedSum(body)
      const digit = sum < 11 ? 11 - sum : mod11(sum)
      return digit > 9 ? null : body + digit
    },
  },
  BA: {
    lengths: [9, 8],
    mask: '#######-##',
    body: () => randomDigits(7),
    // The second check digit is calculated first, and the first (or second,
    // for 9 digits) digit of the number picks modulo 10 or 11
    complete: (body) => {
      const moduleDigit = body.length === 6 ? body[0] : body[1]
      const mod = '0123458'.includes(moduleDigit) ? mod10 : mod11

      const second = mod(weightedSum(body))
      const first = mod(weightedSum(body + second))
      return `${body}${first}${second}`
    },
    checkDigits: 2,
  },
  CE: {
    lengths: [9],
    mask: '########-#',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  DF: {
    lengths: [13],
    mask: '##.######.###-##',
    body: () => `07${randomDigits(9)}`,
    complete: twoCheckDigits,
    checkDigits: 2,
    prefix: /^07/,
  },
  ES: {
    lengths: [9],
    mask: '###.###.##-#',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  GO: {
    lengths: [9],
    mask: '##.###.###-#',
    body: () => `${pick(['10', '11', '15'])}${randomDigits(6)}`,
    complete: (body) => {
      const remainder = weightedSum(body) % 11
      const number = Number(body)

      if (remainder === 0) return `${body}0`
      if (remainder === 1) {
        return body + (number >= 10103105 && number <= 10119997 ? 1 : 0)
      }
      return body + (11 - remainder)
    },
    prefix: /^(1[015]|2\d)/,
  },
  MA: {
    lengths: [9],
    mask: '#########',
    body: () => `12${randomDigits(6)}`,
    complete: oneCheckDigit,
    prefix: /^12/,
  },
  MT: {
    lengths: [11],
    mask: '##########-#',
    body: () => randomDigits(10),
    complete: oneCheckDigit,
  },
  MS: {
    lengths: [9],
    mask: '##.###.###-#',
    body: () => `28${randomDigits(6)}`,
    complete: oneCheckDigit,
    prefix: /^(28|50)/,
  },
  MG: {
    lengths: [13],
    mask: '###.###.###/####',
    body: () => randomDigits(11),
    complete: (body) => {
      // A 0 goes after the city code, the digits are weighted 1, 2, 1, 2...
      // and the digits of every product are added up
      const padded = `${body.slice(0, 3)}0${body.slice(3)}`
      let sum = 0
      for (let i = 0; i < padded.length; i++) {
        const product = Number(padded[i]) * (i % 2 === 0 ? 1 : 2)
        sum += Math.floor(product / 10) + (product % 10)
      }
      const first = mod10(sum)

      const second = mod11(
        weightedSum(body + first, [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2])
      )
      return `${body}${first}${second}`
    },
    checkDigits: 2,
  },
  PA: {
    lengths: [9],
    mask: '##-######-#',
    body: () => `15${randomDigits(6)}`,
    complete: oneCheckDigit,
    prefix: /^15/,
  },
  PB: {
    lengths: [9],
    mask: '########-#',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  PR: {
    lengths: [10],
    mask: '########-##',
    body: () => randomDigits(8),
    complete: (body) => {
      const first = digitUpTo7(body)
      return body + first + digitUpTo7(body + first)
    },
    checkDigits: 2,
  },
  PE: {
    lengths: [9],
    mask: '#######-##',
    body: () => randomDigits(7),
    complete: twoCheckDigits,
    checkDigits: 2,
  },
  PI: {
    lengths: [9],
    mask: '#########',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  RJ: {
    lengths: [8],
    mask: '##.###.##-#',
    body: () => randomDigits(7),
    complete: (body) => body + digitUpTo7(body),
  },
  RN: {
    lengths: [9, 10],
    mask: '##.###.###-#',
    body: () => `20${randomDigits(6)}`,
    complete: (body) => {
      // Weights count down to 2 without wrapping, also for 10 digits
      const weights = Array.from(
        { length: body.length },
        (_, i) => body.length + 1 - i
      )
      const remainder = (weightedSum(body, weights) * 10) % 11
      return body + (remainder === 10 ? 0 : remainder)
    },
    prefix: /^20/,
  },
  RS: {
    lengths: [10],
    mask: '###/#######',
    // The first 3 digits are the city code
    body: () => String(randomInt(1, 467)).padStart(3, '0') + randomDigits(6),
    complete: oneCheckDigit,
  },
  RO: {
    lengths: [14],
    mask: '#############-#',
    body: () => randomDigits(13),
    complete: (body) => {
      const digit = 11 - (weightedSum(body) % 11)
      return body + (digit >= 10 ? digit - 10 : digit)
    },
  },
  RR: {
    lengths: [9],
    mask: '########-#',
    body: () => `24${randomDigits(6)}`,
    complete: (body) =>
      body + (weightedSum(body, [1, 2, 3, 4, 5, 6, 7, 8]) % 9),
    prefix: /^24/,
  },
  SC: {
    lengths: [9],
    mask: '###.###.###',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  SP: {
    lengths: [12],
    mask: '###.###.###.###',
    // The first check digit is the 9th digit and the second one the last
    body: () => randomDigits(10),
    bodyOf: (digits) => digits.slice(0, 8) + digits.slice(9, 11),
    complete: (body) => {
      const first = weightedSum(body.slice(0, 8), [1, 3, 4, 5, 6, 7, 8, 10])
      const eleven = `${body.slice(0, 8)}${(first % 11) % 10}${body.slice(8, 10)}`
      const second = weightedSum(eleven, [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2])
      return `${eleven}${(second % 11) % 10}`
    },
  },
  SE: {
    lengths: [9],
    mask: '########-#',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
  TO: {
    lengths: [9],
    mask: '#########',
    body: () => randomDigits(8),
    complete: oneCheckDigit,
  },
}

function applyMask(digits: string, mask: string) {
  let index = 0
  return mask.replace(/#/g, () => digits[index++])
}

export function generateStateRegistration(state: StateCode, formatted = true) {
  const rule = RULES[state]

  for (;;) {
    const digits = rule.complete(rule.body())
    if (!digits) continue

    return formatted ? applyMask(digits, rule.mask) : digits
  }
}

export function validateStateRegistration(value: string, state: StateCode) {
  const rule = RULES[state]
  const digits = value.replace(/\D/g, '')

  if (!rule.lengths.includes(digits.length)) return false
  if (rule.prefix && !rule.prefix.test(digits)) return false
  if (/^(\d)\1+$/.test(digits)) return false

  const body = rule.bodyOf
    ? rule.bodyOf(digits)
    : digits.slice(0, -(rule.checkDigits ?? 1))

  return rule.complete(body) === digits
}
