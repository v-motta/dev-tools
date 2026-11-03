import { NextResponse } from 'next/server'
import { badRequest } from '@/lib/api'
import { formatCEP } from '@/utils/generate-address'

interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ddd: string
  erro?: boolean | string
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ cep: string }> }
) {
  const cep = (await params).cep.replace(/\D/g, '')
  if (cep.length !== 8) return badRequest('The CEP must have 8 digits.')

  let address: ViaCepResponse
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      // CEPs rarely change, so a day of cache saves ViaCEP from repeated lookups
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!response.ok) throw new Error(`ViaCEP responded ${response.status}`)

    address = await response.json()
  } catch {
    return NextResponse.json(
      { message: 'The CEP lookup service is unavailable. Try again later.' },
      { status: 502 }
    )
  }

  if (address.erro) {
    return NextResponse.json({ message: 'CEP not found.' }, { status: 404 })
  }

  return NextResponse.json({
    address: {
      cep: formatCEP(cep),
      street: address.logradouro,
      complement: address.complemento,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
      ddd: address.ddd,
    },
  })
}
