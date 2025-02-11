import { validateCNPJ } from '@/lib/validate-cnpj'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { cnpj } = await request.json()

  const isValid = validateCNPJ(cnpj)

  return NextResponse.json({ isValid })
}
