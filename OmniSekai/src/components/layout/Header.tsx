'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'

export default function Header() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading } = useUser(user, !authLoading)

  if (loading || !profile) return null

  const xpPercent = Math.min((profile.xp / 500) * 100, 100)

  return (
    <div className="fixed w-full max-w-md mx-auto px-4 pt-6">
      <div className="flex items-center justify-between flut backdrop-blur-lg border border-border rounded-2xl p-4">
        {/* Avatar */}
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-900 border-2 border-accent text-white text-xl font-bold glow">
          {profile.name[0].toUpperCase()}
        </div>

        {/* Nome e Nível */}
        <div className="flex-1 ml-4">
          <p className="text-sm text-white/60">Olá,</p>
          <p className="text-lg font-semibold text-white leading-none">{profile.name}</p>
          <p className="text-xs text-white/40 mt-1">Level {profile.level}</p>
        </div>

        {/* Barra de XP */}
        <div className="w-[30%]">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 glow"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-white/40 mt-1 text-right">
            {profile.xp} / 500 XP
          </p>
        </div>
      </div>
    </div>
  )
}
