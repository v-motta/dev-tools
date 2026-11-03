import { userAgent } from 'next/server'
import { findToolByUrl } from '@/app/tools'
import { badRequest, readJsonObject } from '@/lib/api'
import { TOOL_VIEWS_KEY } from '@/lib/popular-tools'
import { redis } from '@/lib/redis'

/** Counts a session opening a tool, for the home page highlights. */
export async function POST(request: Request) {
  const body = await readJsonObject(request)

  // Only known tools are counted, so the ranking can't be filled with junk
  if (typeof body?.url !== 'string' || !findToolByUrl(body.url)) {
    return badRequest(
      'The request body must be a JSON object with the "url" of a tool.'
    )
  }

  if (redis && !userAgent(request).isBot) {
    await redis.zincrby(TOOL_VIEWS_KEY, 1, body.url)
  }

  return new Response(null, { status: 204 })
}
