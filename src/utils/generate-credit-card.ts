import { pick, randomDigits, randomInt } from './random'

interface Brand {
  name: string
  /** Generates one of the brand's number prefixes (IIN ranges) */
  prefix: () => string
  length: number
  /** Group sizes of the printed number */
  groups: number[]
  cvvLength: number
}

export const CARD_BRANDS = {
  visa: {
    name: 'Visa',
    prefix: () => '4',
    length: 16,
    groups: [4, 4, 4, 4],
    cvvLength: 3,
  },
  mastercard: {
    name: 'Mastercard',
    prefix: () =>
      Math.random() < 0.8
        ? String(randomInt(51, 55))
        : String(randomInt(2221, 2720)),
    length: 16,
    groups: [4, 4, 4, 4],
    cvvLength: 3,
  },
  elo: {
    name: 'Elo',
    prefix: () =>
      pick(['401178', '438935', '451416', '457631', '504175', '636297']),
    length: 16,
    groups: [4, 4, 4, 4],
    cvvLength: 3,
  },
  amex: {
    name: 'American Express',
    prefix: () => pick(['34', '37']),
    length: 15,
    groups: [4, 6, 5],
    cvvLength: 4,
  },
  hipercard: {
    name: 'Hipercard',
    prefix: () => '606282',
    length: 16,
    groups: [4, 4, 4, 4],
    cvvLength: 3,
  },
  diners: {
    name: 'Diners Club',
    prefix: () => pick(['36', '38', String(randomInt(300, 305))]),
    length: 14,
    groups: [4, 6, 4],
    cvvLength: 3,
  },
} satisfies Record<string, Brand>

export type CardBrand = keyof typeof CARD_BRANDS

export function isCardBrand(value: unknown): value is CardBrand {
  return typeof value === 'string' && Object.hasOwn(CARD_BRANDS, value)
}

/** The Luhn check digit that makes `digits` + digit a valid card number. */
function luhnDigit(digits: string) {
  let sum = 0
  // Counting from the right, the check digit will be the first position, so
  // the current last digit is doubled
  for (let i = 0; i < digits.length; i++) {
    let digit = Number(digits[digits.length - 1 - i])
    if (i % 2 === 0) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }

  return String((10 - (sum % 10)) % 10)
}

function formatGroups(number: string, groups: number[]) {
  let start = 0
  return groups
    .map((size) => {
      const group = number.slice(start, start + size)
      start += size
      return group
    })
    .join(' ')
}

export function generateCreditCard(brandKey: CardBrand, formatted = true) {
  const brand: Brand = CARD_BRANDS[brandKey]

  const prefix = brand.prefix()
  const body = prefix + randomDigits(brand.length - prefix.length - 1)
  const number = body + luhnDigit(body)

  // Expires in 1 to 5 years, so it is always in the future
  const expiry = new Date()
  expiry.setMonth(expiry.getMonth() + randomInt(12, 60))
  const month = String(expiry.getMonth() + 1).padStart(2, '0')
  const year = String(expiry.getFullYear()).slice(2)

  return {
    number: formatted ? formatGroups(number, brand.groups) : number,
    brand: brand.name,
    expiry: `${month}/${year}`,
    cvv: randomDigits(brand.cvvLength),
  }
}
