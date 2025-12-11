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

export default function CNPJValidatorPage() {
  const [cnpj, setCnpj] = useState('')
  const [validationStatus, setValidationStatus] = useState<{
    isValid: boolean
    message: string
  }>()

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    const cnpj = result.cnpj as string

    const { isValid } = await ky
      .post('/api/validators/cnpj', { json: { cnpj } })
      .json<{ isValid: boolean }>()

    setValidationStatus({
      isValid,
      message: isValid ? 'CNPJ válido' : 'CNPJ inválido',
    })
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    let { value } = event.currentTarget

    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')

    setCnpj(value)
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">CNPJ Validator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CNPJ validator! Just enter a CNPJ number and click on
          'Validate CNPJ' to check if it is valid.
        </p>
      </div>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="cnpj">Enter the CNPJ</Label>
          <div className="relative">
            <Input
              type="text"
              id="cnpj"
              name="cnpj"
              value={cnpj}
              onChange={handleOnChange}
              placeholder="00.623.904/0001-73"
              maxLength={18}
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

        <Button className="w-full">Validate CNPJ</Button>
      </form>

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The validation is done on the server and does not store any
            information.
          </li>
          <li>
            The validator checks if the CNPJ follows the rules of the Federal
            Revenue Service.
          </li>
          <li>The format of the CNPJ and its check digits are verified.</li>
          <li>
            The system accepts CNPJs with or without punctuation
            (00.000.000/0001-00 or 00000000000100).
          </li>
          <li>
            The validation result is displayed through a green icon (valid) or a
            red icon (invalid).
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-mono">How to use the API</h2>
          <p className="text-muted-foreground text-balance">
            You can integrate our CNPJ validator into your application using our
            REST API.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Endpoint</p>
          <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
            POST /api/validators/cnpj
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Request example</p>
          <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
            {JSON.stringify({ cnpj: '00.111.222/0000-00' }, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Response</p>
          <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
            {JSON.stringify({ isValid: false }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
