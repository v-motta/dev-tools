import { NextResponse } from 'next/server'
import { badRequest, parseStateParam } from '@/lib/api'
import { generateCompany } from '@/utils/generate-company'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const state = parseStateParam(searchParams)
  if (state === null)
    return badRequest('state must be a state code, e.g. "SP".')

  return NextResponse.json({ company: generateCompany({ state }) })
}
