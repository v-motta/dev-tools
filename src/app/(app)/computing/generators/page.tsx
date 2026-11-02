import { getMenuItemByCategory } from '@/app/tools'
import { ToolGrid } from '@/components/tool-grid'

export default function GeneratorsPage() {
  const { title, subMenuItems } = getMenuItemByCategory('generators')

  return <ToolGrid title={title} tools={subMenuItems} />
}
