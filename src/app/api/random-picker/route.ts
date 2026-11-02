import { NextResponse } from 'next/server'
import { badRequest, parseInteger, readJsonObject } from '@/lib/api'

const MAX_COUNT = 1000
const MAX_ABSOLUTE_VALUE = 1_000_000_000

export async function POST(request: Request) {
  const body = await readJsonObject(request)
  if (!body) return badRequest('The request body must be a JSON object.')

  const count = parseInteger(body.random_count)
  const min = parseInteger(body.random_min)
  const max = parseInteger(body.random_max)

  if (count === null || count < 1 || count > MAX_COUNT) {
    return badRequest(
      `The count must be an integer between 1 and ${MAX_COUNT}.`
    )
  }

  if (
    min === null ||
    max === null ||
    Math.abs(min) > MAX_ABSOLUTE_VALUE ||
    Math.abs(max) > MAX_ABSOLUTE_VALUE
  ) {
    return badRequest(
      `The min and max must be integers between -${MAX_ABSOLUTE_VALUE} and ${MAX_ABSOLUTE_VALUE}.`
    )
  }

  if (min > max) {
    return badRequest('The min must be less than or equal to the max.')
  }

  const randomNumber = Array.from({ length: count }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  })

  return NextResponse.json({ randomNumber })
}
