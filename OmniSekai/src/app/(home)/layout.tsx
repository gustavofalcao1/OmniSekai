// src/app/(home)/layout.tsx
import type { ReactNode } from "react"
import Header from "@/components/layout/Header"
import BottomNavbar from "@/components/layout/BottomNavbar"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Header />
      {children}
      <BottomNavbar />
    </div>
  )
}
