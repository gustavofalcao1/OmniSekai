export type InventoryData = {
  itemId: string
  quantity: number
  obtainedAt: any // Firestore Timestamp
  expiresAt?: any
}
