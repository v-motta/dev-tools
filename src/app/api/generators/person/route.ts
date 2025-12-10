import { faker } from '@faker-js/faker'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'
import { generateCPF } from '@/utils/generate-cpf'

export async function GET() {
  const person = {
    name: faker.person.fullName(),
    telephone: faker.phone.number({ style: 'international' }),
    cpf: generateCPF(),
    birthdate: format(faker.date.birthdate(), 'dd/MM/yyyy'),
  }

  const address = {
    zipCode: faker.location.zipCode(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    neighborhood: faker.location.county(),
    city: faker.location.city(),
    state: faker.location.state(),
  }

  return NextResponse.json({ personalData: person, address })
}
