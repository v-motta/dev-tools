import { NextResponse } from 'next/server'
import { isStateCode, type StateCode } from '@/utils/states'

export function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

/** Returns the request body if it is a JSON object, otherwise `null`. */
export async function readJsonObject(
  request: Request
): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json()

    return typeof body === 'object' && body !== null && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null
  } catch {
    return null
  }
}

/** Accepts integers sent either as numbers or numeric strings (form data). */
export function parseInteger(value: unknown): number | null {
  const number =
    typeof value === 'number'
      ? value
      : typeof value === 'string' && value.trim() !== ''
        ? Number(value)
        : Number.NaN

  return Number.isSafeInteger(number) ? number : null
}

/**
 * Reads a `true`/`false` query parameter. Returns `fallback` when it is
 * missing and `null` when it has any other value.
 */
export function parseBooleanParam(
  searchParams: URLSearchParams,
  name: string,
  fallback: boolean
): boolean | null {
  const value = searchParams.get(name)
  if (value === null) return fallback
  if (value === 'true') return true
  if (value === 'false') return false

  return null
}

/**
 * Reads a query parameter that must be one of `choices`. Returns `fallback`
 * when it is missing and `null` when it has any other value.
 */
export function parseChoiceParam<T extends string>(
  searchParams: URLSearchParams,
  name: string,
  choices: readonly T[],
  fallback: T | undefined
): T | undefined | null {
  const value = searchParams.get(name)
  if (value === null) return fallback

  return choices.includes(value as T) ? (value as T) : null
}

/** Reads `?state=` as a state code, in any case. See `parseChoiceParam`. */
export function parseStateParam(
  searchParams: URLSearchParams,
  fallback?: StateCode
) {
  const value = searchParams.get('state')
  if (value === null) return fallback

  const state = value.toUpperCase()
  return isStateCode(state) ? state : null
}

export const MAX_GENERATOR_QUANTITY = 50

/**
 * Responds with `{ [field]: value }`, or with `{ [field + 's']: values }`
 * when `?quantity=` is given, so the single-value shape stays unchanged.
 */
export function generatorResponse(
  searchParams: URLSearchParams,
  field: string,
  generate: () => unknown
) {
  if (!searchParams.has('quantity')) {
    return NextResponse.json({ [field]: generate() })
  }

  const quantity = parseInteger(searchParams.get('quantity'))
  if (quantity === null || quantity < 1 || quantity > MAX_GENERATOR_QUANTITY) {
    return badRequest(
      `The quantity must be an integer between 1 and ${MAX_GENERATOR_QUANTITY}.`
    )
  }

  return NextResponse.json({
    [`${field}s`]: Array.from({ length: quantity }, () => generate()),
  })
}
