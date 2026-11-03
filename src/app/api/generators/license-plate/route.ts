import { badRequest, generatorResponse, parseChoiceParam } from '@/lib/api'
import {
  generateLicensePlate,
  PLATE_FORMATS,
} from '@/utils/generate-license-plate'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const format = parseChoiceParam(
    searchParams,
    'format',
    PLATE_FORMATS,
    'mercosul'
  )
  if (!format) return badRequest('format must be "mercosul" or "old".')

  return generatorResponse(searchParams, 'plate', () =>
    generateLicensePlate(format)
  )
}
