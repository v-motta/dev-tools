import { useLocale } from 'next-intl'
import { useMemo } from 'react'
import type { Locale } from '@/i18n/routing'

/** The currency prices are shown in, for each language */
const CURRENCIES: Record<Locale, string> = {
  'pt-BR': 'BRL',
  'de-DE': 'EUR',
  'en-US': 'USD',
}

export function formatNumber(
  locale: Locale,
  value: number,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(value)
}

export function formatCurrency(locale: Locale, value: number) {
  return formatNumber(locale, value, {
    style: 'currency',
    currency: CURRENCIES[locale],
  })
}

/** The decimal separator of `locale`, e.g. "," in pt-BR and "." in en-US. */
export function decimalSeparator(locale: Locale) {
  return (
    new Intl.NumberFormat(locale)
      .formatToParts(1.5)
      .find((part) => part.type === 'decimal')?.value ?? '.'
  )
}

/**
 * Parses a number typed with either a comma or a dot as the decimal
 * separator, whatever the locale, since people type the one they are used to.
 */
export function parseDecimal(value: string) {
  const normalized = value.trim().replace(',', '.')
  return normalized === '' ? Number.NaN : Number(normalized)
}

/** The formatters above, bound to the page's locale. */
export function useLocaleFormat() {
  const locale = useLocale()

  return useMemo(
    () => ({
      formatNumber: (value: number, options?: Intl.NumberFormatOptions) =>
        formatNumber(locale, value, options),
      formatCurrency: (value: number) => formatCurrency(locale, value),
      decimalSeparator: decimalSeparator(locale),
    }),
    [locale]
  )
}
