// Single place for the site's locale, so that adding i18n later means
// replacing these constants with the visitor's locale instead of hunting
// down hard-coded formats
export const LOCALE = 'pt-BR'
export const CURRENCY = 'BRL'

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(LOCALE, options).format(value)
}

/** Parses a number typed with either a comma or a dot as the decimal separator. */
export function parseDecimal(value: string) {
  const normalized = value.trim().replace(',', '.')
  return normalized === '' ? Number.NaN : Number(normalized)
}
