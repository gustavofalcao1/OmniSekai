'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function StartSetupPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [viewportHeight, setViewportHeight] = useState('100dvh')
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  // Redirect if user already has profile
  useEffect(() => {
    if (!authLoading && !userLoading && profile) {
      router.push('/')
    }
  }, [authLoading, userLoading, profile, router])

  useEffect(() => {
    const handleResize = () => {
      const visualHeight = window.visualViewport?.height || window.innerHeight
      const fullHeight = window.innerHeight
      const diff = fullHeight - visualHeight

      if (diff > 150) {
        setViewportHeight('60dvh')
      } else {
        setViewportHeight('100dvh')
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  if (authLoading || userLoading || profile) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter a valid name.')
      return
    }
    if (!user) return // Type-safe fallback

    if (!name.trim()) {
      setError('Please enter a valid name.')
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
    <main
      className="fixed inset-0 flex items-center justify-center px-4 overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ height: viewportHeight }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="card w-full max-w-sm flex flex-col gap-4 text-white"
      >
        <h1 className="text-2xl font-bold text-center text-accent">Crie seu Personagem</h1>

        <input
          type="text"
          placeholder="Seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-accent text-black font-bold rounded-lg py-2 hover:opacity-90 transition-all cursor-pointer"
        >
          Iniciar Jornada
        </button>
      </form>
    </main>
  )
}
