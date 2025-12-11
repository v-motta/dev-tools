import {
  Calculator,
  CalendarDays,
  CheckCircle,
  Dumbbell,
  Fingerprint,
  IdCard,
  KeyRound,
  Landmark,
  LaptopMinimalCheck,
  type LucideIcon,
  ServerCog,
  TicketPercent,
  UserRoundCheck,
  Weight,
} from 'lucide-react'
import type { StaticImageData } from 'next/image'
import calculateAge from '@/../public/calculate-age.jpg'
import calculateBmi from '@/../public/calculate-bmi.png'
import calculateBmr from '@/../public/calculate-bmr.jpg'
import calculateDiscount from '@/../public/calculate-discount.jpg'
import generateCnpj from '@/../public/generate-cnpj.jpg'
import generateCpf2 from '@/../public/generate-cpf-2.png'
import generatePassword from '@/../public/generate-password.png'
import generateUUID from '@/../public/generate-uuid.png'
import validateCnpj from '@/../public/validate-cnpj.jpg'
import validateCpf2 from '@/../public/validate-cpf-2.png'

export interface SidebarGroup {
  label: string
  menuItems: SidebarMenuItem[]
}

export interface SidebarMenuItem {
  title: string
  url: string
  category: 'generators' | 'validators' | 'online-calculators'
  icon: LucideIcon
  subMenuItems: SidebarSubMenuItem[]
  isActive?: boolean
}

export interface SidebarSubMenuItem {
  title: string
  description: string
  image: StaticImageData
  url: string
  icon: LucideIcon
  isActive?: boolean
}

export const tools: SidebarGroup[] = [
  {
    label: 'Computing',
    menuItems: [
      {
        title: 'Generators',
        url: '/generators',
        icon: ServerCog,
        category: 'generators',
        subMenuItems: [
          {
            title: 'CPF Generator',
            description: 'Easily generate valid CPFs with our CPF generator.',
            image: generateCpf2,
            url: '/generators/cpf',
            icon: IdCard,
          },
          {
            title: 'CNPJ Generator',
            description: 'Easily generate valid CNPJs with our CNPJ generator.',
            image: generateCnpj,
            url: '/generators/cnpj',
            icon: Landmark,
          },
          {
            title: 'Password Generator',
            description:
              'Generate secure passwords with our password generator.',
            image: generatePassword,
            url: '/generators/password',
            icon: KeyRound,
          },
          {
            title: 'UUID Generator',
            description: 'Generate unique UUIDs with our UUID generator.',
            image: generateUUID,
            url: '/generators/uuid',
            icon: Fingerprint,
          },
          // {
          //   title: 'Person Generator',
          //   description:
          //     'Generate a random person with name, telephone, CPF, and birthdate.',
          //   image: generateUUID,
          //   url: '/generators/person',
          //   icon: User2,
          // },
        ],
      },
      {
        title: 'Validators',
        url: '/validators',
        icon: CheckCircle,
        category: 'validators',
        subMenuItems: [
          {
            title: 'CPF Validator',
            description: 'Check if a CPF is valid with our CPF validator.',
            image: validateCpf2,
            url: '/validators/cpf',
            icon: UserRoundCheck,
          },
          {
            title: 'CNPJ Validator',
            description: 'Check if a CNPJ is valid with our CNPJ validator.',
            image: validateCnpj,
            url: '/validators/cnpj',
            icon: LaptopMinimalCheck,
          },
        ],
      },
    ],
  },
  {
    label: 'Mathematics',
    menuItems: [
      {
        title: 'Online Calculators',
        url: '/online-calculators',
        icon: Calculator,
        category: 'online-calculators',
        subMenuItems: [
          {
            title: 'BMI Calculator',
            description:
              'Calculate the Body Mass Index with our BMI calculator.',
            image: calculateBmi,
            url: '/online-calculators/bmi',
            icon: Dumbbell,
          },
          {
            title: 'BMR Calculator',
            description:
              'Calculate the Basal Metabolic Rate with our BMR calculator.',
            image: calculateBmr,
            url: '/online-calculators/bmr',
            icon: Weight,
          },
          {
            title: 'Age Calculator',
            description:
              'Calculate the age based on a birthdate with our age calculator.',
            image: calculateAge,
            url: '/online-calculators/age',
            icon: CalendarDays,
          },
          {
            title: 'Discount Calculator',
            description:
              'Calculate the discount amount and the final price after applying the discount.',
            image: calculateDiscount,
            url: '/online-calculators/discount',
            icon: TicketPercent,
          },
        ],
      },
    ],
  },
]
