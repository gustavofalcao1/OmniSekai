'use client'

import { useState } from 'react'
import { useSkills } from '@/hooks/useSkills'
import { useAuth } from '@/hooks/useAuth'
import LoadingScreen from '@/components/LoadingScreen'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import AddSkillModal from '@/components/AddSkillModal'
import SkillModal from '@/components/SkillModal'
import { getSkillStatus } from '@/lib/skills'

export default function SkillsPage() {
  const { skills, loading } = useSkills()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  if (loading || !user) return <LoadingScreen />

  const handleActivateSkill = async (skillId: string) => {
    const ref = doc(db, `users/${user.uid}/skills`, skillId)
    await updateDoc(ref, {
      lastUsedAt: serverTimestamp(),
    })
    setSelectedSkill(null)
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md flex flex-col gap-3 mt-30">
        {skills.map((skill) => {
          const {
            isActive,
            isOnCooldown,
            durationProgress
          } = getSkillStatus(skill)

          return (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill.id)}
              className={`relative card w-full text-left flex justify-between items-center px-4 py-3 transition-all duration-300 ${
                isActive
                  ? 'bg-green-600/20 border-green-400'
                  : isOnCooldown
                  ? 'opacity-40'
                  : ''
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-white">{skill.name}</p>
                <p className="text-xs text-white/50">
                  Level {skill.level} — {skill.mode}
                </p>
              </div>

              <div className="text-accent">
                {skill.mode === 'active' ? '⚡' : '∞'}
              </div>

              {isActive && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-green-400"
                  style={{ width: `${durationProgress}%` }}
                />
              )}
            </button>
          )
        })}
      </section>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-26 md:bottom-28 right-6 md:right-[calc(50vw-220px)] bg-accent text-3xl text-black rounded-full px-4 py-2 shadow-lg"
      >
        +
      </button>

      {showModal && <AddSkillModal onClose={() => setShowModal(false)} />}

      {selectedSkill && (
        <SkillModal
          skill={skills.find(s => s.id === selectedSkill)!}
          onClose={() => setSelectedSkill(null)}
          onActivate={() => handleActivateSkill(selectedSkill)}
        />
      )}
    </main>
  )
}
