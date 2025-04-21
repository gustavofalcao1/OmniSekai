import { db } from '@/lib/firebase'
import { doc, runTransaction, deleteDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { QuestData } from '@/types/quests'
import { StatKey, StatValues } from '@/types/stats'
import { SystemConfig } from '@/hooks/useSystemConfig'

export async function completeQuest(
  user: User,
  quest: QuestData,
  config: SystemConfig,
  onComplete?: () => void
) {
  const userRef = doc(db, 'users', user.uid)
  const questRef = doc(db, `users/${user.uid}/quests`, quest.id)

  const difficultyConfig = config.difficultyMultipliers[quest.difficulty] ?? {
    xp: 1,
    bonusStats: [],
  }

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef)
    if (!userSnap.exists()) return

    const userData = userSnap.data()
    const currentXP = userData.xp ?? 0
    const currentStats = userData.stats ?? {}

    const xpGain = Math.floor(quest.rewardXP * difficultyConfig.xp)

    const baseStats: Partial<StatValues> = { ...quest.rewardStats }
    const statKeys = Object.keys(baseStats) as StatKey[]
    const sorted = statKeys.sort((a, b) => (baseStats[b] ?? 0) - (baseStats[a] ?? 0))

    difficultyConfig.bonusStats.forEach((bonus) => {
      if (bonus === '+1 main' && sorted[0]) baseStats[sorted[0]] = (baseStats[sorted[0]] ?? 0) + 1
      if (bonus === '+2 main' && sorted[0]) baseStats[sorted[0]] = (baseStats[sorted[0]] ?? 0) + 2
      if (bonus === '+1 second' && sorted[1]) baseStats[sorted[1]] = (baseStats[sorted[1]] ?? 0) + 1
      if (bonus === '+3 main' && sorted[0]) baseStats[sorted[0]] = (baseStats[sorted[0]] ?? 0) + 3
    })

    const newStats: StatValues = { ...(userData.stats ?? {}) }
    for (const key of statKeys) {
      newStats[key] = (newStats[key] ?? 0) + (baseStats[key] ?? 0)
    }

    const newXP = currentXP + xpGain

    transaction.update(userRef, {
      xp: newXP,
      stats: newStats,
      updatedAt: new Date(),
    })

    transaction.update(questRef, {
      status: 'complete',
      completedAt: new Date(),
    })
  })

  if (onComplete) onComplete()
}
