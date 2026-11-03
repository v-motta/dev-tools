// Compares every locale's messages with pt-BR, the source language: the same
// keys, the same array lengths and the same {placeholders} in each message.
// SEO keywords are the exception: each language lists its own search terms.
// Exits with an error listing every difference.
import { readdirSync, readFileSync } from 'node:fs'

const MESSAGES_DIR = new URL('../messages/', import.meta.url)
const SOURCE_LOCALE = 'pt-BR'

type Messages = { [key: string]: string | string[] | Messages }

function readMessages(locale: string): Messages {
  return JSON.parse(
    readFileSync(new URL(`${locale}.json`, MESSAGES_DIR), 'utf8')
  )
}

/** Flattens to `a.b.c` keys; array items get their index as the last part. */
function flatten(messages: Messages, prefix = ''): Map<string, string> {
  const entries = new Map<string, string>()

  for (const [key, value] of Object.entries(messages)) {
    const path = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      entries.set(path, value)
    } else if (key === 'keywords' && Array.isArray(value)) {
      entries.set(path, value.join(', '))
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        entries.set(`${path}.${index}`, item)
      })
    } else {
      for (const [nested, text] of flatten(value, path)) {
        entries.set(nested, text)
      }
    }
  }

  return entries
}

/** The argument names of an ICU message, e.g. `{count, plural, ...}` → count */
function placeholders(message: string) {
  return [...message.matchAll(/\{\s*(\w+)\s*[,}]/g)]
    .map(([, name]) => name)
    .sort()
    .join(', ')
}

const source = flatten(readMessages(SOURCE_LOCALE))
const locales = readdirSync(MESSAGES_DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''))
  .filter((locale) => locale !== SOURCE_LOCALE)

const problems: string[] = []

for (const locale of locales) {
  const messages = flatten(readMessages(locale))

  for (const [key, text] of source) {
    const translation = messages.get(key)

    if (translation === undefined) {
      problems.push(`${locale}: missing "${key}"`)
    } else if (placeholders(translation) !== placeholders(text)) {
      problems.push(
        `${locale}: "${key}" has {${placeholders(translation)}}, expected {${placeholders(text)}}`
      )
    }
  }

  for (const key of messages.keys()) {
    if (!source.has(key)) problems.push(`${locale}: unknown "${key}"`)
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'))
  process.exit(1)
}

console.log(`Messages match ${SOURCE_LOCALE} in: ${locales.join(', ')}`)
