'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/query-client'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle, PawPrint } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function PasswordGeneratorPage() {
  const [lengthError, setLengthError] = useState('')
  const [urlParams, setUrlParams] = useState({
    length: '12',
    uppercase: false,
    numbers: false,
    symbols: false,
  })

  const {
    data: generatedPassword,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['password'],
    queryFn: async () => {
      const {
        length,
        uppercase: includeUppercase,
        numbers: includeNumbers,
        symbols: includeSymbols,
      } = urlParams

      const url = `/api/generators/password?length=${length}&uppercase=${includeUppercase}&numbers=${includeNumbers}&symbols=${includeSymbols}`

      return await ky.get(url).json<{ password: string }>()
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    if (!result.length) {
      setLengthError('O campo é obrigatório')
      return
    }

    if (Number(result.length) <= 3) {
      setLengthError('O mínimo de caracteres é 4')
      return
    }

    setLengthError('')

    await queryClient.refetchQueries()
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de senha</h1>

        <p className="text-muted-foreground text-balance">
          Use nosso gerador de senha para criar uma senha segura.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="length">Tamanho máximo de caracteres</Label>
          <Input
            id="length"
            name="length"
            maxLength={3}
            value={urlParams.length}
            onChange={(event) => {
              let { value } = event.currentTarget
              setLengthError('')

              value = value.replace(/\D/g, '')

              setUrlParams((prev) => ({ ...prev, length: value }))
            }}
          />
          {lengthError && <p className="text-red-500 text-sm">{lengthError}</p>}
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              name="uppercase"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  uppercase: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="uppercase">Letras maiúsculas</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="numbers"
              name="numbers"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  numbers: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="numbers">Números</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="symbols"
              name="symbols"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  symbols: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="symbols">Símbolos</Label>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="generated_cpf">Senha gerada</Label>
          <div className="relative">
            <div className="min-h-10 font-mono border border-border px-3 flex items-center text-xl rounded-md pr-10">
              {isSuccess ? (
                <p className="break-all">{generatedPassword.password}</p>
              ) : (
                <LoaderCircle className="animate-spin text-muted-foreground" />
              )}
            </div>

            {isSuccess && (
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="absolute [&_svg]:size-5 right-0.5 top-0.5 text-muted-foreground"
                onClick={() =>
                  navigator.clipboard.writeText(generatedPassword.password)
                }
              >
                <Copy />
              </Button>
            )}
          </div>
        </div>

        <Button className="w-full" isPending={isFetching}>
          Gerar senha
        </Button>
      </form>
    </div>
  )
}
