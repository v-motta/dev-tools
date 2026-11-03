import {
  Calculator,
  CalendarDays,
  Car,
  Code,
  Contact,
  CreditCard,
  Dices,
  Dumbbell,
  FileText,
  Fingerprint,
  Flag,
  Hash,
  IdCard,
  KeyRound,
  Landmark,
  type LucideIcon,
  MapPin,
  Receipt,
  ServerCog,
  TicketPercent,
  User,
  UserRoundCheck,
  UsersRound,
  Weight,
  Wrench,
} from 'lucide-react'
import type { Messages } from 'next-intl'

type ToolMessages = Messages['tools']

// Labels, titles, descriptions and search keywords live in messages/*.json
// under `tools`, keyed by these ids
export type GroupId = keyof ToolMessages['groups']
export type MenuId = keyof ToolMessages['menus']
export type ToolId = keyof ToolMessages['items']

export interface SidebarGroup {
  id: GroupId
  /** Shown next to the group heading on the home page */
  icon: LucideIcon
  menuItems: SidebarMenuItem[]
}

export interface SidebarMenuItem {
  id: MenuId
  icon: LucideIcon
  subMenuItems: SidebarSubMenuItem[]
}

export interface SidebarSubMenuItem {
  id: ToolId
  url: string
  icon: LucideIcon
  /**
   * Terms the Ctrl+K search matches in every language, besides the
   * translated title, description and keywords
   */
  aliases?: string[]
}

export const tools: SidebarGroup[] = [
  {
    id: 'brazil',
    icon: Flag,
    menuItems: [
      {
        id: 'documents',
        icon: FileText,
        subMenuItems: [
          {
            id: 'cpf',
            url: '/brazil/documents/cpf',
            icon: UserRoundCheck,
          },
          {
            id: 'cnpj',
            url: '/brazil/documents/cnpj',
            icon: Landmark,
            aliases: ['razão social'],
          },
          {
            id: 'rg',
            url: '/brazil/documents/rg',
            icon: IdCard,
          },
          {
            id: 'cnh',
            url: '/brazil/documents/cnh',
            icon: Contact,
          },
          {
            id: 'stateRegistration',
            url: '/brazil/documents/state-registration',
            icon: Receipt,
            aliases: ['ie', 'inscrição estadual', 'sintegra'],
          },
        ],
      },
      {
        id: 'fakeData',
        icon: UsersRound,
        subMenuItems: [
          {
            id: 'person',
            url: '/brazil/fake-data/person',
            icon: User,
          },
          {
            id: 'cep',
            url: '/brazil/fake-data/cep',
            icon: MapPin,
          },
          {
            id: 'licensePlate',
            url: '/brazil/fake-data/license-plate',
            icon: Car,
            aliases: ['mercosul'],
          },
        ],
      },
    ],
  },
  {
    id: 'development',
    icon: Code,
    menuItems: [
      {
        id: 'generators',
        icon: ServerCog,
        subMenuItems: [
          {
            id: 'password',
            url: '/development/generators/password',
            icon: KeyRound,
          },
          {
            id: 'uuid',
            url: '/development/generators/uuid',
            icon: Fingerprint,
          },
          {
            id: 'creditCard',
            url: '/development/generators/credit-card',
            icon: CreditCard,
            aliases: ['visa', 'mastercard', 'elo', 'luhn'],
          },
        ],
      },
    ],
  },
  {
    id: 'utilities',
    icon: Wrench,
    menuItems: [
      {
        id: 'calculators',
        icon: Calculator,
        subMenuItems: [
          {
            id: 'bmi',
            url: '/utilities/calculators/bmi',
            icon: Dumbbell,
          },
          {
            id: 'bmr',
            url: '/utilities/calculators/bmr',
            icon: Weight,
          },
          {
            id: 'age',
            url: '/utilities/calculators/age',
            icon: CalendarDays,
          },
          {
            id: 'discount',
            url: '/utilities/calculators/discount',
            icon: TicketPercent,
          },
        ],
      },
      {
        id: 'draws',
        icon: Dices,
        subMenuItems: [
          {
            id: 'numbers',
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
