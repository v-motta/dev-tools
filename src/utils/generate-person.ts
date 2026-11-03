import { fakerPT_BR as faker } from '@faker-js/faker'
import { differenceInYears, format } from 'date-fns'
import { formatNumber } from '@/lib/locale'
import { formatCEP, generatePhone, pickAddress } from './generate-address'
import { generateCPF } from './generate-cpf'
import { generateApplePassword } from './generate-password'
import { generateRG } from './generate-rg'
import { pick, randomInt } from './random'
import { slugify } from './slugify'
import type { StateCode } from './states'

export const SEXES = ['female', 'male'] as const
export type Sex = (typeof SEXES)[number]

// Approximate share of each blood type among Brazilians
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

function surnames(count: number) {
  const names = new Set<string>()
  while (names.size < count) names.add(faker.person.lastName())
  return [...names]
}

interface PersonOptions {
  sex?: Sex
  state?: StateCode
}

export function generatePerson({ sex, state }: PersonOptions = {}) {
  const personSex = sex ?? pick(SEXES)
  const firstName = faker.person.firstName(personSex)

  // A child usually gets a surname from the mother and then one from the father
  const [maternal, paternal, motherFamily, fatherFamily] = surnames(4)
  const lastName = `${maternal} ${paternal}`

  const birthdate = faker.date.birthdate({ mode: 'age', min: 18, max: 80 })

  // Heights and weights within the usual adult ranges for each sex
  const height =
    personSex === 'female' ? randomInt(150, 180) : randomInt(160, 195)
  const weight = Math.round((randomInt(185, 290) / 10) * (height / 100) ** 2)

  const address = pickAddress(state)

  return {
    name: `${firstName} ${lastName}`,
    sex: personSex === 'female' ? 'Feminino' : 'Masculino',
    cpf: generateCPF(),
    rg: generateRG(),
    birthdate: format(birthdate, 'dd/MM/yyyy'),
    age: differenceInYears(new Date(), birthdate),
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
    height: `${formatNumber('pt-BR', height / 100, { minimumFractionDigits: 2 })} m`,
    weight: `${weight} kg`,
    bloodType: pick(BLOOD_TYPES),
  }
}
