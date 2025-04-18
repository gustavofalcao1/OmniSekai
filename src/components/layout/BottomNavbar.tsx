"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  ScrollText,
  Zap,
  Backpack,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/status", icon: BarChart2, label: "Status" },
  { href: "/skills", icon: Zap, label: "Skills" },
  { href: "/", icon: ScrollText, label: "Missões" },
  { href: "/inventory", icon: Backpack, label: "Inventário" },
  { href: "/config", icon: Settings, label: "Perfil" },
]

export default function BottomNavbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed flut bg-neutral-900 bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md backdrop-blur-lg rounded-xl px-5 py-4 flex justify-between items-center">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-[11px] font-medium transition-all ${
              isActive
                ? "text-accent"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            <Icon size={20} strokeWidth={2} />
            <span className="mt-0.5">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
