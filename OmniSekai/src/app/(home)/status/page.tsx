'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'

export default function StatusPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading } = useUser(user, !authLoading)

  if (authLoading || loading || !profile) return null

  const stats = profile.stats ?? {}

  const defaultStats = [
    { key: 'strength', name: 'Força', icon: '💪' },
    { key: 'agility', name: 'Agilidade', icon: '🏃‍♂️' },
    { key: 'intelligence', name: 'Inteligência', icon: '🧠' },
    { key: 'charisma', name: 'Carisma', icon: '🗣️' },
    { key: 'luck', name: 'Sorte', icon: '🍀' },
  ]

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md grid grid-cols-2 gap-4 mt-30">
        {defaultStats.map((attr) => (
          <div
            key={attr.key}
            className="card flex flex-col items-center justify-center gap-1 py-4"
          >
            <div className="text-2xl">{attr.icon}</div>
            <p className="text-sm text-white/80">{attr.name}</p>
            <p className="text-lg font-bold text-white">
              {stats[attr.key] ?? 0}
            </p>
          </div>
        ))}
      </section>
    </main>
  )
}
