import { generateCPF } from '@/lib/generate-cpf'
import { NextResponse } from 'next/server'

export async function GET() {
  const generatedCPF = generateCPF()

  return NextResponse.json({ cpf: generatedCPF })
}
