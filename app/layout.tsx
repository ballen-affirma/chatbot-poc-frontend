import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'

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
        <div className={styles.header}>
          <img className={styles.aloricaBanner} src="/assets/AloricaIQ_Banner.png"></img>
          <div className={styles.links}>
            <a className={styles.link} href="/">Call Deflection</a>
            <a className={styles.link} href="/">Contact Optimization</a>
            <a className={styles.link} href="/">Tools</a>
            <a className={styles.link} href="/">Alorica Assure</a>
            <a className={styles.link} href="/">AVA</a>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
