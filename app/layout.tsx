import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { defaultLocale, getHomeContent, getHomeMetadata, isLocale, type Locale } from '@/lib/i18n'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "/"
  const locale = pathname.split("/").filter(Boolean)[0] ?? ""
  const resolvedLocale: Locale = isLocale(locale) ? locale : defaultLocale
  const content = getHomeContent(resolvedLocale)

  return (
    <html lang={content.htmlLang} className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
