'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useRef, useEffect } from 'react'

const routes = ['/status', '/quests', '/', '/inventory', '/skills', '/config']

export default function GestureWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const touchStart = useRef<number | null>(null)

  const currentIndex = routes.indexOf(pathname)

  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX

    if (Math.abs(diff) < 50) return // ignore weak swipe

    if (diff > 0 && currentIndex < routes.length - 1) {
      router.push(routes[currentIndex + 1])
    } else if (diff < 0 && currentIndex > 0) {
      router.push(routes[currentIndex - 1])
    }

    touchStart.current = null
  }

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pathname])

  return <>{children}</>
}
