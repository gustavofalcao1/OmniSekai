"use client"

import { useState } from "react"
import { X, Ban } from "lucide-react"
import { getIcon } from "@/lib/icons"
import { StatsRecord } from '@/types/stats'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'


const defaultStats: StatsRecord = {
  strength: {name: "Força", value: 0},
  agility: {name: "Agilidade", value: 0},
  intelligence: {name: "Inteligência", value: 0},
  charisma: {name: "Carisma", value: 0},
  luck: {name: "Sorte", value: 0},
}

export default function AddQuestModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rewardXP, setRewardXP] = useState(0)
  const [rewardStats, setRewardStats] = useState<StatsRecord>(defaultStats)
  const [rewardItem, setRewardItem] = useState("")
  const [timeType, setTimeType] = useState("diária")
  const [category, setCategory] = useState("físico")
  const [difficulty, setDifficulty] = useState("fácil")
  const { user } = useAuth()

  const handleCreateQuest = async () => {
    if (!user) return
  
    const flatStats: Record<string, number> = {}
    Object.entries(rewardStats).forEach(([key, { value }]) => {
      if (value > 0) flatStats[key] = value
    })
  
    await addDoc(collection(db, `users/${user.uid}/quests`), {
      title,
      description,
      timeType,
      category,
      difficulty,
      rewardXP,
      rewardStats: flatStats,
      rewardItem: rewardItem || null,
      createdAt: serverTimestamp(),
    })
  
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCreateQuest()
    onClose()
  }

  return (
    <div className="modal fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 mb-22">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md p-6 text-white space-y-4 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-accent">Nova Missão</h2>

        <input
          type="text"
          placeholder="Título da missão"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50"
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50"
          rows={3}
        />

        <div className="flex items-center gap-2">
          {getIcon('xp') ?? <Ban size={16} />}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="XP"
            value={rewardXP === 0 ? "" : rewardXP}
            onChange={(e) => {
              const parsed = parseInt(e.target.value)
              setRewardXP(isNaN(parsed) ? 0 : parsed)
            }}
            className="bg-white/5 w-full text-sm rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="text-xs text-white/50">Pontos de status:</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(rewardStats).map(([key, stats]) => (
              <div key={key} className="flex items-center gap-2">
                {getIcon('status', key) ?? <Ban size={16} />}
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={stats.value === 0 ? "" : stats.value}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value)
                    setRewardStats((prev) => ({
                      ...prev,
                      [key as keyof StatsRecord]: {
                        ...prev[key as keyof StatsRecord],
                        value: isNaN(parsed) ? 0 : parsed,
                      }
                    }))                    
                  }}
                  className="w-full bg-white/5 text-sm rounded px-2 py-1"
                  placeholder={stats.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getIcon('item') ?? <Ban size={16} />}
          <input
            type="text"
            placeholder="Item (opcional)"
            value={rewardItem}
            onChange={(e) => setRewardItem(e.target.value)}
            className="bg-white/5 w-full text-sm rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <select value={timeType} onChange={(e) => setTimeType(e.target.value)} className="bg-white/5 rounded px-2 py-1">
            <option>diária</option>
            <option>semanal</option>
            <option>repetitiva</option>
            <option>atemporal</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white/5 rounded px-2 py-1">
            <option>físico</option>
            <option>mental</option>
            <option>social</option>
            <option>disciplina</option>
            <option>custom</option>
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-white/5 rounded px-2 py-1">
            <option>fácil</option>
            <option>médio</option>
            <option>difícil</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-accent text-black font-bold rounded-lg py-2 w-full hover:opacity-90 transition"
        >
          Salvar Missão
        </button>
      </form>
    </div>
  )
}
