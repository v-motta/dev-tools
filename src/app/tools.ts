import calculateBmi from '@/../public/calculate-bmi.png'
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
    title: 'Geradores',
    href: '/generators',
    icon: ServerCog,
    category: 'generators',
    items: [
      {
        title: 'Gerador de CPF',
        description:
          'Facilite a geração de CPFs válidos com nosso gerador de CPF.',
        image: generateCpf2,
        href: '/generators/cpf',
        icon: IdCard,
      },
      {
        title: 'Gerador de CNPJ',
        description:
          'Facilite a geração de CNPJs válidos com nosso gerador de CNPJ.',
        image: generateCnpj,
        href: '/generators/cnpj',
        icon: Landmark,
      },
      {
        title: 'Gerador de senha',
        description: 'Gere senhas seguras com nosso gerador de senha.',
        image: generatePassword,
        href: '/generators/password',
        icon: KeyRound,
      },
      {
        title: 'Gerador de UUID',
        description: 'Gere UUIDs únicos com nosso gerador de UUID.',
        image: generateUUID,
        href: '/generators/uuid',
        icon: Fingerprint,
      },
    ],
  },
  {
    title: 'Validadores',
    href: '/validators',
    icon: CheckCircle,
    category: 'validators',
    items: [
      {
        title: 'Validador de CPF',
        description: 'Verifique se um CPF é válido com nosso validador de CPF.',
        image: validateCpf2,
        href: '/validators/cpf',
        icon: UserRoundCheck,
      },
      {
        title: 'Validador de CNPJ',
        description:
          'Verifique se um CNPJ é válido com nosso validador de CNPJ.',
        image: validateCnpj,
        href: '/validators/cnpj',
        icon: LaptopMinimalCheck,
      },
    ],
  },
  {
    title: 'Calculadores',
    href: '/calculators',
    icon: Calculator,
    category: 'calculators',
    items: [
      {
        title: 'Calculador de IMC',
        description:
          'Calcule o Índice de Massa Corporal com nosso calculador de IMC.',
        image: calculateBmi,
        href: '/calculators/bmi',
        icon: Dumbbell,
      },
    ],
  },
]
