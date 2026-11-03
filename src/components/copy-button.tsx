'use client'

import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value: string
  /** Accessible name, e.g. "Copy CPF" */
  label: string
  /** Shows "Copy"/"Copied!" next to the icon instead of only the icon */
  showText?: boolean
  /** Text shown with `showText` before copying. Defaults to "Copy" */
  text?: string
  className?: string
}

export function CopyButton({
  value,
  label,
  showText = false,
  text,
  className,
}: CopyButtonProps) {
  const t = useTranslations('copyButton')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timeout = setTimeout(() => setIsCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [isCopied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
    } catch {
      // Clipboard access can be denied; the value is still selectable
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size={showText ? 'default' : 'icon'}
      className={cn('shrink-0 text-muted-foreground', className)}
      aria-label={isCopied ? t('copiedLabel') : label}
      onClick={handleCopy}
    >
      {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
      {showText && (isCopied ? t('copied') : (text ?? t('copy')))}
    </Button>
  )
}
