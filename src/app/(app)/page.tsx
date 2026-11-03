import { ToolGrid } from '@/components/tool-grid'
import { allTools } from '../tools'

export default function Home() {
  return <ToolGrid title="Ferramentas" tools={allTools} />
}
