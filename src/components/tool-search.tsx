'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Command } from 'cmdk'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { tools } from '@/app/tools'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'

const menuItems = tools.flatMap((group) => group.menuItems)

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

// Every typed word has to appear somewhere, ignoring accents, so "calculadora
// idade" and "matematica" both match
function filter(value: string, search: string, keywords: string[] = []) {
  const haystack = normalize([value, ...keywords].join(' '))
  const terms = normalize(search).split(/\s+/).filter(Boolean)

  return terms.every((term) => haystack.includes(term)) ? 1 : 0
}

export function ToolSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations('search')
  const tTools = useTranslations('tools')

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((isOpen) => !isOpen)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-muted-foreground sm:w-64 sm:justify-start"
          aria-keyshortcuts="Control+K Meta+K"
        >
          <Search />
          <span className="sr-only sm:not-sr-only">{t('button')}</span>
          <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-xs sm:inline">
            Ctrl K
          </kbd>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg"
        >
          <Dialog.Title className="sr-only">{t('button')}</Dialog.Title>

          <Command filter={filter} loop>
            <div className="flex items-center gap-2 border-b px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Command.Input
                placeholder={t('placeholder')}
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                {t('empty')}
              </Command.Empty>

              {menuItems.map((menuItem) => (
                <Command.Group
                  key={menuItem.id}
                  heading={tTools(`menus.${menuItem.id}`)}
                  className="**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground"
                >
                  {menuItem.subMenuItems.map((tool) => {
                    const title = tTools(`items.${tool.id}.title`)
                    const description = tTools(`items.${tool.id}.description`)

                    return (
                      <Command.Item
                        key={tool.url}
                        value={title}
                        keywords={[
                          description,
                          tTools(`menus.${menuItem.id}`),
                          tTools(`items.${tool.id}.keywords`),
                          ...(tool.aliases ?? []),
                        ]}
                        onSelect={() => {
                          setOpen(false)
                          router.push(tool.url)
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        <tool.icon className="size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p>{title}</p>
                          <p className="text-xs text-muted-foreground">
                            {description}
                          </p>
                        </div>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
