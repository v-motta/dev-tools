import { NextResponse } from 'next/server'
import { badRequest, parseChoiceParam, parseStateParam } from '@/lib/api'
import { generatePerson, SEXES } from '@/utils/generate-person'
import { isNationality } from '@/utils/nationalities'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const sex = parseChoiceParam(searchParams, 'sex', SEXES, undefined)
  if (sex === null) return badRequest('sex must be "female" or "male".')

  // Case-insensitive like the state, so "de" works as well as "DE"
  const nationality = (searchParams.get('nationality') ?? 'BR').toUpperCase()
  if (!isNationality(nationality)) {
    return badRequest(
      'nationality must be a supported country code, e.g. "BR" or "DE".'
    )
  }

  const state = parseStateParam(searchParams)
  if (state === null)
    return badRequest('state must be a state code, e.g. "SP".')
  if (state && nationality !== 'BR') {
    return badRequest('state is only available for nationality "BR".')
  }

  return NextResponse.json({
    person: generatePerson({ nationality, sex, state }),
  })
}
