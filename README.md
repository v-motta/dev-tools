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
- [x] **Password Generator**: Create secure passwords with customizable options
- [x] **UUID Generator**: Generate unique UUIDs (v4)
- [ ] **QR Code Generator**: Generate QR codes with custom data
- [ ] **Random Number Generator**: Generate random numbers with custom options

### Validators
- [x] **CPF Validator**: Validate Brazilian CPF numbers
- [x] **CNPJ Validator**: Validate Brazilian CNPJ numbers
- [ ] **Email Validator**: Validate email addresses
- [ ] **URL Validator**: Validate URLs

## 📚 Tech Stack
[![Next](https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-black?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Ky](https://img.shields.io/badge/ky-black?style=for-the-badge&logo=ky)](https://github.com/sindresorhus/ky)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/radix%20ui-black?style=for-the-badge&logo=radixui)](https://www.radix-ui.com/)
[![React Query](https://img.shields.io/badge/react%20query-black?style=for-the-badge&logo=reactquery)](https://tanstack.com/query/latest)
[![Jest](https://img.shields.io/badge/jest-black?style=for-the-badge&logo=jest)](https://jestjs.io/)
[![React Testing Library](https://img.shields.io/badge/react%20testing%20library-black?style=for-the-badge&logo=testinglibrary)](https://testing-library.com/docs/react-testing-library/intro)
[![Biome](https://img.shields.io/badge/biome-black?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/lucide%20icons-black?style=for-the-badge&logo=lucide)](https://lucide.dev/)


## 📂 Project Structure

```
dev-tools/
├─ biome.json
├─ components.json
├─ jest.config.ts
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ src/
│  ├─ app/
│  │  ├─ (app)/
│  │  │  ├─ calculators/
│  │  │  │  └─ page.tsx # Calculators page
│  │  │  ├─ generators/
│  │  │  │  └─ page.tsx # Generators page
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx # Home page
│  │  │  └─ validators/
│  │  │     └─ page.tsx # Validators page
│  │  ├─ api/
│  │  │  ├─ generators/
│  │  │  │  └─ route.ts # API route for generators
│  │  │  └─ validators/
│  │  │     └─ route.ts # API route for validators
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ providers.tsx
│  │  └─ tools.ts
│  ├─ components/
│  │  ├─ sidebar/
│  │  │  ├─ breadcrumb.tsx
│  │  │  └─ theme-toggle.tsx
│  │  ├─ tool-card.tsx
│  │  └─ ui/ # shadcn/ui components
│  ├─ hooks/ # Custom hooks
│  ├─ lib/ # Utility functions
│  └─ __tests__/ # Test files
├─ tailwind.config.ts
└─ tsconfig.json

```

## ❤️ Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request
