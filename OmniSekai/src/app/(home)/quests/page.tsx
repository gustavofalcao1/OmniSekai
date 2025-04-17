'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useQuests } from '@/hooks/useQuests'

export default function QuestsPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading } = useUser(user, !authLoading)
  const { quests, loading: questsLoading } = useQuests(user, !authLoading)

  if (authLoading || loading || questsLoading || !profile) return null

  if (authLoading || loading || !profile) return null

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      {/* Placeholder for quest list */}
      <section className="w-full max-w-md flex flex-col gap-3 mt-30">
        {quests.length === 0 ? (
          <p className="text-sm text-white/40 text-center">Nenhuma missão ainda</p>
        ) : (
          quests.map((quest) => (
        <div className="card">
          <div className="flex flex-col w-full items-cente justify-between rgap-2">
            <div className="flex flex-row w-full items-center justify-between gap-2">
              <p className="text-md text-white font-medium">Treinar 30 minutos</p>
              <p className="text-xs text-white/50">Diaria • Físico • Médio</p>
            </div>
            <div className="flex flex-row w-full items-center justify-between gap-2">
              <ul className="text-xs text-white/50 flex flex-col gap-1 mt-2">
                <li>• 200 XP </li>
                <li>• 2 Pontos de Força</li>
                <li>• Emblema "30 Minutos Sofridos"</li>
              </ul>
              <button className="text-accent text-sm font-semibold cursor-pointer">
                Completo
              </button>
            </div>
          </div>
        </div>
        ))
      )}
      </section>

      {/* Floating button to add a new quest */}
      <button
        className="fixed bottom-28 right-6 bg-accent text-3xl text-black rounded-full px-4 py-2 shadow-lg"
      >
        +
      </button>
    </main>
  )
}
