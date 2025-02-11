'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import ky from 'ky'
import { Check, X } from 'lucide-react'
import { type FormEvent, useState } from 'react'

export default function CPFValidatorPage() {
  const [cpf, setCpf] = useState('')
  const [validationStatus, setValidationStatus] = useState<{
    status: boolean
    message: string
  }>()

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    const cpf = result.cpf as string

    const { status } = await ky
      .post('/api/validators/cpf', { json: { cpf } })
      .json<{ status: boolean }>()

    setValidationStatus({
      status,
      message: status ? 'CPF válido' : 'CPF inválido',
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
        <h1 className="text-2xl font-bold font-mono">Validador de CPF</h1>

        <p className="text-zinc-400 text-balance">
          Use nosso validador de CPF! Basta inserir um número de CPF e clicar em
          "Validar CPF" para verificar se ele é válido.
        </p>
      </div>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="cpf">Digite o CPF</Label>
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
                  : validationStatus.status
                    ? '!border-emerald-500'
                    : '!border-red-500'
              }
            />

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  {!validationStatus ? null : validationStatus.status ? (
                    <Check className="absolute right-2 top-2 text-emerald-500" />
                  ) : (
                    <X className="absolute right-2 top-2 text-red-500" />
                  )}
                </TooltipTrigger>
                <TooltipContent
                  className={
                    !validationStatus
                      ? undefined
                      : validationStatus.status
                        ? '!bg-emerald-500'
                        : '!bg-red-500'
                  }
                >
                  {validationStatus?.message}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Button className="w-full">Validar CPF</Button>
      </form>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-mono">Como usar nossa API</h2>
          <p className="text-zinc-400 text-balance">
            Você pode integrar nosso validador de CPF em sua aplicação usando
            nossa API REST.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Endpoint</p>
          <pre className="p-4 rounded-lg bg-zinc-900 font-mono text-sm">
            POST https://devtools.vmotta.dev/api/validators/cpf
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Exemplo de requisição</p>
          <pre className="p-4 rounded-lg bg-zinc-900 font-mono text-sm">
            {JSON.stringify({ cpf: '123.456.789-10' }, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Resposta</p>
          <pre className="p-4 rounded-lg bg-zinc-900 font-mono text-sm">
            {JSON.stringify({ status: false }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
