import { NextResponse } from 'next/server'
import { badRequest, readJsonObject } from '@/lib/api'
import { validateCNH } from '@/utils/validate-cnh'

export async function POST(request: Request) {
  const body = await readJsonObject(request)

  if (typeof body?.cnh !== 'string') {
    return badRequest(
      'The request body must be a JSON object with a "cnh" string.'
    )
  }

  const isValid = validateCNH(body.cnh)

  return NextResponse.json({ isValid })
}
