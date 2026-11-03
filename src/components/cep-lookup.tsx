'use client'

import ky, { HTTPError } from 'ky'
import { LoaderCircle } from 'lucide-react'
import { type FormEvent, useId, useState } from 'react'
import { type RecordField, RecordList } from '@/components/record-list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ADDRESS_FIELDS: RecordField[] = [
  { key: 'cep', label: 'CEP' },
  { key: 'street', label: 'Logradouro' },
  { key: 'complement', label: 'Complemento' },
  { key: 'neighborhood', label: 'Bairro' },
  { key: 'city', label: 'Cidade' },
  { key: 'state', label: 'Estado' },
  { key: 'ddd', label: 'DDD' },
]

type Result =
  | { status: 'found'; address: Record<string, string> }
  | { status: 'not-found' | 'error' }

export function CepLookup() {
  const id = useId()
  const [cep, setCep] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [result, setResult] = useState<Result>()

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)

    try {
      const { address } = await ky
        .get(`/api/cep/${cep.replace(/\D/g, '')}`)
        .json<{ address: Record<string, string> }>()

      setResult({ status: 'found', address })
    } catch (error) {
      const notFound =
        error instanceof HTTPError && error.response.status === 404
      setResult({ status: notFound ? 'not-found' : 'error' })
    } finally {
      setIsPending(false)
    }
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    setCep(
      event.currentTarget.value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')
    )
    setResult(undefined)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor={id}>Digite o CEP</Label>
          <Input
            type="text"
            inputMode="numeric"
            id={id}
            value={cep}
            onChange={handleOnChange}
            placeholder="01304-000"
            maxLength={9}
            minLength={9}
            required
          />
        </div>

        <Button className="w-full" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="animate-spin" aria-label="Consultando" />
          ) : (
            'Consultar CEP'
          )}
        </Button>
      </form>

      <div role="status">
        {result?.status === 'found' ? (
          <RecordList fields={ADDRESS_FIELDS} record={result.address} />
        ) : result ? (
          <p className="text-sm font-medium text-red-500">
            {result.status === 'not-found'
              ? 'CEP não encontrado.'
              : 'Não foi possível consultar o CEP. Tente novamente.'}
          </p>
        ) : null}
      </div>
    </div>
  )
}
