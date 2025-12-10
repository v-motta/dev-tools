import { NextResponse } from 'next/server'
import { validateCNPJ } from '@/utils/validate-cnpj'

export async function POST(request: Request) {
  const { cnpj } = await request.json()

  const isValid = validateCNPJ(cnpj)

  return NextResponse.json({ isValid })
}
