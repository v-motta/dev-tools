import { generatorResponse } from '@/lib/api'
import { generateCNH } from '@/utils/generate-cnh'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  return generatorResponse(searchParams, 'cnh', () => generateCNH())
}
