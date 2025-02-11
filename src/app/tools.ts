import calculateBmi from '@/../public/calculate-bmi.png'
import calculateBmr from '@/../public/calculate-bmr.jpg'
import generateCnpj from '@/../public/generate-cnpj.jpg'
import generateCpf2 from '@/../public/generate-cpf-2.png'
import generatePassword from '@/../public/generate-password.png'
import generateUUID from '@/../public/generate-uuid.png'
import validateCnpj from '@/../public/validate-cnpj.jpg'
import validateCpf2 from '@/../public/validate-cpf-2.png'
import {
  Calculator,
  CheckCircle,
  Dumbbell,
  Fingerprint,
  IdCard,
  KeyRound,
  Landmark,
  LaptopMinimalCheck,
  ServerCog,
  UserRoundCheck,
  Weight,
} from 'lucide-react'
import type { StaticImageData } from 'next/image'

interface Tool {
  title: string
  description: string
  image: StaticImageData
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface Tools {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  items: Tool[]
  category: string
}

export const tools: Tools[] = [
  {
    title: 'Generators',
    href: '/generators',
    icon: ServerCog,
    category: 'generators',
    items: [
      {
        title: 'CPF Generator',
        description: 'Easily generate valid CPFs with our CPF generator.',
        image: generateCpf2,
        href: '/generators/cpf',
        icon: IdCard,
      },
      {
        title: 'CNPJ Generator',
        description: 'Easily generate valid CNPJs with our CNPJ generator.',
        image: generateCnpj,
        href: '/generators/cnpj',
        icon: Landmark,
      },
      {
        title: 'Password Generator',
        description: 'Generate secure passwords with our password generator.',
        image: generatePassword,
        href: '/generators/password',
        icon: KeyRound,
      },
      {
        title: 'UUID Generator',
        description: 'Gere UUIDs únicos com nosso gerador de UUID.',
        image: generateUUID,
        href: '/generators/uuid',
        icon: Fingerprint,
      },
    ],
  },
  {
    title: 'Validators',
    href: '/validators',
    icon: CheckCircle,
    category: 'validators',
    items: [
      {
        title: 'CPF Validator',
        description: 'Check if a CPF is valid with our CPF validator.',
        image: validateCpf2,
        href: '/validators/cpf',
        icon: UserRoundCheck,
      },
      {
        title: 'CNPJ Validator',
        description: 'Check if a CNPJ is valid with our CNPJ validator.',
        image: validateCnpj,
        href: '/validators/cnpj',
        icon: LaptopMinimalCheck,
      },
    ],
  },
  {
    title: 'Calculators',
    href: '/calculators',
    icon: Calculator,
    category: 'calculators',
    items: [
      {
        title: 'BMI Calculator',
        description: 'Calculate the Body Mass Index with our BMI calculator.',
        image: calculateBmi,
        href: '/calculators/bmi',
        icon: Dumbbell,
      },
      {
        title: 'BMR Calculator',
        description:
          'Calculate the Basal Metabolic Rate with our BMR calculator.',
        image: calculateBmr,
        href: '/calculators/bmr',
        icon: Weight,
      },
    ],
  },
]
