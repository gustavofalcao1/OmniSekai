'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import SetupUpdateModal from '@/components/SetupUpdateModal'

export default function HomePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)

  if (authLoading || userLoading || !profile) return null

  const xpPercent = Math.min((profile.xp / 500) * 100, 100)

  return (
    <main className="min-h-screen w-full flex flex-col items-center pt-6 pb-24 px-4 gap-6">
      {profile?.__missing?.length ? (
        <SetupUpdateModal missingFields={profile.__missing ?? []} />
      ) : null}
      {/* HUD do personagem */}
      <section className="w-full max-w-md card backdrop-blur-lg flex items-center gap-4 mt-30">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border-2 border-accent bg-neutral-900 flex items-center justify-center text-white text-xl font-bold glow">
          {profile.name[0].toUpperCase()}
        </div>

        {/* Nome e Nível */}
        <div className="flex-1">
          <p className="text-sm text-white/70">Olá,</p>
          <p className="text-lg font-semibold text-white">{profile.name}</p>
          <p className="text-xs text-white/50 mt-1">Level {profile.level}</p>
        </div>

        {/* XP Progress */}
        <div className="flex-1">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent glow transition-all duration-300 ease-in-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-white/40 mt-1 text-right">
            {profile.xp} / 500 XP
          </p>
        </div>
      </section>

      {/* Missões futuras */}
      <section className="w-full max-w-md card backdrop-blur-lg text-center">
        <p className="text-sm text-white/70">Próximas missões em breve...</p>
      </section>
    </main>
  )
}
