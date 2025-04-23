import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

export async function giveItemToUser(userId: string, itemId: string, quantity: number) {
  const itemRef = doc(db, `users/${userId}/inventory`, itemId)
  const snap = await getDoc(itemRef)

  if (snap.exists()) {
    const existing = snap.data()
    await updateDoc(itemRef, {
      quantity: (existing.quantity ?? 0) + quantity,
      updatedAt: serverTimestamp(),
    })
  } else {
    await setDoc(itemRef, {
      itemId,
      quantity,
      obtainedAt: serverTimestamp(),
    })
  }
}
