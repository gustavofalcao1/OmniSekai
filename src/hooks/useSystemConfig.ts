import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export type SystemConfig = {
  difficultyMultipliers: {
    [key: string]: {
      xp: number
      bonusStats: string[]
    }
  }
  leveling: {
    xpRequirements: {
      [level: string]: number
    }
    levelRewards?: {
      [level: string]: {
        stats?: { [stat: string]: number }
        items?: string[]
      }
    }
  }
}


export function useSystemConfig() {
  const [config, setConfig] = useState<SystemConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const ref = doc(db, 'config', 'system')
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setConfig(snap.data() as SystemConfig)
        } else {
          console.warn('System config document does not exist.')
          setConfig(null)
        }
      } catch (err) {
        console.error('Failed to fetch system config:', err)
        setConfig(null)
      } finally {
        setLoading(false)
      }
    }
  
    fetchConfig()
  }, [])  

  return { config, loading }
}
