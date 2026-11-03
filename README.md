<p align="center">
  <a href="https://devtools.vmotta.dev"><img src="https://devtools.vmotta.dev/logo.png" alt="Logo" height=120></a>
</p>
<h1 align="center">Dev Tools</h1>

<p align="center">
<img src="https://img.shields.io/github/stars/v-motta/dev-tools" alt="stars">
</p>

## 🚀 Features

### Calculators

- [x] **BMI Calculator**: Calculate Body Mass Index (BMI)
- [x] **BMR Calculator**: Calculate Basal Metabolic Rate (BMR)
- [x] **Age Calculator**: Calculate age based on birthdate
- [x] **Discount Calculator**: Calculate the discount value and final price
- [ ] **Percentage Calculator**: Calculate percentages

### Generators

- [x] **CPF Generator**: Generate valid Brazilian CPF numbers
- [x] **CNPJ Generator**: Generate valid Brazilian CNPJ numbers, or a whole company
- [x] **RG Generator**: Generate valid RG numbers (São Paulo's rule)
- [x] **CNH Generator**: Generate valid driver's license numbers
- [x] **State Registration Generator**: Generate valid inscrições estaduais for every state
- [x] **Person Generator**: Generate a person with documents, contact and a real address
- [x] **CEP Generator**: Pick a real CEP with its address, or look one up
- [x] **License Plate Generator**: Generate Mercosul or old-style plates
- [x] **Credit Card Generator**: Generate Luhn-valid test cards for six brands
- [x] **Password Generator**: Generate secure random passwords
- [x] **UUID Generator**: Generate unique UUIDs (v4)
- [x] **Random Picker**: Draw random numbers within a range
- [ ] **QR Code Generator**: Generate QR codes with custom data

### Validators

- [x] **CPF Validator**: Validate Brazilian CPF numbers
- [x] **CNPJ Validator**: Validate Brazilian CNPJ numbers
- [x] **RG Validator**: Validate RG numbers (São Paulo's rule)
- [x] **CNH Validator**: Validate driver's license numbers
- [x] **State Registration Validator**: Validate inscrições estaduais for every state
- [ ] **Email Validator**: Validate email addresses
- [ ] **URL Validator**: Validate URLs

## 🔌 API

Every generator and validator is backed by a public REST endpoint:

| Method | Endpoint                             | Body / Response                                                                           |
| ------ | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| GET    | `/api/generators/cpf`                | `{ "cpf": "123.456.789-09" }`                                                             |
| GET    | `/api/generators/cnpj`               | `{ "cnpj": "12.345.678/0001-95" }`                                                        |
| GET    | `/api/generators/company`            | `{ "company": { "name": "...", "cnpj": "...", "stateRegistration": "...", ... } }`        |
| GET    | `/api/generators/rg`                 | `{ "rg": "39.541.250-X" }`                                                                |
| GET    | `/api/generators/cnh`                | `{ "cnh": "61173562148" }`                                                                |
| GET    | `/api/generators/state-registration` | `?state=SP` → `{ "stateRegistration": "110.042.490.114" }`                                |
| GET    | `/api/generators/person`             | `{ "person": { "name": "...", "cpf": "...", "cep": "...", ... } }`                        |
| GET    | `/api/generators/address`            | `{ "address": { "cep": "40070-260", "street": "Avenida Doze", ... } }`                    |
| GET    | `/api/generators/license-plate`      | `{ "plate": "ABC1D23" }`                                                                  |
| GET    | `/api/generators/credit-card`        | `{ "creditCard": { "number": "...", "brand": "Visa", "expiry": "06/29", "cvv": "694" } }` |
| GET    | `/api/generators/password`           | `{ "password": "abcdef-ghiJkl-mn4opq" }`                                                  |
| GET    | `/api/generators/uuid`               | `{ "uuid": "f1ccdc7f-1f22-474f-b29c-cb2b52498aeb" }`                                      |
| GET    | `/api/cep/{cep}`                     | `{ "address": { "cep": "01304-000", "street": "Rua Augusta", ... } }`, or `404`           |
| POST   | `/api/random-picker`                 | `{ "random_count": 2, "random_min": 1, "random_max": 10 }` → `{ "randomNumber": [4, 7] }` |
| POST   | `/api/validators/cpf`                | `{ "cpf": "529.982.247-25" }` → `{ "isValid": true }`                                     |
| POST   | `/api/validators/cnpj`               | `{ "cnpj": "11.222.333/0001-81" }` → `{ "isValid": true }`                                |
| POST   | `/api/validators/rg`                 | `{ "rg": "39.541.250-X" }` → `{ "isValid": true }`                                        |
| POST   | `/api/validators/cnh`                | `{ "cnh": "61173562148" }` → `{ "isValid": true }`                                        |
| POST   | `/api/validators/state-registration` | `{ "stateRegistration": "110.042.490.114", "state": "SP" }` → `{ "isValid": true }`       |

The generators accept optional query parameters:

| Parameter                         | Generators                                    | Description                                                                                           |
| --------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantity`                        | CPF, CNPJ, RG, CNH, IE, plate, password, UUID | 1 to 50 values at once. The response then holds a list under the plural key, e.g. `{ "cpfs": [...] }` |
| `formatted`                       | CPF, CNPJ, RG, IE, address, credit card       | `false` returns digits only. Defaults to `true`                                                       |
| `state`                           | IE (required), person, company, address       | A state code such as `SP`. Picked at random when left out                                             |
| `sex`                             | Person                                        | `female` or `male`. Picked at random when left out                                                    |
| `format`                          | License plate                                 | `mercosul` (`ABC1D23`, the default) or `old` (`ABC-1234`)                                             |
| `brand`                           | Credit card                                   | `visa` (the default), `mastercard`, `elo`, `amex`, `hipercard` or `diners`                            |
| `style`                           | Password                                      | `apple` (Apple's `abcdef-ghiJkl-mn4opq` format, the default) or `custom`                              |
| `length`                          | Password                                      | With `style=custom`: 8 to 64 characters. Defaults to 16                                               |
| `uppercase`, `numbers`, `symbols` | Password                                      | With `style=custom`: `false` leaves that kind of character out. All default to `true`                 |

```bash
curl "https://devtools.vmotta.dev/api/generators/cpf?quantity=2&formatted=false"
# { "cpfs": ["52998224725", "11144477735"] }
```

The person, company and CEP generators pick from real addresses in `src/data/addresses.json`, built from ViaCEP by `bun run build:addresses`.

Invalid parameters or request bodies get a `400` response with a `{ "message": "..." }` explaining the problem.

## 📚 Tech Stack

[![Next](https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Bun](https://img.shields.io/badge/bun-black?style=for-the-badge&logo=bun)](https://bun.sh/)
[![Vercel](https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Ky](https://img.shields.io/badge/ky-black?style=for-the-badge&logo=ky)](https://github.com/sindresorhus/ky)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/radix%20ui-black?style=for-the-badge&logo=radixui)](https://www.radix-ui.com/)
[![React Query](https://img.shields.io/badge/react%20query-black?style=for-the-badge&logo=reactquery)](https://tanstack.com/query/latest)
[![Biome](https://img.shields.io/badge/biome-black?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/lucide%20icons-black?style=for-the-badge&logo=lucide)](https://lucide.dev/)

## 🛠️ Getting Started

Requires [Bun](https://bun.sh/) and Node.js 24.

```bash
bun install
bun dev            # start the dev server at http://localhost:3000
```

| Command                   | Description                             |
| ------------------------- | --------------------------------------- |
| `bun dev`                 | Start the development server            |
| `bun run build`           | Create a production build               |
| `bun start`               | Serve the production build              |
| `bun run lint`            | Lint and check formatting with Biome    |
| `bun run format`          | Format the code with Biome              |
| `bun run bench:password`  | Benchmark the password generator        |
| `bun run build:addresses` | Rebuild the address dataset from ViaCEP |

### Most used tools

The home page highlights the three tools opened by the most sessions. Each session counts a tool once, and the count is stored in a [Redis database on Upstash](https://vercel.com/marketplace/upstash). The ranking refreshes at most once an hour.

To turn it on, add Upstash for Redis to the project from the Vercel Marketplace. The integration sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`; a database created directly on Upstash can use `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` instead. To use it locally, put the same variables in `.env.local`.

Without these variables, nothing is counted and the home page shows CPF, CNPJ and the person generator.

The "Usadas recentemente" section lists the last tools opened in the browser. It is kept in `localStorage` and never sent to the server.

## 📂 Project Structure

```
dev-tools/
├─ scripts/                  # Benchmarks and the address dataset builder
├─ public/                   # Logo
└─ src/
   ├─ app/
   │  ├─ (app)/              # Pages rendered inside the sidebar layout
   │  │  ├─ brazil/
   │  │  │  ├─ documents/    # CPF, CNPJ, RG, CNH and IE: generate and validate
   │  │  │  └─ fake-data/    # Person, CEP and license plate generators
   │  │  ├─ development/
   │  │  │  └─ generators/   # Password, UUID and credit card generators
   │  │  ├─ utilities/
   │  │  │  ├─ calculators/  # Age, BMI, BMR and discount calculators
   │  │  │  └─ draws/        # Random number picker
   │  │  ├─ layout.tsx       # Sidebar + breadcrumb layout
   │  │  └─ page.tsx         # Home page
   │  ├─ api/                # REST endpoints used by the tools
   │  ├─ layout.tsx          # Root layout (fonts, providers, analytics)
   │  └─ tools.ts            # Tool registry: sidebar, home, search and breadcrumb
   ├─ components/
   │  ├─ sidebar/            # Sidebar, navigation and breadcrumb
   │  ├─ ui/                 # shadcn/ui components
   │  ├─ generator.tsx       # Shared UI for the generators
   │  ├─ record-generator.tsx    # Shared UI for multi-field generators (person, company)
   │  ├─ document-validator.tsx  # Shared UI for the document validators
   │  ├─ body-measurements.tsx   # Weight/height fields in metric or imperial units
   │  ├─ tool-search.tsx     # Ctrl+K tool search
   │  ├─ tool-visit-tracker.tsx  # Counts tool visits and keeps the recent ones
   │  ├─ recent-tools.tsx    # "Usadas recentemente" section of the home page
   │  └─ tool-card.tsx       # Tool card for the home page
   ├─ data/                  # Real addresses for the person, company and CEP generators
   ├─ hooks/                 # Custom hooks
   ├─ lib/                   # API helpers, Redis, tool ranking, locale formatting and React Query setup
   └─ utils/                 # Generators and validators (documents, person, cards...)
```

## ❤️ Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request
