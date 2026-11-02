import {
  Calculator,
  CalendarDays,
  CheckCircle,
  Dices,
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

export type ToolCategory = 'generators' | 'validators' | 'online-calculators'

export interface SidebarMenuItem {
  title: string
  url: string
  category: ToolCategory
  icon: LucideIcon
  subMenuItems: SidebarSubMenuItem[]
}

export interface SidebarSubMenuItem {
  title: string
  description: string
  image: StaticImageData
  url: string
  icon: LucideIcon
}

export const tools: SidebarGroup[] = [
  {
    label: 'Computing',
    menuItems: [
      {
        title: 'Generators',
        url: '/computing/generators',
        icon: ServerCog,
        category: 'generators',
        subMenuItems: [
          {
            title: 'CPF Generator',
            description: 'Easily generate valid CPFs with our CPF generator.',
            image: generateCpf2,
            url: '/computing/generators/cpf',
            icon: IdCard,
          },
          {
            title: 'CNPJ Generator',
            description: 'Easily generate valid CNPJs with our CNPJ generator.',
            image: generateCnpj,
            url: '/computing/generators/cnpj',
            icon: Landmark,
          },
          {
            title: 'Password Generator',
            description:
              'Generate secure passwords with our password generator.',
            image: generatePassword,
            url: '/computing/generators/password',
            icon: KeyRound,
          },
          {
            title: 'UUID Generator',
            description: 'Generate unique UUIDs with our UUID generator.',
            image: generateUUID,
            url: '/computing/generators/uuid',
            icon: Fingerprint,
          },
          {
            title: 'Random Picker',
            description:
              'Draw random numbers within a range with our random picker.',
            image: generateUUID,
            url: '/computing/random-picker',
            icon: Dices,
          },
          // {
          //   title: 'Person Generator',
          //   description:
          //     'Generate a random person with name, telephone, CPF, and birthdate.',
          //   image: generateUUID,
          //   url: '/computing/generators/person',
          //   icon: User2,
          // },
        ],
      },
      {
        title: 'Validators',
        url: '/computing/validators',
        icon: CheckCircle,
        category: 'validators',
        subMenuItems: [
          {
            title: 'CPF Validator',
            description: 'Check if a CPF is valid with our CPF validator.',
            image: validateCpf2,
            url: '/computing/validators/cpf',
            icon: UserRoundCheck,
          },
          {
            title: 'CNPJ Validator',
            description: 'Check if a CNPJ is valid with our CNPJ validator.',
            image: validateCnpj,
            url: '/computing/validators/cnpj',
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
        url: '/mathematics/online-calculators',
        icon: Calculator,
        category: 'online-calculators',
        subMenuItems: [
          {
            title: 'BMI Calculator',
            description:
              'Calculate the Body Mass Index with our BMI calculator.',
            image: calculateBmi,
            url: '/mathematics/online-calculators/bmi',
            icon: Dumbbell,
          },
          {
            title: 'BMR Calculator',
            description:
              'Calculate the Basal Metabolic Rate with our BMR calculator.',
            image: calculateBmr,
            url: '/mathematics/online-calculators/bmr',
            icon: Weight,
          },
          {
            title: 'Age Calculator',
            description:
              'Calculate the age based on a birthdate with our age calculator.',
            image: calculateAge,
            url: '/mathematics/online-calculators/age',
            icon: CalendarDays,
          },
          {
            title: 'Discount Calculator',
            description:
              'Calculate the discount amount and the final price after applying the discount.',
            image: calculateDiscount,
            url: '/mathematics/online-calculators/discount',
            icon: TicketPercent,
          },
        ],
      },
    ],
  },
]

const menuItems = tools.flatMap((group) => group.menuItems)

export const allTools = menuItems.flatMap((menuItem) => menuItem.subMenuItems)

export function getMenuItemByCategory(category: ToolCategory) {
  const menuItem = menuItems.find((item) => item.category === category)
  if (!menuItem) throw new Error(`Unknown tool category: ${category}`)

  return menuItem
}

/** Finds the menu item or tool whose URL is exactly `url`. */
export function findNavItemByUrl(
  url: string
): Pick<SidebarSubMenuItem, 'title' | 'icon' | 'url'> | null {
  for (const menuItem of menuItems) {
    if (menuItem.url === url) return menuItem

    const subItem = menuItem.subMenuItems.find((item) => item.url === url)
    if (subItem) return subItem
  }

  return null
}

export function isMenuItemActive(menuItem: SidebarMenuItem, pathname: string) {
  return (
    menuItem.url === pathname ||
    menuItem.subMenuItems.some((item) => item.url === pathname)
  )
}
