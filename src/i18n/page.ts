import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allTools, type ToolId } from '@/app/tools'
import { getPathname } from './navigation'
import { type Locale, routing } from './routing'

type LocaleParams = Promise<{ locale: string }>

/**
 * Reads the locale from the URL and lets the page render statically instead
 * of from the request. The root layout already checked that it is supported.
 */
export async function initPage(params: LocaleParams) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return locale as Locale
}

/** The URL of `href` in every locale, for the hreflang links. */
export function localizedAlternates(locale: Locale, href: string) {
  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((other) => [
          other,
          getPathname({ locale: other, href }),
        ])
      ),
      // The unprefixed URL redirects each visitor to their own language
      'x-default': href,
    },
  }
}

/** `generateMetadata` for a tool page, from `pages.{id}.metadata`. */
export function toolMetadata(id: ToolId) {
  return async ({ params }: { params: LocaleParams }): Promise<Metadata> => {
    const locale = (await params).locale as Locale
    const t = await getTranslations({ locale, namespace: 'pages' })
    const url = allTools.find((tool) => tool.id === id)?.url ?? '/'

    return {
      title: t(`${id}.metadata.title`),
      description: t(`${id}.metadata.description`),
      keywords: t.raw(`${id}.metadata.keywords`) as string[],
      alternates: localizedAlternates(locale, url),
    }
  }
}
