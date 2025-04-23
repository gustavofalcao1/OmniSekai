import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Carrega o .env.local manualmente
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

console.log('API KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY) // debug opcional
