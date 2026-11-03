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

export interface SidebarGroup {
  label: string
  /** Shown next to the group heading on the home page */
  icon: LucideIcon
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
    icon: Flag,
    menuItems: [
      {
        title: 'Documentos',
        icon: FileText,
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
            description:
              'Gere CNPJs ou empresas completas para testes, ou valide um CNPJ.',
            url: '/brazil/documents/cnpj',
            icon: Landmark,
            keywords: ['gerador', 'validador', 'empresa', 'razão social'],
          },
          {
            title: 'RG',
            description: 'Gere RGs válidos para testes ou valide um RG.',
            url: '/brazil/documents/rg',
            icon: IdCard,
            keywords: ['gerador', 'validador', 'identidade'],
          },
          {
            title: 'CNH',
            description: 'Gere CNHs válidas para testes ou valide uma CNH.',
            url: '/brazil/documents/cnh',
            icon: Contact,
            keywords: ['gerador', 'validador', 'habilitação', 'motorista'],
          },
          {
            title: 'Inscrição estadual',
            description:
              'Gere inscrições estaduais válidas de qualquer estado ou valide uma.',
            url: '/brazil/documents/state-registration',
            icon: Receipt,
            keywords: ['gerador', 'validador', 'ie', 'sintegra'],
          },
        ],
      },
      {
        title: 'Dados fictícios',
        icon: UsersRound,
        subMenuItems: [
          {
            title: 'Gerador de pessoa',
            description:
              'Gere uma pessoa com nome, documentos, contato e endereço real.',
            url: '/brazil/fake-data/person',
            icon: User,
          },
          {
            title: 'CEP',
            description: 'Gere CEPs reais com endereço ou consulte um CEP.',
            url: '/brazil/fake-data/cep',
            icon: MapPin,
            keywords: ['gerador', 'consulta', 'endereço'],
          },
          {
            title: 'Gerador de placa',
            description: 'Gere placas de veículo no padrão Mercosul ou antigo.',
            url: '/brazil/fake-data/license-plate',
            icon: Car,
            keywords: ['carro', 'moto', 'veículo', 'mercosul'],
          },
        ],
      },
    ],
  },
  {
    label: 'Desenvolvimento',
    icon: Code,
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
          {
            title: 'Gerador de cartão de crédito',
            description:
              'Gere cartões válidos para testes, com bandeira, validade e CVV.',
            url: '/development/generators/credit-card',
            icon: CreditCard,
            keywords: ['visa', 'mastercard', 'elo', 'luhn'],
          },
        ],
      },
    ],
  },
  {
    label: 'Utilidades',
    icon: Wrench,
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
