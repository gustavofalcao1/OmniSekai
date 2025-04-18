export type QuestCategory =
  | 'physical'
  | 'mental'
  | 'social'
  | 'discipline'
  | 'custom'

export type QuestDifficulty = 'easy' | 'medium' | 'hard'

export type QuestTimeType = 'daily' | 'weekly' | 'repeatable' | 'timeless'

export type QuestRewardStats = Partial<{
  strength: number
  agility: number
  intelligence: number
  charisma: number
  luck: number
}>

export type QuestData = {
  id: string
  title: string
  description?: string
  category: QuestCategory
  difficulty: QuestDifficulty
  timeType: QuestTimeType
  rewardXP: number
  rewardStats: QuestRewardStats
  rewardItem?: string
  completed: boolean
  createdAt: any
  completedAt?: any
}
