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

export default function CPFValidatorPage() {
  const [cpf, setCpf] = useState('')
  const [validationStatus, setValidationStatus] = useState<{
    isValid: boolean
    message: string
  }>()

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    const cpf = result.cpf as string

    const { isValid } = await ky
      .post('/api/validators/cpf', { json: { cpf } })
      .json<{ isValid: boolean }>()

    setValidationStatus({
      isValid,
      message: isValid ? 'Valid CPF' : 'Invalid CPF',
    })
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    let { value } = event.currentTarget

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    setCpf(value)
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">CPF Validator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CPF validator! Just enter a CPF number and click on 'Validate
          CPF' to check if it is valid.
        </p>
      </div>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="cpf">Enter the CPF</Label>
          <div className="relative">
            <Input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={handleOnChange}
              placeholder="123.456.789-10"
              maxLength={14}
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

        <Button className="w-full">Validate CPF</Button>
      </form>

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The validation is done on the server and does not store any
            information.
          </li>
          <li>
            The validator checks if the CPF follows the rules of the Federal
            Revenue Service.
          </li>
          <li>The format of the CPF and its check digits are verified.</li>
          <li>
            The system accepts CPFs with or without punctuation (123.456.789-10
            or 12345678910).
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
            You can integrate our CPF validator into your application using our
            REST API.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Endpoint</p>
          <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
            POST /api/validators/cpf
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Request example</p>
          <pre className="p-4 rounded-lg bg-sidebar font-mono text-sm">
            {JSON.stringify({ cpf: '123.456.789-10' }, null, 2)}
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
