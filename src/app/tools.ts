import {
  Calculator,
  CalendarDays,
  Dices,
  Dumbbell,
  Fingerprint,
  Hash,
  IdCard,
  KeyRound,
  Landmark,
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

export interface SidebarMenuItem {
  title: string
  icon: LucideIcon
  subMenuItems: SidebarSubMenuItem[]
}

export interface SidebarSubMenuItem {
  title: string
  description: string
  url: string
  icon: LucideIcon
  /** Extra terms the Ctrl+K search matches, besides title and description */
  keywords?: string[]
}

export const tools: SidebarGroup[] = [
  {
    label: 'Brasil',
    menuItems: [
      {
        title: 'Documentos',
        icon: IdCard,
        subMenuItems: [
          {
            title: 'CPF',
            description: 'Gere CPFs válidos para testes ou valide um CPF.',
            url: '/brazil/documents/cpf',
            icon: UserRoundCheck,
            keywords: ['gerador', 'validador'],
          },
          {
            title: 'CNPJ',
            description: 'Gere CNPJs válidos para testes ou valide um CNPJ.',
            url: '/brazil/documents/cnpj',
            icon: Landmark,
            keywords: ['gerador', 'validador'],
          },
          // {
          //   title: 'Gerador de pessoa',
          //   description:
          //     'Gere uma pessoa aleatória com nome, telefone, CPF e data de nascimento.',
          //   url: '/brazil/fake-data/person',
          //   icon: User2,
          // },
        ],
      },
    ],
  },
  {
    label: 'Desenvolvimento',
    menuItems: [
      {
        title: 'Geradores',
        icon: ServerCog,
        subMenuItems: [
          {
            title: 'Gerador de senha',
            description: 'Gere senhas seguras e aleatórias.',
            url: '/development/generators/password',
            icon: KeyRound,
          },
          {
            title: 'Gerador de UUID',
            description: 'Gere identificadores únicos no formato UUID v4.',
            url: '/development/generators/uuid',
            icon: Fingerprint,
          },
        ],
      },
    ],
  },
  {
    label: 'Utilidades',
    menuItems: [
      {
        title: 'Calculadoras',
        icon: Calculator,
        subMenuItems: [
          {
            title: 'Calculadora de IMC',
            description: 'Calcule o Índice de Massa Corporal.',
            url: '/utilities/calculators/bmi',
            icon: Dumbbell,
          },
          {
            title: 'Calculadora de TMB',
            description:
              'Calcule a Taxa Metabólica Basal e o gasto calórico diário.',
            url: '/utilities/calculators/bmr',
            icon: Weight,
          },
          {
            title: 'Calculadora de idade',
            description:
              'Descubra a idade exata a partir da data de nascimento.',
            url: '/utilities/calculators/age',
            icon: CalendarDays,
          },
          {
            title: 'Calculadora de desconto',
            description: 'Calcule o valor do desconto e o preço final.',
            url: '/utilities/calculators/discount',
            icon: TicketPercent,
          },
        ],
      },
      {
        title: 'Sorteios',
        icon: Dices,
        subMenuItems: [
          {
            title: 'Sorteador de números',
            description: 'Sorteie um ou mais números dentro de um intervalo.',
            url: '/utilities/draws/numbers',
            icon: Hash,
          },
        ],
      },
    ],
  },
]

const menuItems = tools.flatMap((group) => group.menuItems)

export const allTools = menuItems.flatMap((menuItem) => menuItem.subMenuItems)

/** Finds the tool whose URL is exactly `url`, along with its menu item. */
export function findToolByUrl(url: string) {
  for (const menuItem of menuItems) {
    const tool = menuItem.subMenuItems.find((item) => item.url === url)
    if (tool) return { menuItem, tool }
  }

  return null
}

export function isMenuItemActive(menuItem: SidebarMenuItem, pathname: string) {
  return menuItem.subMenuItems.some((item) => item.url === pathname)
}
