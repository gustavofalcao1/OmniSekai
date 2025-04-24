'use client'

import { X, Zap, InfinityIcon } from 'lucide-react'
import type { SkillData } from '@/types/skills'
import { getSkillStatus } from '@/lib/skills'

type SkillModalProps = {
  skill: SkillData
  onClose: () => void
  onActivate?: () => void
}

export default function SkillModal({ skill, onClose, onActivate }: SkillModalProps) {
  const {
    isActive,
    isOnCooldown,
    isReady,
    remainingDuration,
    remainingCooldown
  } = getSkillStatus(skill)

  const statusLabel = isActive
    ? `Active (${remainingDuration} min left)`
    : isOnCooldown
    ? `Cooldown (${remainingCooldown} min)`
    : 'Ready to activate'

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card w-[90%] max-w-md p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-3xl text-accent">
            {skill.mode === 'active' ? <Zap size={28} /> : <InfinityIcon size={28} />}
          </div>

          <h2 className="text-lg font-bold">{skill.name}</h2>
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Level {skill.level} • {skill.mode}
          </p>

          {skill.description && (
            <p className="text-sm text-white/60 mt-2">{skill.description}</p>
          )}

          <div className="mt-4 text-sm text-white/70 w-full">
            <div className="flex justify-between">
              <span>Points:</span>
              <span>{skill.points}</span>
            </div>

            {skill.mode === 'active' && (
              <>
                <div className="flex justify-between mt-2">
                  <span>Duration:</span>
                  <span>{skill.duration} min</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Cooldown:</span>
                  <span>{skill.cooldown} min</span>
                </div>
                <div className="flex justify-between mt-2 text-accent font-semibold">
                  <span>Status:</span>
                  <span>{statusLabel}</span>
                </div>
              </>
            )}
          </div>

          {isReady && skill.mode === 'active' && onActivate && (
            <button
              onClick={onActivate}
              className="mt-4 bg-accent text-black font-bold rounded-lg py-2 px-6 hover:opacity-90 transition"
            >
              Activate Skill
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
