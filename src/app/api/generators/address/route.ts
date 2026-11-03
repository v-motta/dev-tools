import { NextResponse } from 'next/server'
import { badRequest, parseBooleanParam, parseStateParam } from '@/lib/api'
import { formatCEP, pickAddress } from '@/utils/generate-address'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const state = parseStateParam(searchParams)
  if (state === null)
    return badRequest('state must be a state code, e.g. "SP".')

  const formatted = parseBooleanParam(searchParams, 'formatted', true)
  if (formatted === null) return badRequest('formatted must be true or false.')

  const { cep, street, neighborhood, city, state: uf } = pickAddress(state)

  return NextResponse.json({
    address: {
      cep: formatted ? formatCEP(cep) : cep,
      street,
      neighborhood,
      city,
      state: uf,
    },
  })
}
