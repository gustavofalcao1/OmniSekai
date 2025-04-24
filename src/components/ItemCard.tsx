import { ItemData } from '@/types/items'
import { Box } from 'lucide-react'

type Props = {
  item: ItemData & { id: string }
  onClick?: () => void
}

export default function ItemCard({ item, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="card aspect-square bg-white/5 backdrop-blur-sm border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition"
    >
      <Box size={16}>{/* Ícone Lucide */}</Box>
    </button>
  )
}
