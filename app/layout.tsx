import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'ECO Tech | AI & IT Solutions for Every Industry',
  description: 'ECO Tech designs and develops cutting-edge AI & IT solutions for businesses across all industries. WorldSkills Champion expertise driving innovation.',
  keywords: ['AI solutions', 'IT consulting', 'software development', 'digital transformation', 'machine learning', 'enterprise solutions'],
  authors: [{ name: 'ECO Tech' }],
  openGraph: {
    title: 'ECO Tech | AI & IT Solutions',
    description: 'Transforming businesses with innovative AI & IT solutions',
    type: 'website',
  },
    generator: 'v0.app'
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
