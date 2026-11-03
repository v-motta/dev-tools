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

- [x] **CNPJ Generator**: Generate valid Brazilian CNPJ numbers
- [x] **CPF Generator**: Generate valid Brazilian CPF numbers
- [x] **Password Generator**: Generate secure random passwords
- [x] **UUID Generator**: Generate unique UUIDs (v4)
- [x] **Random Picker**: Draw random numbers within a range
- [ ] **QR Code Generator**: Generate QR codes with custom data

### Validators

- [x] **CPF Validator**: Validate Brazilian CPF numbers
- [x] **CNPJ Validator**: Validate Brazilian CNPJ numbers
- [ ] **Email Validator**: Validate email addresses
- [ ] **URL Validator**: Validate URLs

## 🔌 API

Every generator and validator is backed by a public REST endpoint:

| Method | Endpoint                   | Body / Response                                                                           |
| ------ | -------------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/api/generators/cpf`      | `{ "cpf": "123.456.789-09" }`                                                             |
| GET    | `/api/generators/cnpj`     | `{ "cnpj": "12.345.678/0001-95" }`                                                        |
| GET    | `/api/generators/password` | `{ "password": "abcdef-ghiJkl-mn4opq" }`                                                  |
| GET    | `/api/generators/uuid`     | `{ "uuid": "f1ccdc7f-1f22-474f-b29c-cb2b52498aeb" }`                                      |
| POST   | `/api/random-picker`       | `{ "random_count": 2, "random_min": 1, "random_max": 10 }` → `{ "randomNumber": [4, 7] }` |
| POST   | `/api/validators/cpf`      | `{ "cpf": "529.982.247-25" }` → `{ "isValid": true }`                                     |
| POST   | `/api/validators/cnpj`     | `{ "cnpj": "11.222.333/0001-81" }` → `{ "isValid": true }`                                |

Invalid request bodies get a `400` response with a `{ "message": "..." }` explaining the problem.

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

| Command                  | Description                          |
| ------------------------ | ------------------------------------ |
| `bun dev`                | Start the development server         |
| `bun run build`          | Create a production build            |
| `bun start`              | Serve the production build           |
| `bun run lint`           | Lint and check formatting with Biome |
| `bun run format`         | Format the code with Biome           |
| `bun run bench:password` | Benchmark the password generator     |

## 📂 Project Structure

```
dev-tools/
├─ scripts/                  # Standalone scripts (benchmarks)
├─ public/                   # Logo
└─ src/
   ├─ app/
   │  ├─ (app)/              # Pages rendered inside the sidebar layout
   │  │  ├─ computing/
   │  │  │  ├─ generators/   # CPF, CNPJ, password and UUID generators
   │  │  │  ├─ random-picker/
   │  │  │  └─ validators/   # CPF and CNPJ validators
   │  │  ├─ mathematics/
   │  │  │  └─ online-calculators/  # Age, BMI, BMR and discount calculators
   │  │  ├─ layout.tsx       # Sidebar + breadcrumb layout
   │  │  └─ page.tsx         # Home page
   │  ├─ api/                # REST endpoints used by the tools
   │  ├─ layout.tsx          # Root layout (fonts, providers, analytics)
   │  └─ tools.ts            # Tool registry: sidebar, cards and breadcrumb
   ├─ components/
   │  ├─ sidebar/            # Sidebar, navigation and breadcrumb
   │  ├─ ui/                 # shadcn/ui components
   │  ├─ generator.tsx       # Shared UI for the generators
   │  ├─ document-validator.tsx  # Shared UI for the CPF/CNPJ validators
   │  └─ tool-grid.tsx       # Grid of tool cards
   ├─ hooks/                 # Custom hooks
   ├─ lib/                   # API helpers and React Query setup
   └─ utils/                 # CPF/CNPJ/password generation and validation
```

## ❤️ Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request
