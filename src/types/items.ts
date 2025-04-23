export type ItemData = {
  name: string
  description: string
  icon: string
  imageUrl?: string
  stats?: Record<string, number>
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  expiresAt?: string 
}
