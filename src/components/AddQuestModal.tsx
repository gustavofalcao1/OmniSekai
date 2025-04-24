'use client'

import { useState } from "react"
import { X, Ban } from "lucide-react"
import { getIcon } from "@/lib/icons"
import { StatsRecord } from '@/types/stats'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { useItems } from '@/hooks/useItems'
import { useSkills } from '@/hooks/useSkills'
import ItemModal from '@/components/ItemModal'
import SkillModal from '@/components/SkillModal'
import ItemSelectModal from '@/components/ItemSelectModal'
import SkillSelectModal from '@/components/SkillSelectModal'

const defaultStats: StatsRecord = {
  strength: { name: "Força", value: 0 },
  agility: { name: "Agilidade", value: 0 },
  intelligence: { name: "Inteligência", value: 0 },
  charisma: { name: "Carisma", value: 0 },
  luck: { name: "Sorte", value: 0 },
}

export default function AddQuestModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const items = useItems()
  const { skills } = useSkills()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rewardXP, setRewardXP] = useState(0)
  const [rewardStats, setRewardStats] = useState<StatsRecord>(defaultStats)
  const [rewardItems, setRewardItems] = useState<{ itemId: string, quantity: number }[]>([])
  const [rewardSkills, setRewardSkills] = useState<string[]>([])
  const [timeType, setTimeType] = useState("diária")
  const [category, setCategory] = useState("físico")
  const [difficulty, setDifficulty] = useState("fácil")
  const [showItemModal, setShowItemModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)

  const handleCreateQuest = async () => {
    if (!user) return

    const flatStats: Record<string, number> = {}
    Object.entries(rewardStats).forEach(([key, { value }]) => {
      if (value > 0) flatStats[key] = value
    })

    await addDoc(collection(db, `users/${user.uid}/quests`), {
      status: "pending",
      title,
      description,
      timeType,
      category,
      difficulty,
      rewardXP,
      rewardStats: flatStats,
      rewardItems,
      rewardSkills,
      createdAt: serverTimestamp(),
    })

    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCreateQuest()
  }

  return (
    <div className="modal fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start overflow-y-auto p-4 pt-10 pb-32">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md p-6 pt-10 pb-10 text-white space-y-4 relative"
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
          className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50"
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50"
          rows={3}
        />

        <div className="flex items-center gap-2">
          {getIcon('xp') ?? <Ban size={16} />}
          <input
            type="number"
            placeholder="XP"
            value={rewardXP === 0 ? "" : rewardXP}
            onChange={(e) => setRewardXP(parseInt(e.target.value) || 0)}
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
                  type="number"
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

        <div>
          <label className="text-xs text-white/50">Itens de recompensa:</label>
          <div className="flex flex-col gap-1 mt-2">
            {rewardItems.length === 0 && (
              <p className="text-xs text-white/40">Nenhum item selecionado.</p>
            )}
            {rewardItems.map((item, i) => (
              <p
                key={i}
                className="text-sm text-accent underline cursor-pointer hover:text-white transition"
                onClick={() => setSelectedItemId(item.itemId)}
              >
                {item.quantity}x {items[item.itemId]?.name ?? item.itemId}
              </p>
            ))}
            <button
              type="button"
              onClick={() => setShowItemModal(true)}
              className="text-xs text-accent hover:underline mt-1"
            >
              Selecionar itens
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50">Skills relacionadas:</label>
          <div className="flex flex-col gap-1 mt-2">
            {rewardSkills.length === 0 && (
              <p className="text-xs text-white/40">Nenhuma skill selecionada.</p>
            )}
            {rewardSkills.map((skillId, i) => (
              <p
                key={i}
                className="text-sm text-accent underline cursor-pointer hover:text-white transition"
                onClick={() => setSelectedSkillId(skillId)}
              >
                {skills.find(s => s.id === skillId)?.name ?? skillId}
              </p>
            ))}
            <button
              type="button"
              onClick={() => setShowSkillModal(true)}
              className="text-xs text-accent hover:underline mt-1"
            >
              Selecionar skills
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-xs text-white/50">Frequência:</label>
            <select value={timeType} onChange={(e) => setTimeType(e.target.value)} className="w-full bg-white/5 rounded px-2 py-1 mt-2">
              <option>Diária</option>
              <option>Semanal</option>
              <option>Repetitiva</option>
              <option>Atemporal</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50">Categoria:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-white/5 rounded px-2 py-1 mt-2">
              <option>Físico</option>
              <option>Mental</option>
              <option>Social</option>
              <option>Disciplina</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50">Dificuldade:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-white/5 rounded px-2 py-1 mt-2">
              <option>Fácil</option>
              <option>Médio</option>
              <option>Difícil</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent text-black font-bold rounded-lg py-2 w-full hover:opacity-90 transition"
        >
          Salvar Missão
        </button>
      </form>

      {showItemModal && (
        <ItemSelectModal
          initial={rewardItems}
          onClose={() => setShowItemModal(false)}
          onConfirm={(items) => {
            setRewardItems(items)
            setShowItemModal(false)
          }}
        />
      )}

      {showSkillModal && (
        <SkillSelectModal
          initial={rewardSkills}
          onClose={() => setShowSkillModal(false)}
          onConfirm={(skills) => {
            setRewardSkills(skills)
            setShowSkillModal(false)
          }}
        />
      )}

      {selectedItemId && (
        <ItemModal
          item={items[selectedItemId]}
          onClose={() => setSelectedItemId(null)}
        />
      )}

      {selectedSkillId && (
        <SkillModal
          skill={skills.find(s => s.id === selectedSkillId)!}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
    </div>
  )
}
