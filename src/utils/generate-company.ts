import { fakerPT_BR as faker } from '@faker-js/faker'
import { format, subDays } from 'date-fns'
import { formatCEP, generatePhone, pickAddress } from './generate-address'
import { generateCNPJ } from './generate-cnpj'
import { EMAIL_DOMAINS } from './generate-person'
import { pick, randomInt } from './random'
import { slugify } from './slugify'
import { generateStateRegistration } from './state-registration'
import type { StateCode } from './states'

const ACTIVITIES = [
  'Comércio de Alimentos',
  'Tecnologia',
  'Serviços Contábeis',
  'Construções',
  'Transportes',
  'Consultoria',
  'Engenharia',
  'Distribuidora de Bebidas',
  'Confecções',
  'Materiais de Construção',
  'Logística',
  'Software',
  'Representações Comerciais',
  'Marketing Digital',
  'Odontologia',
  'Educação',
  'Auto Peças',
  'Farmácia',
  'Agropecuária',
  'Imóveis',
]

const LEGAL_SUFFIXES = ['Ltda', 'Ltda', 'Ltda', 'S.A.', 'ME', 'EPP']

interface CompanyOptions {
  state?: StateCode
}

export function generateCompany({ state }: CompanyOptions = {}) {
  const family = faker.person.lastName()
  const activity = pick(ACTIVITIES)
  const tradeName = `${family} ${activity}`
  const slug = slugify(tradeName)

  const address = pickAddress(state)
  // Opened between 6 months and 30 years ago
  const foundedAt = subDays(new Date(), randomInt(180, 30 * 365))

  return {
    name: `${tradeName} ${pick(LEGAL_SUFFIXES)}`,
    tradeName,
    cnpj: generateCNPJ(),
    // The registration belongs to the state the company is in
    stateRegistration: generateStateRegistration(address.state as StateCode),
    foundedAt: format(foundedAt, 'dd/MM/yyyy'),
    email: `contato.${slug}@${pick(EMAIL_DOMAINS)}`,
    website: `www.${slug}.com.br`,
    phone: generatePhone(address.ddd, 'landline'),
    cep: formatCEP(address.cep),
    street: address.street,
    number: String(randomInt(1, 5000)),
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
  }
}
