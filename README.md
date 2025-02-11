# Dev Tools

A collection of useful developer tools built with Next.js, featuring generators, validators, and calculators.

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
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [Biome](https://biomejs.dev/) - Code formatting and linting
- [Jest](https://jestjs.io/) - Testing
- [Lucide Icons](https://lucide.dev/) - Icons

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
