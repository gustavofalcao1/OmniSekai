import type { SkillData } from '@/types/skills'

export type SkillStatus = {
  isActive: boolean
  isOnCooldown: boolean
  isReady: boolean
  durationProgress: number
  remainingDuration?: number
  remainingCooldown?: number
}

export function getSkillStatus(skill: SkillData): SkillStatus {
  const now = Date.now()
  const lastUsed = skill.lastUsedAt ? new Date(skill.lastUsedAt).getTime() : 0
  const durationMs = (skill.duration ?? 0) * 60000
  const cooldownMs = (skill.cooldown ?? 0) * 60000

  const endsAt = lastUsed + durationMs
  const cooldownEndsAt = endsAt + cooldownMs

  const isActive = now < endsAt
  const isOnCooldown = now >= endsAt && now < cooldownEndsAt
  const isReady = now >= cooldownEndsAt || !skill.lastUsedAt

  const durationProgress = isActive
    ? Math.max(0, ((endsAt - now) / durationMs) * 100)
    : 0

  return {
    isActive,
    isOnCooldown,
    isReady,
    durationProgress,
    remainingDuration: isActive ? Math.ceil((endsAt - now) / 60000) : undefined,
    remainingCooldown: isOnCooldown ? Math.ceil((cooldownEndsAt - now) / 60000) : undefined,
  }
}
