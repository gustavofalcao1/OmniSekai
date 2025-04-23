import { ItemData } from '@/types/items'

type Props = {
  item: ItemData & { id: string }
  onClick?: () => void
}

export default function ItemCard({ item, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white/5 backdrop-blur-sm border border-border rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition"
    >
      <div className="text-xl">{/* Ícone Lucide */}</div>
      <div className="mt-2 font-semibold text-sm">{item.name}</div>
      <div className="text-xs text-white/50">{item.rarity}</div>
    </button>
  )
}
