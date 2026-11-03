import type { Locale } from './routing'

const COUNTRY_LOCALES: Record<string, Locale> = {
  // Portuguese-speaking countries
  BR: 'pt-BR',
  PT: 'pt-BR',
  AO: 'pt-BR',
  MZ: 'pt-BR',
  CV: 'pt-BR',
  GW: 'pt-BR',
  ST: 'pt-BR',
  TL: 'pt-BR',
  // German-speaking countries
  DE: 'de-DE',
  AT: 'de-DE',
  CH: 'de-DE',
  LI: 'de-DE',
  LU: 'de-DE',
}

/** The locale spoken in a country, from its ISO 3166-1 alpha-2 code. */
export function localeFromCountry(country: string | null): Locale | null {
  return country ? (COUNTRY_LOCALES[country.toUpperCase()] ?? null) : null
}
