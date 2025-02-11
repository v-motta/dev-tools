import { validateCPF } from '@/lib/validate-cpf'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { cpf } = await request.json()

  const status = validateCPF(cpf)

  if (!status) {
    return NextResponse.json({ status: false }, { status: 400 })
  }

  return NextResponse.json({ status })
}
