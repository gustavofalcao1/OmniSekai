export type SkillMode = 'passive' | 'active'

export type SkillData = {
  id: string
  name: string
  description?: string
  icon?: string
  level: number
  points: number
  mode: SkillMode
  createdAt: any // Firestore Timestamp
  lastUsedAt?: any
  cooldown?: number // in minutes
  duration?: number // in minutes
}
