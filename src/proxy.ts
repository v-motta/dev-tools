import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { localeFromCountry } from './i18n/detect'
import { LOCALE_PREFIXES, type Locale, routing } from './i18n/routing'

// next-intl picks the locale from the cookie set by the language switcher,
// then from Accept-Language, and falls back to `defaultLocale`. Swapping that
// fallback for the country's locale gives the full order: manual choice,
// browser, country and, last, en-US.
const handlers = new Map(
  routing.locales.map((locale) => [
    locale,
    createMiddleware({ ...routing, defaultLocale: locale }),
  ])
)

const prefixes: string[] = Object.values(LOCALE_PREFIXES)

/** `/pt-BR/cpf` → `/pt-br/cpf`, so each page has a single URL. */
function lowercasePrefixRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, firstSegment = ''] = pathname.split('/')
  const prefix = `/${firstSegment.toLowerCase()}`

  if (prefix === `/${firstSegment}` || !prefixes.includes(prefix)) return null

  const url = request.nextUrl.clone()
  url.pathname = prefix + pathname.slice(firstSegment.length + 1)

  return NextResponse.redirect(url, 308)
}

export default function proxy(request: NextRequest) {
  const redirect = lowercasePrefixRedirect(request)
  if (redirect) return redirect

  // Set by Vercel from the visitor's IP; missing locally
  const country = request.headers.get('x-vercel-ip-country')
  const fallback: Locale = localeFromCountry(country) ?? routing.defaultLocale

  return handlers.get(fallback)?.(request)
}

export const config = {
  // Everything but the API, Next internals and files such as favicon.ico
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
