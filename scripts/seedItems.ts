// Load env vars from .env.local
import 'dotenv/config'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import type { ItemData } from '@/types/items'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Define seed items
const items: ItemData[] = [
  {
    name: 'Sword of Focus',
    description: 'A blade that sharpens your mind.',
    icon: 'sword',
    stats: { intelligence: 2 },
    rarity: 'rare',
  },
  {
    name: 'Boots of Agility',
    description: 'Makes your steps lighter.',
    icon: 'footprints',
    stats: { agility: 1 },
    rarity: 'uncommon',
  },
]

// Seed runner
async function seedItems() {
  try {
    const email = process.env.SEED_EMAIL!
    const password = process.env.SEED_PASSWORD!
    await signInWithEmailAndPassword(auth, email, password)

    const itemsRef = collection(db, 'items')
    for (const item of items) {
      const doc = await addDoc(itemsRef, item)
      console.log(`✅ Added item "${item.name}" with ID: ${doc.id}`)
    }

    console.log(`🎉 Seed completed with ${items.length} items.`)
  } catch (err) {
    console.error('❌ Error during seeding:', err)
    return
  }
}

seedItems()
