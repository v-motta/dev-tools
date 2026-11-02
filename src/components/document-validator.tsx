'use client'

import ky from 'ky'
import { Check, X } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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

export function DocumentValidator({ document }: DocumentValidatorProps) {
  const { name, placeholder, maxLength, mask } = documents[document]

  const [value, setValue] = useState('')
  const [validationStatus, setValidationStatus] = useState<{
    isValid: boolean
    message: string
  }>()

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const { isValid } = await ky
        .post(`/api/validators/${document}`, { json: { [document]: value } })
        .json<{ isValid: boolean }>()

      setValidationStatus({
        isValid,
        message: isValid ? `Valid ${name}` : `Invalid ${name}`,
      })
    } catch {
      setValidationStatus({
        isValid: false,
        message: `Could not validate the ${name}. Please try again.`,
      })
    }
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    setValue(mask(event.currentTarget.value.replace(/\D/g, '')))
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor={document}>Enter the {name}</Label>
        <div className="relative">
          <Input
            type="text"
            id={document}
            name={document}
            value={value}
            onChange={handleOnChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={
              !validationStatus
                ? undefined
                : validationStatus.isValid
                  ? 'border-emerald-500!'
                  : 'border-red-500!'
            }
          />

          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                {!validationStatus ? null : validationStatus.isValid ? (
                  <Check className="absolute right-2 top-2 text-emerald-500" />
                ) : (
                  <X className="absolute right-2 top-2 text-red-500" />
                )}
              </TooltipTrigger>
              <TooltipContent
                className={
                  !validationStatus
                    ? undefined
                    : validationStatus.isValid
                      ? 'bg-emerald-500!'
                      : 'bg-red-500!'
                }
              >
                {validationStatus?.message}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Button className="w-full">Validate {name}</Button>
    </form>
  )
}
