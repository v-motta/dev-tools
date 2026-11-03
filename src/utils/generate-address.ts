import addresses from '@/data/addresses.json'
import { pick, randomInt } from './random'
import type { StateCode } from './states'

/** A real address from ViaCEP, built by `bun run build:addresses`. */
export type Address = (typeof addresses)[number]

export function formatCEP(cep: string) {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

/** A real CEP with its street, neighborhood, city and area code. */
export function pickAddress(state?: StateCode): Address {
  const candidates = state
    ? addresses.filter((address) => address.state === state)
    : addresses

  return pick(candidates)
}

/** A phone number in the area code of an address. */
export function generatePhone(ddd: string, kind: 'mobile' | 'landline') {
  const digits = () => String(randomInt(0, 999)).padStart(3, '0')
  const last = String(randomInt(0, 9999)).padStart(4, '0')

  return kind === 'mobile'
    ? `(${ddd}) 9${randomInt(6, 9)}${digits()}-${last}`
    : `(${ddd}) ${randomInt(2, 5)}${digits()}-${last}`
}
