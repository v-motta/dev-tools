'use client'

import ky from 'ky'
import { Check, LoaderCircle, X } from 'lucide-react'
import { type FormEvent, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const documents = {
  cpf: {
    name: 'CPF',
    placeholder: '123.456.789-10',
    maxLength: 14,
    mask: (digits: string) =>
      digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  },
  cnpj: {
    name: 'CNPJ',
    placeholder: '00.623.904/0001-73',
    maxLength: 18,
    mask: (digits: string) =>
      digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2'),
  },
}

interface DocumentValidatorProps {
  document: keyof typeof documents
}

type ValidationStatus = 'valid' | 'invalid' | 'error'

export function DocumentValidator({ document }: DocumentValidatorProps) {
  const { name, placeholder, maxLength, mask } = documents[document]
  const messageId = useId()

  const [value, setValue] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [status, setStatus] = useState<ValidationStatus>()

  const messages: Record<ValidationStatus, string> = {
    valid: `${name} válido`,
    invalid: `${name} inválido`,
    error: `Não foi possível validar o ${name}. Tente novamente.`,
  }

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)

    try {
      const { isValid } = await ky
        .post(`/api/validators/${document}`, { json: { [document]: value } })
        .json<{ isValid: boolean }>()

      setStatus(isValid ? 'valid' : 'invalid')
    } catch {
      setStatus('error')
    } finally {
      setIsPending(false)
    }
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    setValue(mask(event.currentTarget.value.replace(/\D/g, '')))
    // The previous result no longer applies to the edited value
    setStatus(undefined)
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor={document}>Digite o {name}</Label>
        <div className="relative">
          <Input
            type="text"
            inputMode="numeric"
            id={document}
            name={document}
            value={value}
            onChange={handleOnChange}
            placeholder={placeholder}
            maxLength={maxLength}
            required
            aria-invalid={status === 'invalid'}
            aria-describedby={messageId}
            className={cn(
              'pr-9',
              status === 'valid' && 'border-emerald-500!',
              status === 'invalid' && 'border-red-500!'
            )}
          />

          {status === 'valid' && (
            <Check
              className="absolute right-2 top-2 text-emerald-500"
              aria-hidden
            />
          )}
          {status === 'invalid' && (
            <X className="absolute right-2 top-2 text-red-500" aria-hidden />
          )}
        </div>

        <p
          id={messageId}
          role="status"
          className={cn(
            'min-h-5 text-sm font-medium',
            status === 'valid' && 'text-emerald-600 dark:text-emerald-500',
            status !== 'valid' && 'text-red-500'
          )}
        >
          {status && messages[status]}
        </p>
      </div>

      <Button className="w-full" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="animate-spin" aria-label="Validando" />
        ) : (
          `Validar ${name}`
        )}
      </Button>
    </form>
  )
}
