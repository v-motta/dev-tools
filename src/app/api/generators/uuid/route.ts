import { randomUUID } from 'node:crypto'
import { generatorResponse } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  return generatorResponse(searchParams, 'uuid', () => randomUUID())
}
