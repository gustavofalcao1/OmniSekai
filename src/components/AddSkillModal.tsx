'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

export default function AddSkillModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [mode, setMode] = useState<'passive' | 'active'>('passive')
  const [duration, setDuration] = useState('')
  const [cooldown, setCooldown] = useState('')

  const handleSave = async () => {
    if (!user || !name) return

    await addDoc(collection(db, `users/${user.uid}/skills`), {
      name,
      description,
      mode,
      level: 1,
      points: 0,
      duration: mode === 'active' ? Number(duration) || 0 : null,
      cooldown: mode === 'active' ? Number(cooldown) || 0 : null,
      createdAt: serverTimestamp(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card w-full max-w-md p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-accent mb-4">New Skill</h2>

        <input
          type="text"
          placeholder="Skill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50 mb-3"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50 mb-3"
          rows={2}
        />

        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm">Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'passive' | 'active')}
            className="bg-white/5 border border-border rounded px-2 py-1 text-sm"
          >
            <option value="passive">Passive</option>
            <option value="active">Active</option>
          </select>
        </div>

        {mode === 'active' && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="number"
              placeholder="Duration (min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-white/5 border border-border rounded px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Cooldown (min)"
              value={cooldown}
              onChange={(e) => setCooldown(e.target.value)}
              className="bg-white/5 border border-border rounded px-3 py-2 text-sm"
            />
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-accent text-black font-bold rounded-lg py-2 hover:opacity-90 transition"
        >
          Save Skill
        </button>
      </div>
    </div>
  )
}
