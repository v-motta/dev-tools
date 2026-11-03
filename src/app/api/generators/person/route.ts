import { NextResponse } from 'next/server'
import { badRequest, parseChoiceParam, parseStateParam } from '@/lib/api'
import { generatePerson, SEXES } from '@/utils/generate-person'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const sex = parseChoiceParam(searchParams, 'sex', SEXES, undefined)
  if (sex === null) return badRequest('sex must be "female" or "male".')

  const state = parseStateParam(searchParams)
  if (state === null)
    return badRequest('state must be a state code, e.g. "SP".')

  return NextResponse.json({ person: generatePerson({ sex, state }) })
}
