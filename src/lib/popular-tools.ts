import { unstable_cache } from 'next/cache'
import { findToolByUrl, type SidebarSubMenuItem } from '@/app/tools'
import { redis } from './redis'

/** Sorted set of tool URLs, scored by how many sessions opened each one */
export const TOOL_VIEWS_KEY = 'tool-views'

export const POPULAR_TOOLS_REVALIDATE = 3600

const POPULAR_TOOLS_COUNT = 3

/**
 * Fills the highlights while there are no views yet, when Redis isn't
 * configured or when it can't be reached.
 */
const FALLBACK_TOOL_URLS = [
  '/brazil/documents/cpf',
  '/brazil/documents/cnpj',
  '/development/generators/person',
]

// The ranking can hold URLs of tools that were renamed or removed, so it
// reads a few extra to still have enough after dropping those
const getRankedToolUrls = unstable_cache(
  async () =>
    redis
      ? redis.zrange<string[]>(TOOL_VIEWS_KEY, 0, POPULAR_TOOLS_COUNT * 3, {
          rev: true,
        })
      : [],
  [TOOL_VIEWS_KEY],
  { revalidate: POPULAR_TOOLS_REVALIDATE }
)

/** The most opened tools, completed with the fallback ones when needed. */
export async function getPopularTools() {
  let rankedUrls: string[] = []

  try {
    rankedUrls = await getRankedToolUrls()
  } catch (error) {
    console.error('Could not read the tool ranking', error)
  }

  const urls = new Set([...rankedUrls, ...FALLBACK_TOOL_URLS])
  const popularTools: SidebarSubMenuItem[] = []

  for (const url of urls) {
    const found = findToolByUrl(url)
    // A moved tool can be ranked under both its old and its new URL
    if (found && !popularTools.includes(found.tool)) {
      popularTools.push(found.tool)
    }
    if (popularTools.length === POPULAR_TOOLS_COUNT) break
  }

  return popularTools
}
