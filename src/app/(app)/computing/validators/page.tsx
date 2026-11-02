import { getMenuItemByCategory } from '@/app/tools'
import { ToolGrid } from '@/components/tool-grid'

export default function ValidatorsPage() {
  const { title, subMenuItems } = getMenuItemByCategory('validators')

  return <ToolGrid title={title} tools={subMenuItems} />
}
