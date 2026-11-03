import { allLocales, base, Faker, type LocaleDefinition } from '@faker-js/faker'

type FakerLocale = keyof typeof allLocales

/**
 * The faker locale used for each nationality, by ISO 3166-1 country code.
 * Where faker has several locales for a country, the one with the most data
 * wins; locales without their own names or addresses (e.g. bn_BD, mn_MN_cyrl)
 * and languages without a country (e.g. ar, eo) are left out.
 */
const NATIONALITY_LOCALES = {
  AM: 'hy',
  AT: 'de_AT',
  AU: 'en_AU',
  AZ: 'az',
  BE: 'nl_BE',
  BR: 'pt_BR',
  CA: 'en_CA',
  CH: 'de_CH',
  CN: 'zh_CN',
  CZ: 'cs_CZ',
  DE: 'de',
  DK: 'da',
  ES: 'es',
  FI: 'fi',
  FR: 'fr',
  GB: 'en_GB',
  GE: 'ka_GE',
  GH: 'en_GH',
  GR: 'el',
  HK: 'en_HK',
  HR: 'hr',
  HU: 'hu',
  ID: 'id_ID',
  IE: 'en_IE',
  IL: 'he',
  IN: 'en_IN',
  IR: 'fa',
  IT: 'it',
  JP: 'ja',
  KR: 'ko',
  LU: 'fr_LU',
  LV: 'lv',
  MD: 'ro_MD',
  MK: 'mk',
  MV: 'dv',
  MX: 'es_MX',
  NG: 'en_NG',
  NL: 'nl',
  NO: 'nb_NO',
  NP: 'ne',
  PK: 'ur',
  PL: 'pl',
  PT: 'pt_PT',
  RO: 'ro',
  RS: 'sr_RS_latin',
  RU: 'ru',
  SE: 'sv',
  SI: 'sl_SI',
  SK: 'sk',
  SN: 'fr_SN',
  TH: 'th',
  TR: 'tr',
  TW: 'zh_TW',
  UA: 'uk',
  US: 'en_US',
  UZ: 'uz_UZ_latin',
  VN: 'vi',
  ZA: 'en_ZA',
} as const satisfies Record<string, FakerLocale>

export type Nationality = keyof typeof NATIONALITY_LOCALES

export const NATIONALITIES = Object.keys(NATIONALITY_LOCALES) as Nationality[]

export function isNationality(value: string): value is Nationality {
  return value in NATIONALITY_LOCALES
}

/** The BCP 47 tag for Intl, e.g. de_AT → de-AT and ja (Japan) → ja-JP. */
export function intlLocale(nationality: Nationality) {
  const [language, , script] = NATIONALITY_LOCALES[nationality].split('_')
  // sr_RS_latin and uz_UZ_latin are written in the Latin script
  return script === 'latin'
    ? `${language}-Latn-${nationality}`
    : `${language}-${nationality}`
}

export interface NationalityFaker {
  faker: Faker
  /**
   * Whether the country itself has data at `path`, e.g. "location.state".
   * The English fallback is US data, so it only counts for the US.
   */
  defines: (path: string) => boolean
}

function lookup(definition: LocaleDefinition | undefined, path: string) {
  return path
    .split('.')
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === 'object'
          ? (node as Record<string, unknown>)[key]
          : undefined,
      definition
    )
}

const fakers = new Map<Nationality, NationalityFaker>()

/**
 * A faker for the nationality that falls back to its language (de_AT → de),
 * and to English only for names of English-speaking countries that have none.
 */
export function getNationalityFaker(nationality: Nationality) {
  const cached = fakers.get(nationality)
  if (cached) return cached

  const code = NATIONALITY_LOCALES[nationality]
  const own = allLocales[code]
  const language = code.split('_')[0] as FakerLocale
  const parent = language !== code ? allLocales[language] : undefined

  const chain = [own, parent, base].filter(
    (definition): definition is LocaleDefinition => definition !== undefined
  )
  const countryChain =
    language === 'en' && nationality !== 'US' ? [own] : chain.slice(0, -1)

  const nationalityFaker: NationalityFaker = {
    faker: new Faker({ locale: chain }),
    // Like faker, the first locale in the chain that has the key decides; null
    // marks data that doesn't apply to the country (e.g. Moldova's states)
    defines: (path) => {
      for (const definition of countryChain) {
        const value = lookup(definition, path)
        if (value !== undefined) return value !== null
      }
      return false
    },
  }

  fakers.set(nationality, nationalityFaker)
  return nationalityFaker
}

/**
 * How the country writes a full name, e.g. "{{person.lastName}}
 * {{person.firstName}}" in Japan. Only patterns with exactly a first name and
 * a surname count, so generated names never get a title such as "Dr." or a
 * middle name.
 */
export function namePattern(nationality: Nationality) {
  const { faker } = getNationalityFaker(nationality)
  const patterns =
    (faker.rawDefinitions.person?.name as
      | { value: string; weight: number }[]
      | undefined) ?? []

  return (
    patterns
      .filter(
        ({ value }) =>
          value.includes('{{person.firstName}}') &&
          value.includes('{{person.lastName}}') &&
          !/prefix|suffix|middleName/.test(value)
      )
      .sort((a, b) => b.weight - a.weight)[0]?.value ??
    '{{person.firstName}} {{person.lastName}}'
  )
}
