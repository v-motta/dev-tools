import { getMenuItemByCategory } from '@/app/tools'
import { ToolGrid } from '@/components/tool-grid'

export default function CalculatorsPage() {
  const { title, subMenuItems } = getMenuItemByCategory('online-calculators')

  return <ToolGrid title={title} tools={subMenuItems} />
}
