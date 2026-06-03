import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { defaultLocale, getHomeMetadata } from '@/lib/i18n'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const defaultMetadata = getHomeMetadata(defaultLocale)

export const metadata: Metadata = {
  ...defaultMetadata,
  authors: [{ name: 'ECO Tech' }],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      zh: '/zh',
    },
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
