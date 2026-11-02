import { NextResponse } from 'next/server'
import { badRequest, readJsonObject } from '@/lib/api'
import { validateCNPJ } from '@/utils/validate-cnpj'

export async function POST(request: Request) {
  const body = await readJsonObject(request)

  if (typeof body?.cnpj !== 'string') {
    return badRequest(
      'The request body must be a JSON object with a "cnpj" string.'
    )
  }

  const isValid = validateCNPJ(body.cnpj)

  return NextResponse.json({ isValid })
}
