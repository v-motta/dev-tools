import {
  badRequest,
  generatorResponse,
  parseBooleanParam,
  parseStateParam,
} from '@/lib/api'
import { generateStateRegistration } from '@/utils/state-registration'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const state = parseStateParam(searchParams)
  if (!state) return badRequest('state must be a state code, e.g. "SP".')

  const formatted = parseBooleanParam(searchParams, 'formatted', true)
  if (formatted === null) return badRequest('formatted must be true or false.')

  return generatorResponse(searchParams, 'stateRegistration', () =>
    generateStateRegistration(state, formatted)
  )
}
