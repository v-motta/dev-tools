import { Redis } from '@upstash/redis'

// The Vercel Marketplace integration names them KV_*; a database created
// directly on Upstash names them UPSTASH_REDIS_*
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

/** Null when Redis isn't configured, e.g. in local development. */
export const redis = url && token ? new Redis({ url, token }) : null
