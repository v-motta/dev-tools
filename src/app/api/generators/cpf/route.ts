import { NextResponse } from 'next/server'
import { generateCPF } from '@/utils/generate-cpf'

export async function GET() {
  const generatedCPF = generateCPF()

  return NextResponse.json({ cpf: generatedCPF })
}
