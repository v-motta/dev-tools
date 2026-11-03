import { NextResponse } from 'next/server'
import { badRequest, readJsonObject } from '@/lib/api'
import { validateRG } from '@/utils/validate-rg'

export async function POST(request: Request) {
  const body = await readJsonObject(request)

  if (typeof body?.rg !== 'string') {
    return badRequest(
      'The request body must be a JSON object with a "rg" string.'
    )
  }

  const isValid = validateRG(body.rg)

  return NextResponse.json({ isValid })
}
