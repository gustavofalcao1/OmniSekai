'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { getIcon } from '@/lib/icons'
import { Ban } from 'lucide-react'

export default function StatusPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading } = useUser(user, !authLoading)

  if (authLoading || loading || !profile) return null

  const stats = profile.stats ?? {}

  const statusMeta = {
    strength: { name: 'Força' },
    agility: { name: 'Agilidade' },
    intelligence: { name: 'Inteligência' },
    charisma: { name: 'Carisma' },
    luck: { name: 'Sorte' },
  } as const
  

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md grid grid-cols-2 gap-4 mt-30">
        {(Object.entries(statusMeta) as [keyof typeof statusMeta, { name: string }][]).map(([key, { name }]) => (
          <div key={key} className="card flex flex-col items-center justify-center gap-1 py-4">
            <div>{getIcon('status', key, 34) ?? <Ban size={34} />}</div>
            <p className="text-sm text-white/80">{name}</p>
            <p className="text-lg font-bold text-white">{stats[key] ?? 0}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
