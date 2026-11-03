import { defineRouting } from 'next-intl/routing'

// Locales keep their canonical casing for Intl and hreflang, while the URL
// uses lowercase prefixes
export const LOCALE_PREFIXES = {
  'pt-BR': '/pt-br',
  'de-DE': '/de-de',
  'en-US': '/en-us',
} as const

export const routing = defineRouting({
  locales: ['pt-BR', 'de-DE', 'en-US'],
  // Last resort, used when neither the browser nor the country gives a
  // supported locale. The proxy swaps it for the visitor's country locale.
  defaultLocale: 'en-US',
  localePrefix: {
    mode: 'always',
    prefixes: LOCALE_PREFIXES,
  },
})

export type Locale = (typeof routing.locales)[number]
