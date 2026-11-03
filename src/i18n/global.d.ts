import type messages from '../../messages/pt-BR.json'
import type { routing } from './routing'

// pt-BR is the source language, so a key missing from it is a type error
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
