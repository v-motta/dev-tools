import { NextResponse } from 'next/server'

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
