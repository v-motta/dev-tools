import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { random_count, random_min, random_max } = await request.json()

  const min = parseInt(random_min, 10)
  const max = parseInt(random_max, 10)
  const count = parseInt(random_count, 10)

  const randomNumber = Array.from({ length: count }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  })

  return NextResponse.json({ randomNumber })
}
