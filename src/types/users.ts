export type UserData = {
  name: string
  level: number
  xp: number
  stats: { [key: string]: number }
  createdAt: any
  updatedAt: any
  __missing?: string[]
}
