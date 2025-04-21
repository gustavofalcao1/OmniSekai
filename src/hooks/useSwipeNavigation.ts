import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const routes = ['/status', '/skills', '/', '/inventory', '/config']

export function useSwipeNavigation(enabled: boolean = true) {
  const router = useRouter()
  const pathname = usePathname()
  const touchStart = useRef<number | null>(null)
  const currentIndex = routes.indexOf(pathname)

  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return
      const diff = touchStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) < 50) return

      if (diff > 0 && currentIndex < routes.length - 1) {
        router.push(routes[currentIndex + 1])
      } else if (diff < 0 && currentIndex > 0) {
        router.push(routes[currentIndex - 1])
      }

      touchStart.current = null
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, pathname, currentIndex, router])
}
