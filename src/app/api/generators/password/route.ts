import {
  badRequest,
  generatorResponse,
  parseBooleanParam,
  parseInteger,
} from '@/lib/api'
import {
  generateApplePassword,
  generateCustomPassword,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/utils/generate-password'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const style = searchParams.get('style') ?? 'apple'
  if (style === 'apple') {
    return generatorResponse(searchParams, 'password', generateApplePassword)
  }
  if (style !== 'custom') {
    return badRequest('style must be "apple" or "custom".')
  }

  const length = searchParams.has('length')
    ? parseInteger(searchParams.get('length'))
    : 16
  if (
    length === null ||
    length < PASSWORD_MIN_LENGTH ||
    length > PASSWORD_MAX_LENGTH
  ) {
    return badRequest(
      `The length must be an integer between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH}.`
    )
  }

  const uppercase = parseBooleanParam(searchParams, 'uppercase', true)
  const numbers = parseBooleanParam(searchParams, 'numbers', true)
  const symbols = parseBooleanParam(searchParams, 'symbols', true)
  if (uppercase === null || numbers === null || symbols === null) {
    return badRequest('uppercase, numbers and symbols must be true or false.')
  }

  return generatorResponse(searchParams, 'password', () =>
    generateCustomPassword({ length, uppercase, numbers, symbols })
  )
}
