'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useSystemConfig } from '@/hooks/useSystemConfig'
import LoadingScreen from '@/components/LoadingScreen'
import { useSkills } from '@/hooks/useSkills'
import SkillModal from '@/components/SkillModal'
import { useState, useMemo } from 'react'
import { getSkillStatus } from '@/lib/skills'

export default function Header() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)
  const { config, loading: configLoading } = useSystemConfig()
  const { skills } = useSkills()
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const activeSkills = useMemo(() => {
    return skills.filter((skill) => {
      return skill.mode === 'active' && getSkillStatus(skill).isActive
    })
  }, [skills])

  if (authLoading || userLoading || configLoading || !profile || !config) return <LoadingScreen />

  const currentXp = profile.xp ?? 0
  const level = profile.level ?? 1

  const xpRequirements = config.leveling?.xpRequirements ?? {}
  const requiredForCurrentLevel = xpRequirements[level] ?? 0
  const requiredForNextLevel = xpRequirements[level + 1] ?? (requiredForCurrentLevel + 100)

  const progress =
    ((currentXp - requiredForCurrentLevel) / (requiredForNextLevel - requiredForCurrentLevel)) * 100

  const xpPercent = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="fixed w-full max-w-md md:max-w-lg mx-auto px-4 pt-4">
      <div className="flex items-center justify-between flut backdrop-blur-lg border border-border rounded-2xl p-4">
        {/* Avatar */}
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-900 border-2 border-accent text-white text-xl font-bold glow">
          {profile.name[0].toUpperCase()}
        </div>

        {/* Name and Level */}
        <div className="flex-1 ml-4">
          <p className="text-lg font-semibold text-white leading-none">{profile.name}</p>
          <p className="text-xs text-white/40 mt-2">Level {level}</p>
        </div>

        {/* XP Bar */}
        <div className="w-[30%]">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 glow"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-white/40 mt-1 text-right">
            {currentXp} / {requiredForNextLevel} XP
          </p>
        </div>

        {/* Active Skills */}
        {activeSkills.length > 0 && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {activeSkills.map((skill) => {
              const { durationProgress, remainingDuration } = getSkillStatus(skill)

              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  title={`${skill.name} — ${remainingDuration} min`}
                  className="relative w-7 h-7 rounded-full bg-black text-white text-[10px] flex items-center justify-center"
                  style={{
                    background: `conic-gradient(var(--accent) ${durationProgress}%, transparent 0)`,
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-black border border-accent flex items-center justify-center text-xs">
                    ⚡
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {selectedSkill && (
          <SkillModal
            skill={skills.find(s => s.id === selectedSkill)!}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </div>
    </div>
  )
}
