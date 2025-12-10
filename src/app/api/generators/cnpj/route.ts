import { NextResponse } from 'next/server'
import { generateCNPJ } from '@/utils/generate-cnpj'

export async function GET() {
  const generatedCNPJ = generateCNPJ()

  return NextResponse.json({ cnpj: generatedCNPJ })
}
