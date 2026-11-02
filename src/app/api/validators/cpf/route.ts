import { NextResponse } from 'next/server'
import { badRequest, readJsonObject } from '@/lib/api'
import { validateCPF } from '@/utils/validate-cpf'

export async function POST(request: Request) {
  const body = await readJsonObject(request)

  if (typeof body?.cpf !== 'string') {
    return badRequest(
      'The request body must be a JSON object with a "cpf" string.'
    )
  }

  const isValid = validateCPF(body.cpf)

  return NextResponse.json({ isValid })
}
