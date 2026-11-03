import { fakerPT_BR as faker } from '@faker-js/faker'
import { NextResponse } from 'next/server'
import { badRequest, parseBooleanParam, parseChoiceParam } from '@/lib/api'
import { CARD_BRANDS, generateCreditCard } from '@/utils/generate-credit-card'

const BRANDS = Object.keys(CARD_BRANDS) as (keyof typeof CARD_BRANDS)[]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const brand = parseChoiceParam(searchParams, 'brand', BRANDS, 'visa')
  if (!brand) return badRequest(`brand must be one of: ${BRANDS.join(', ')}.`)

  const formatted = parseBooleanParam(searchParams, 'formatted', true)
  if (formatted === null) return badRequest('formatted must be true or false.')

  // Printed the way cards show it: uppercase, without accents
  const holder = `${faker.person.firstName()} ${faker.person.lastName()}`
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()

  return NextResponse.json({
    creditCard: { holder, ...generateCreditCard(brand, formatted) },
  })
}
