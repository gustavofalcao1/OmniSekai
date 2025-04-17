import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OmniSekai',
  description: 'Desperte... Você é o prota da sua própria história.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${inter.className} w-full md:max-w-lg mx-auto border-x-1 border-border cursor-pointer`}>
        {children}
      </body>
    </html>
  )
}
