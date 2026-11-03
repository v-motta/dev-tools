'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { type Locale, routing } from '@/i18n/routing'
import { LOCALE_FLAGS } from './flags'

/** Each language in its own name, so it can be found whatever the current one */
const LOCALE_NAMES: Record<Locale, string> = {
  'pt-BR': 'Português',
  'de-DE': 'Deutsch',
  'en-US': 'English',
}

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value)
}

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const CurrentFlag = LOCALE_FLAGS[locale]

  function changeLocale(value: string) {
    if (!isLocale(value)) return

    // Going through the locale prefix also stores the choice in a cookie,
    // which wins over the browser and country detection from then on
    startTransition(() => router.replace(pathname, { locale: value }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`${t('label')}: ${LOCALE_NAMES[locale]}`}
          disabled={isPending}
        >
          <CurrentFlag className="size-auto rounded-[2px]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={changeLocale}>
          {routing.locales.map((option) => {
            const Flag = LOCALE_FLAGS[option]

            return (
              <DropdownMenuRadioItem key={option} value={option} lang={option}>
                <Flag className="size-auto rounded-[2px]" />
                {LOCALE_NAMES[option]}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
