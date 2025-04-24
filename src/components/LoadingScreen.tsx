'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingScreen({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
      <div className="animate-spin mb-4">
        <Loader2 size={36} className="text-accent" />
      </div>
      <p className="text-sm text-white/60 italic">{message}</p>
    </div>
  )
}
