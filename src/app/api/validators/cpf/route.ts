import { validateCPF } from '@/lib/validate-cpf'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { cpf } = await request.json()

  const isValid = validateCPF(cpf)

  return NextResponse.json({ isValid })
}
