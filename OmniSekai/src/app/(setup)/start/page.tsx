'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function StartSetupPage() {
  const { user, loading } = useAuth()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  if (loading) return null
  if (!user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Enter a valid name.')
      return
    }

    await setDoc(doc(db, 'users', user.uid), {
      name,
      level: 1,
      xp: 0,
      stats: {
        strength: 0,
        agility: 0,
        intelligence: 0,
        charisma: 0,
        luck: 0,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    router.push('/')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center">Crie seu personagem</h1>

        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded bg-background text-foreground"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="bg-accent px-4 text-black p-2 rounded font-bold">
          Continuar
        </button>
      </form>
    </main>
  )
}
