import { NextResponse } from 'next/server'
import { badRequest, readJsonObject } from '@/lib/api'
import { validateStateRegistration } from '@/utils/state-registration'
import { isStateCode } from '@/utils/states'

export async function POST(request: Request) {
  const body = await readJsonObject(request)

  if (typeof body?.stateRegistration !== 'string') {
    return badRequest(
      'The request body must be a JSON object with a "stateRegistration" string.'
    )
  }

  const state = typeof body.state === 'string' ? body.state.toUpperCase() : ''
  if (!isStateCode(state)) {
    return badRequest('"state" must be a state code, e.g. "SP".')
  }

  const isValid = validateStateRegistration(body.stateRegistration, state)

  return NextResponse.json({ isValid })
}
