import { fakerPT_BR as faker } from '@faker-js/faker'
import { differenceInYears, format } from 'date-fns'
import { formatCEP, generatePhone, pickAddress } from './generate-address'
import { generateCPF } from './generate-cpf'
import { generateApplePassword } from './generate-password'
import { generateRG } from './generate-rg'
import {
  getNationalityFaker,
  intlLocale,
  type Nationality,
  namePattern,
} from './nationalities'
import { pick, randomInt } from './random'
import { slugify } from './slugify'
import type { StateCode } from './states'

export const SEXES = ['female', 'male'] as const
export type Sex = (typeof SEXES)[number]

// Approximate share of each blood type among Brazilians, also used as a rough
// default for the other nationalities
const BLOOD_TYPES = [
  ...Array(36).fill('O+'),
  ...Array(34).fill('A+'),
  ...Array(9).fill('O-'),
  ...Array(8).fill('A-'),
  ...Array(8).fill('B+'),
  ...Array(2).fill('B-'),
  ...Array(2).fill('AB+'),
  'AB-',
]

// Reserved for documentation (RFC 2606), so tests never email a real person
export const EMAIL_DOMAINS = ['example.com', 'example.net', 'example.org']

const CM_PER_IN = 2.54
const LB_PER_KG = 2.20462262

function surnames(count: number) {
  const names = new Set<string>()
  while (names.size < count) names.add(faker.person.lastName())
  return [...names]
}

/**
 * The generated value, or undefined when faker lacks the country's data for
 * it, e.g. Nepal's street patterns reference street suffixes it doesn't have.
 */
function attempt<T>(generate: () => T): T | undefined {
  try {
    return generate()
  } catch {
    return undefined
  }
}

/** Height (cm) and weight (kg) within the usual adult ranges for each sex. */
function bodyMeasurements(sex: Sex) {
  const height = sex === 'female' ? randomInt(150, 180) : randomInt(160, 195)
  const weight = Math.round((randomInt(185, 290) / 10) * (height / 100) ** 2)

  return { height, weight }
}

function birthdateAndAge(birthdate: Date) {
  return { birthdate, age: differenceInYears(new Date(), birthdate) }
}

interface PersonOptions {
  /** Brazil when missing */
  nationality?: Nationality
  sex?: Sex
  /** Only for Brazilians, whose addresses come from the real dataset */
  state?: StateCode
}

export function generatePerson({
  nationality = 'BR',
  sex,
  state,
}: PersonOptions = {}) {
  const personSex = sex ?? pick(SEXES)

  return nationality === 'BR'
    ? generateBrazilian(personSex, state)
    : generateForeigner(nationality, personSex)
}

/**
 * A Brazilian with valid CPF and RG and a real address. The fields and their
 * Portuguese values are the API's original format, so they stay as they are.
 */
function generateBrazilian(sex: Sex, state?: StateCode) {
  const firstName = faker.person.firstName(sex)

  // A child usually gets a surname from the mother and then one from the father
  const [maternal, paternal, motherFamily, fatherFamily] = surnames(4)
  const lastName = `${maternal} ${paternal}`

  const { birthdate, age } = birthdateAndAge(
    faker.date.birthdate({ mode: 'age', min: 18, max: 80 })
  )
  const { height, weight } = bodyMeasurements(sex)
  const address = pickAddress(state)

  return {
    name: `${firstName} ${lastName}`,
    sex: sex === 'female' ? 'Feminino' : 'Masculino',
    cpf: generateCPF(),
    rg: generateRG(),
    birthdate: format(birthdate, 'dd/MM/yyyy'),
    age,
    motherName: `${faker.person.firstName('female')} ${motherFamily} ${maternal}`,
    fatherName: `${faker.person.firstName('male')} ${fatherFamily} ${paternal}`,
    email: `${slugify(firstName)}.${slugify(paternal)}${randomInt(1, 99)}@${pick(EMAIL_DOMAINS)}`,
    password: generateApplePassword(),
    mobilePhone: generatePhone(address.ddd, 'mobile'),
    landlinePhone: generatePhone(address.ddd, 'landline'),
    cep: formatCEP(address.cep),
    street: address.street,
    number: String(randomInt(1, 2000)),
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    height: `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(height / 100)} m`,
    weight: `${weight} kg`,
    bloodType: pick(BLOOD_TYPES),
  }
}

/**
 * A person of another nationality, with the names, address and phone format
 * of that country. The address is made up, and fields the country has no data
 * for are left out instead of being filled with another country's.
 */
function generateForeigner(nationality: Nationality, sex: Sex) {
  const { faker, defines } = getNationalityFaker(nationality)
  const locale = intlLocale(nationality)
  const pattern = namePattern(nationality)
  const fullName = (firstName: string, lastName: string) =>
    pattern
      .replace('{{person.firstName}}', firstName)
      .replace('{{person.lastName}}', lastName)

  // Where surnames change with sex (e.g. Russian), each person gets their own;
  // elsewhere the family shares the father's
  const gendered = defines('person.last_name.female')
  const familyName = faker.person.lastName('male')
  const lastNameFor = (personSex: Sex) =>
    gendered ? faker.person.lastName(personSex) : familyName

  const firstName = faker.person.firstName(sex)
  const lastName = lastNameFor(sex)

  const { birthdate, age } = birthdateAndAge(
    faker.date.birthdate({ mode: 'age', min: 18, max: 80 })
  )
  const { height, weight } = bodyMeasurements(sex)
  const imperial = nationality === 'US'
  const inches = Math.round(height / CM_PER_IN)
  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options).format(value)

  // Names in other scripts (e.g. Japanese) have no ASCII letters to use
  const emailName =
    [slugify(firstName), slugify(lastName)].filter(Boolean).join('.') ||
    `user${randomInt(100, 9999)}`

  return {
    nationality,
    name: fullName(firstName, lastName),
    sex,
    birthdate: new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(birthdate),
    age,
    motherName: fullName(
      faker.person.firstName('female'),
      lastNameFor('female')
    ),
    fatherName: fullName(faker.person.firstName('male'), familyName),
    email: `${emailName}${randomInt(1, 99)}@${pick(EMAIL_DOMAINS)}`,
    password: generateApplePassword(),
    // Fields left undefined are dropped from the JSON response
    phone: defines('phone_number')
      ? attempt(() => faker.phone.number())
      : undefined,
    // Some countries (e.g. South Korea) have street names but no full address
    address:
      attempt(() => faker.location.streetAddress()) ??
      attempt(() => faker.location.street()),
    city: attempt(() => faker.location.city()),
    state: defines('location.state')
      ? attempt(() => faker.location.state())
      : undefined,
    zipCode: defines('location.postcode')
      ? attempt(() => faker.location.zipCode())
      : undefined,
    country: new Intl.DisplayNames(locale, { type: 'region' }).of(nationality),
    height: imperial
      ? `${Math.floor(inches / 12)} ft ${inches % 12} in`
      : `${formatNumber(height / 100, { minimumFractionDigits: 2 })} m`,
    weight: imperial
      ? `${Math.round(weight * LB_PER_KG)} lb`
      : `${formatNumber(weight)} kg`,
    bloodType: pick(BLOOD_TYPES),
  }
}
