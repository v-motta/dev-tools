'use client'

import ky from 'ky'
import { Check, LoaderCircle, X } from 'lucide-react'
import { type FormEvent, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { STATE_CHOICES } from '@/utils/states'

const onlyDigits = (value: string) => value.replace(/\D/g, '')

interface DocumentConfig {
  name: string
  /** Portuguese inflects "o/a" and "válido/válida" by the document's gender */
  feminine?: boolean
  /** Body field sent to `/api/validators/{document}` */
  field: string
  placeholder: string
  maxLength: number
  inputMode: 'numeric' | 'text'
  /** Turns what was typed into the value shown in the field */
  mask: (value: string) => string
  /** Asks for the state too, for numbers each state issues its own way */
  withState?: boolean
}

const documents = {
  cpf: {
    name: 'CPF',
    field: 'cpf',
    placeholder: '123.456.789-10',
    maxLength: 14,
    inputMode: 'numeric',
    mask: (value) =>
      onlyDigits(value)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  },
  cnpj: {
    name: 'CNPJ',
    field: 'cnpj',
    placeholder: '00.623.904/0001-73',
    maxLength: 18,
    inputMode: 'numeric',
    mask: (value) =>
      onlyDigits(value)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2'),
  },
  rg: {
    name: 'RG',
    field: 'rg',
    placeholder: '12.345.678-X',
    maxLength: 12,
    // The check digit can be an X, which a numeric keyboard can't type
    inputMode: 'text',
    mask: (value) =>
      value
        .toUpperCase()
        .replace(/[^\dX]/g, '')
        // Only the check digit can be an X
        .replace(/X(?=.)/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})([\dX])$/, '.$1-$2'),
  },
  cnh: {
    name: 'CNH',
    feminine: true,
    field: 'cnh',
    placeholder: '12345678900',
    maxLength: 11,
    inputMode: 'numeric',
    mask: onlyDigits,
  },
  'state-registration': {
    name: 'inscrição estadual',
    feminine: true,
    field: 'stateRegistration',
    placeholder: 'Com ou sem pontuação',
    maxLength: 20,
    inputMode: 'numeric',
    // Every state formats it differently, so only stray letters are removed
    mask: (value) => value.replace(/[^\d./-]/g, ''),
    withState: true,
  },
} satisfies Record<string, DocumentConfig>

interface DocumentValidatorProps {
  document: keyof typeof documents
}

type ValidationStatus = 'valid' | 'invalid' | 'error'

export function DocumentValidator({ document }: DocumentValidatorProps) {
  const config: DocumentConfig = documents[document]
  const { name, feminine, field, placeholder, maxLength, inputMode, mask } =
    config
  const id = useId()
  const messageId = useId()

  const [value, setValue] = useState('')
  const [state, setState] = useState('SP')
  const [isPending, setIsPending] = useState(false)
  const [status, setStatus] = useState<ValidationStatus>()

  const article = feminine ? 'a' : 'o'
  const capitalized = name[0].toUpperCase() + name.slice(1)
  const messages: Record<ValidationStatus, string> = {
    valid: `${capitalized} ${feminine ? 'válida' : 'válido'}`,
    invalid: `${capitalized} ${feminine ? 'inválida' : 'inválido'}`,
    error: `Não foi possível validar ${article} ${name}. Tente novamente.`,
  }

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)

    try {
      const { isValid } = await ky
        .post(`/api/validators/${document}`, {
          json: { [field]: value, ...(config.withState && { state }) },
        })
        .json<{ isValid: boolean }>()

      setStatus(isValid ? 'valid' : 'invalid')
    } catch {
      setStatus('error')
    } finally {
      setIsPending(false)
    }
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    setValue(mask(event.currentTarget.value))
    // The previous result no longer applies to the edited value
    setStatus(undefined)
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      {config.withState && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-state`}>Estado</Label>
          <Select
            value={state}
            onValueChange={(value) => {
              setState(value)
              setStatus(undefined)
            }}
          >
            <SelectTrigger id={`${id}-state`} className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATE_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor={id}>
          Digite {article} {name}
        </Label>
        <div className="relative">
          <Input
            type="text"
            inputMode={inputMode}
            id={id}
            name={field}
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
