'use client'

import { useEffect, useRef, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [viewportHeight, setViewportHeight] = useState('100dvh')

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const visualHeight = window.visualViewport?.height || window.innerHeight
      const fullHeight = window.innerHeight
      const diff = fullHeight - visualHeight

      if (diff > 150) {
        // Keyboard likely open → use 60% height
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (err) {
      setError('Incorrect email or password.')
    }
  }

  return (
    <main
      className="fixed inset-0 flex items-center justify-center px-4 overflow-hidden transition-all duration-300"
      style={{ height: viewportHeight }}
    >
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="card w-full max-w-sm flex flex-col gap-4 text-white transition-transform duration-300"
      >
        <h1 className="text-2xl font-bold text-center text-accent">OmniSekai</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-accent text-black font-bold rounded-lg py-2 hover:opacity-90 transition-all"
        >
          Sign In
        </button>
      </form>
    </main>
  )
}
