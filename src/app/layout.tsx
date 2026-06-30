import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trade NG',
  description: 'Safe and Secure Peer-to-Peer Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#F9FAFB] flex items-start justify-center max-w-[540px] mx-auto w-full`}>{children}</body>
    </html>
  )
}
