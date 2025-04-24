'use client'

import { useSkills } from '@/hooks/useSkills'
import { X } from 'lucide-react'
import { useState } from 'react'

type Props = {
  initial?: string[]
  onClose: () => void
  onConfirm: (selected: string[]) => void
}

export default function SkillSelectModal({ initial = [], onClose, onConfirm }: Props) {
  const { skills, loading } = useSkills()
  const [selected, setSelected] = useState<string[]>(initial)

  const toggleSkill = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  if (loading) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="card w-full max-w-md p-4 text-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4 text-accent">Selecionar Skills</h2>

        <div className="flex flex-col gap-2 text-sm">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              className={`p-2 rounded flex justify-between items-center ${
                selected.includes(skill.id)
                  ? 'bg-white/10 border border-accent'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span>{skill.name}</span>
              <span className="text-white/40 text-xs">Level {skill.level}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onConfirm(selected)}
          className="mt-6 w-full bg-accent text-black font-bold rounded-lg py-2 hover:opacity-90 transition"
        >
          Confirmar Skills
        </button>
      </div>
    </div>
  )
}
