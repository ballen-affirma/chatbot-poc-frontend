import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Virtual Assistant',
  description: 'POC Demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
}
