import { badRequest, generatorResponse, parseBooleanParam } from '@/lib/api'
import { generateCNPJ } from '@/utils/generate-cnpj'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const formatted = parseBooleanParam(searchParams, 'formatted', true)
  if (formatted === null) return badRequest('formatted must be true or false.')

  return generatorResponse(searchParams, 'cnpj', () => generateCNPJ(formatted))
}
