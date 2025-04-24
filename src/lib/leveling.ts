import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { SystemConfig } from '@/hooks/useSystemConfig'
import { UserData } from '@/types/users'
import { giveItemToUser } from './inventory'

export async function applyLevelUpIfNeeded(
  profile: UserData,
  config: SystemConfig,
  userId: string
) {
  const xp = profile.xp ?? 0
  let currentLevel = profile.level ?? 1
  const xpRequirements = config.leveling?.xpRequirements ?? {}
  const levelRewards = config.leveling?.levelRewards ?? {}

  let nextLevel = currentLevel + 1
  let leveledUp = false
  let updatedStats = { ...profile.stats }

  const itemsToGive: { itemId: string, quantity: number }[] = []

  while (
    xpRequirements[nextLevel.toString()] !== undefined &&
    xp >= xpRequirements[nextLevel.toString()]
  ) {
    currentLevel = nextLevel
    leveledUp = true

    const rewards = levelRewards?.[currentLevel.toString()]
    if (rewards?.stats) {
      for (const stat in rewards.stats) {
        updatedStats[stat] = (updatedStats[stat] ?? 0) + rewards.stats[stat]
      }
    }

    if (rewards?.items) {
      itemsToGive.push(...rewards.items)
    }

    nextLevel++
  }

  if (leveledUp && currentLevel !== profile.level) {
    await updateDoc(doc(db, 'users', userId), {
      level: currentLevel,
      stats: updatedStats,
      updatedAt: new Date()
    })

    for (const item of itemsToGive) {
      await giveItemToUser(userId, item.itemId, item.quantity)
    }
  }
}
