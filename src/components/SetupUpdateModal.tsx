'use client'

import { useState } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

export default function SetupUpdateModal({ missingFields }: { missingFields: string[] }) {
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const handleFix = async () => {
    if (!user) return
    setSubmitting(true)

    const userRef = doc(db, 'users', user.uid)
    const patch: Record<string, any> = {}

    if (missingFields.includes('stats')) {
      patch.stats = {
        strength: 0,
        agility: 0,
        intelligence: 0,
        charisma: 0,
        luck: 0,
      }
    }

    if (missingFields.includes('level')) patch.level = 1
    if (missingFields.includes('xp')) patch.xp = 0
    if (missingFields.includes('name')) patch.name = 'New Hero'

    patch.updatedAt = serverTimestamp()

    await updateDoc(userRef, patch)
    setSubmitting(false)

    // Optional: reload page or refetch state
    location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card max-w-sm w-full text-center p-6">
        <h2 className="text-lg font-semibold text-accent mb-2">Update Required</h2>
        <p className="text-sm text-white/70 mb-4">
          Your profile is missing important fields: <br />
          <span className="text-white font-medium">{missingFields.join(', ')}</span>
        </p>

        <button
          onClick={handleFix}
          disabled={submitting}
          className="bg-accent text-black font-bold py-2 px-4 rounded mt-2"
        >
          {submitting ? 'Updating...' : 'Apply Fix'}
        </button>
      </div>
    </div>
  )
}
