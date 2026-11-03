'use client'

import { useState } from 'react'
import { ResultCard } from '@/components/result-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency, parseDecimal } from '@/lib/locale'

const MAX_PRICE_DIGITS = 10

export function DiscountCalculator() {
  // Digits typed so far, read as cents: "1050" is 10.50
  const [priceDigits, setPriceDigits] = useState('')
  const [percentage, setPercentage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
  }>()

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value
      .replace(/\D/g, '')
      .replace(/^0+/, '')
      .slice(0, MAX_PRICE_DIGITS)

    setPriceDigits(digits)
  }

  function handlePercentageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace('.', ',')

    // Up to 3 integer digits and 2 decimals, between 0 and 100
    if (!/^\d{0,3}(,\d{0,2})?$/.test(value)) return
    if (parseDecimal(value) > 100) return

    setPercentage(value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const price = Number(priceDigits) / 100
    const percentageNum = parseDecimal(percentage)

    if (!priceDigits || Number.isNaN(percentageNum)) {
      setResult(undefined)
      setErrorMessage('Preencha o preço e a porcentagem do desconto.')
      return
    }

    const discountAmount = Math.round(price * percentageNum) / 100

    setErrorMessage('')
    setResult({ discountAmount, finalPrice: price - discountAmount })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Calculadora de desconto
        </h1>

        <p className="text-muted-foreground text-balance">
          Calcule o valor do desconto e o preço final depois de aplicá-lo.
        </p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:*:flex-1">
              <div className="space-y-1">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  inputMode="numeric"
                  value={
                    priceDigits && formatCurrency(Number(priceDigits) / 100)
                  }
                  onChange={handlePriceChange}
                  placeholder={formatCurrency(0)}
                  aria-describedby="discount-error"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="percentage">Desconto</Label>
                <div className="relative">
                  <Input
                    id="percentage"
                    inputMode="decimal"
                    value={percentage}
                    onChange={handlePercentageChange}
                    className="pr-7"
                    placeholder="0"
                    aria-describedby="discount-error"
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    %
                  </span>
                </div>
              </div>
            </div>

            <p
              id="discount-error"
              role="alert"
              className="min-h-5 text-sm font-medium text-red-500"
            >
              {errorMessage}
            </p>
          </div>

          <Button className="w-full">Calcular desconto</Button>
        </form>

        <ResultCard>
          {result && (
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">
                  Valor do desconto
                </dt>
                <dd className="text-xl font-mono">
                  {formatCurrency(result.discountAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Preço final</dt>
                <dd className="text-xl font-mono">
                  {formatCurrency(result.finalPrice)}
                </dd>
              </div>
            </dl>
          )}
        </ResultCard>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Digite o preço original e a porcentagem do desconto.</li>
          <li>
            No preço, digite só os números: eles preenchem a partir dos centavos
            (1050 vira R$ 10,50).
          </li>
          <li>
            A porcentagem aceita valores de 0 a 100, com até duas casas
            decimais.
          </li>
          <li>
            O desconto é o preço multiplicado pela porcentagem e dividido por
            100, arredondado para centavos.
          </li>
          <li>O preço final é o preço original menos o desconto.</li>
        </ul>
      </div>
    </div>
  )
}
