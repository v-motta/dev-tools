/**
 * Builds src/data/addresses.json, the real addresses the person, company and
 * CEP generators pick from, so every CEP exists and matches its street, city,
 * state and area code.
 *
 * Searches ViaCEP for streets in the capital and another large city of each
 * state. Run it with `bun run build:addresses`.
 */

import { writeFile } from 'node:fs/promises'

const CITIES: Record<string, string[]> = {
  AC: ['Rio Branco', 'Cruzeiro do Sul'],
  AL: ['Maceió', 'Arapiraca'],
  AM: ['Manaus', 'Parintins'],
  AP: ['Macapá', 'Santana'],
  BA: ['Salvador', 'Feira de Santana'],
  CE: ['Fortaleza', 'Juazeiro do Norte'],
  DF: ['Brasília'],
  ES: ['Vitória', 'Vila Velha'],
  GO: ['Goiânia', 'Anápolis'],
  MA: ['São Luís', 'Imperatriz'],
  MG: ['Belo Horizonte', 'Uberlândia'],
  MS: ['Campo Grande', 'Dourados'],
  MT: ['Cuiabá', 'Rondonópolis'],
  PA: ['Belém', 'Santarém'],
  PB: ['João Pessoa', 'Campina Grande'],
  PE: ['Recife', 'Caruaru'],
  PI: ['Teresina', 'Parnaíba'],
  PR: ['Curitiba', 'Londrina'],
  RJ: ['Rio de Janeiro', 'Niterói'],
  RN: ['Natal', 'Mossoró'],
  RO: ['Porto Velho', 'Ji-Paraná'],
  RR: ['Boa Vista'],
  RS: ['Porto Alegre', 'Caxias do Sul'],
  SC: ['Florianópolis', 'Joinville'],
  SE: ['Aracaju', 'Nossa Senhora do Socorro'],
  SP: ['São Paulo', 'Campinas'],
  TO: ['Palmas', 'Araguaína'],
}

// ViaCEP needs at least 3 letters of the street name. Brasília's addresses
// are mostly "Quadra ..." instead of named streets; elsewhere that term
// matches sports courts and slums
const SEARCH_TERMS = ['Rua', 'Avenida']
const EXTRA_SEARCH_TERMS: Record<string, string[]> = { DF: ['Quadra'] }
const ADDRESSES_PER_CITY = 15
const OUTPUT = new URL('../src/data/addresses.json', import.meta.url)

interface ViaCepAddress {
  cep: string
  logradouro: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  ddd: string
}

function shuffle<T>(items: T[]) {
  return items
    .map((item) => ({ item, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ item }) => item)
}

async function search(state: string, city: string, term: string) {
  const url = `https://viacep.com.br/ws/${state}/${encodeURIComponent(city)}/${term}/json/`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} for ${url}`)

  return (await response.json()) as ViaCepAddress[]
}

const addresses = []

for (const [state, cities] of Object.entries(CITIES)) {
  for (const city of cities) {
    const found = new Map<string, ViaCepAddress>()

    for (const term of [
      ...SEARCH_TERMS,
      ...(EXTRA_SEARCH_TERMS[state] ?? []),
    ]) {
      for (const address of await search(state, city, term)) {
        // Skips CEPs of a single company or agency ("unidade") and CEPs
        // without a street, which a form would not accept as an address.
        // Streets named by a single letter ("Rua E") look made up
        if (address.unidade || !address.logradouro || !address.bairro) continue
        if (/ [A-Z]$/.test(address.logradouro)) continue

        found.set(address.cep, address)
      }
    }

    const picked = shuffle([...found.values()]).slice(0, ADDRESSES_PER_CITY)
    console.log(`${state} ${city}: ${picked.length} of ${found.size}`)

    for (const address of picked) {
      addresses.push({
        cep: address.cep.replace('-', ''),
        street: address.logradouro,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
        ddd: address.ddd,
      })
    }
  }
}

addresses.sort((a, b) => a.cep.localeCompare(b.cep))
await writeFile(OUTPUT, `${JSON.stringify(addresses, null, 2)}\n`)

console.log(`Wrote ${addresses.length} addresses to ${OUTPUT.pathname}`)
