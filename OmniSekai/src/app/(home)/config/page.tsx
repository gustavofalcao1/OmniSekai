'use client'

import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function ConfigPage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-6">
      <section className="w-full flex justify-center max-w-md mt-30">
        <button
          onClick={handleLogout}
          className="w-auto px-4 bg-white/5 border border-border text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition"
        >
          Encerrar Sessão
        </button>
      </section>
    </main>
  )
}
