export type StatKey = 'strength' | 'agility' | 'intelligence' | 'charisma' | 'luck'

export type StatInfo = {
  name: string
  value: number
}

export type StatsRecord = Record<StatKey, StatInfo>
