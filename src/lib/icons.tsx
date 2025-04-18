import React from 'react'
import {
  Flame,
  SlidersHorizontal,
  BrainCircuit,
  ScrollText,
  Box,
  CircleFadingArrowUp,
  CircleHelp,
  Clock,
  Tag,
  Zap
} from 'lucide-react'

export const getIcon = (
  category: 'status' | 'quest' | 'xp' | 'item' | 'fallback',
  key?: string,
  size: number = 14
): React.ReactNode => {
  if (category === 'status' && key) {
    const iconMap = {
      strength: <Flame size={size} className="text-red-500" />,
      agility: <SlidersHorizontal size={size} className="text-yellow-400" />,
      intelligence: <BrainCircuit size={size} className="text-blue-400" />,
      charisma: <ScrollText size={size} className="text-pink-400" />,
      luck: <Box size={size} className="text-green-400" />,
    }
    return iconMap[key as keyof typeof iconMap] ?? <CircleHelp size={size} className="text-white/40" />
  }

  if (category === 'quest' && key) {
    const questMap = {
      time: <Clock size={size} className="text-white/40" />,
      category: <Tag size={size} className="text-white/40" />,
      difficulty: <Zap size={size} className="text-white/40" />,
    }
    return questMap[key as keyof typeof questMap] ?? <CircleHelp size={size} className="text-white/40" />
  }

  // categorias simples
  const fallback = <CircleHelp size={size} className="text-white/40" />
  if (category === 'xp') return <CircleFadingArrowUp size={size} className="text-accent" />
  if (category === 'item') return <Box size={size} className="text-white" />
  return fallback
}
