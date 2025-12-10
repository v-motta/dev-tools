import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

export async function GET() {
  const uuid = randomUUID()

  return NextResponse.json({ uuid })
}
