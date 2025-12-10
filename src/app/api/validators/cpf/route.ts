import { NextResponse } from 'next/server'
import { validateCPF } from '@/utils/validate-cpf'

export async function POST(request: Request) {
  const { cpf } = await request.json()

  const isValid = validateCPF(cpf)

  return NextResponse.json({ isValid })
}
