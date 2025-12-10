import { NextResponse } from 'next/server'
import { generatePassword } from '@/utils/generate-password'

export async function GET() {
  const generatedPassword = generatePassword()

  return NextResponse.json({ password: generatedPassword })
}
