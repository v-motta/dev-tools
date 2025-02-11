# Dev Tools

A collection of useful developer tools built with Next.js, featuring generators, validators, and calculators.

<p align="center">
<img src="https://img.shields.io/github/stars/v-motta/dev-tools" alt="stars">
</p>

## Features

### Generators
- [x] **CPF Generator**: Generate valid Brazilian CPF numbers
- [ ] **CNPJ Generator**: Generate valid Brazilian CNPJ numbers
- [x] **Password Generator**: Create secure passwords with customizable options
- [x] **UUID Generator**: Generate unique UUIDs (v4)

### Validators
- [x] **CPF Validator**: Validate Brazilian CPF numbers
- [ ] **CNPJ Validator**: Validate Brazilian CNPJ numbers

### Calculators
- [x] **BMI Calculator**: Calculate Body Mass Index (BMI)

## Tech Stack
[![Next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/radix%20ui-161618?style=for-the-badge&logo=radixui)](https://www.radix-ui.com/)
[![React Query](https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery)](https://tanstack.com/query/latest)
[![Jest](https://img.shields.io-badge/jest-C21325?style=for-the-badge&logo=jest)](https://jestjs.io/)
[![React Testing Library](https://img.shields.io/badge/react%20testing%20library-E33332?style=for-the-badge&logo=testinglibrary)](https://testing-library.com/docs/react-testing-library/intro)
[![Biome](https://img.shields.io-badge/biome-60A5FA?style=for-the-badge&logo=biome)](https://biomejs.dev/)
[![Lucide Icons](https://img.shields.io-badge/lucide%20icons-7928CA?style=for-the-badge&logo=lucide)](https://lucide.dev/)

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dev-tools.git
cd dev-tools
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Project Structure

```
src/
├── __tests__/         # Test files
├── app/               # App router pages
├── components/        # React components
├── hooks/             # Custom hooks
├── lib/               # Utility functions
├── LICENSE             
└── README.md           
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Create a new Pull Request
