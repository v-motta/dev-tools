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
  url: string
  icon: LucideIcon
}

export const tools: SidebarGroup[] = [
  {
    label: 'Computação',
    menuItems: [
      {
        title: 'Geradores',
        url: '/computing/generators',
        icon: ServerCog,
        category: 'generators',
        subMenuItems: [
          {
            title: 'Gerador de CPF',
            description: 'Gere CPFs válidos para testes.',
            url: '/computing/generators/cpf',
            icon: IdCard,
          },
          {
            title: 'Gerador de CNPJ',
            description: 'Gere CNPJs válidos para testes.',
            url: '/computing/generators/cnpj',
            icon: Landmark,
          },
          {
            title: 'Gerador de senha',
            description: 'Gere senhas seguras e aleatórias.',
            url: '/computing/generators/password',
            icon: KeyRound,
          },
          {
            title: 'Gerador de UUID',
            description: 'Gere identificadores únicos no formato UUID v4.',
            url: '/computing/generators/uuid',
            icon: Fingerprint,
          },
          {
            title: 'Sorteador de números',
            description: 'Sorteie um ou mais números dentro de um intervalo.',
            url: '/computing/random-picker',
            icon: Dices,
          },
          // {
          //   title: 'Gerador de pessoa',
          //   description:
          //     'Gere uma pessoa aleatória com nome, telefone, CPF e data de nascimento.',
          //   url: '/computing/generators/person',
          //   icon: User2,
          // },
        ],
      },
      {
        title: 'Validadores',
        url: '/computing/validators',
        icon: CheckCircle,
        category: 'validators',
        subMenuItems: [
          {
            title: 'Validador de CPF',
            description: 'Confira se um CPF é válido.',
            url: '/computing/validators/cpf',
            icon: UserRoundCheck,
          },
          {
            title: 'Validador de CNPJ',
            description: 'Confira se um CNPJ é válido.',
            url: '/computing/validators/cnpj',
            icon: LaptopMinimalCheck,
          },
        ],
      },
    ],
  },
  {
    label: 'Matemática',
    menuItems: [
      {
        title: 'Calculadoras',
        url: '/mathematics/online-calculators',
        icon: Calculator,
        category: 'online-calculators',
        subMenuItems: [
          {
            title: 'Calculadora de IMC',
            description: 'Calcule o Índice de Massa Corporal.',
            url: '/mathematics/online-calculators/bmi',
            icon: Dumbbell,
          },
          {
            title: 'Calculadora de TMB',
            description:
              'Calcule a Taxa Metabólica Basal e o gasto calórico diário.',
            url: '/mathematics/online-calculators/bmr',
            icon: Weight,
          },
          {
            title: 'Calculadora de idade',
            description:
              'Descubra a idade exata a partir da data de nascimento.',
            url: '/mathematics/online-calculators/age',
            icon: CalendarDays,
          },
          {
            title: 'Calculadora de desconto',
            description: 'Calcule o valor do desconto e o preço final.',
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
