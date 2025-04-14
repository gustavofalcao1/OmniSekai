'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'

export default function HomePage() {
  const { user, loading: authLoading } = useAuth()

  const { profile, loading: userLoading } = useUser(authLoading ? null : user)

  if (authLoading || userLoading) return null
  if (!profile) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">OmniSekai</h1>
      <p className="text-lg text-gray-300">Bem-vindo, {profile.name}</p>
      <div className="text-sm text-gray-500">
        Level {profile.level} • XP {profile.xp}
      </div>
    </main>
  )
}
