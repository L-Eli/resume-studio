import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HomePage } from "@/components/home-page"
import { getHomeContent, getHomeMetadata, isLocale, type Locale } from "@/lib/i18n"

type LocalePageProps = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: "zh" }]
}

export const dynamicParams = false

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale) || rawLocale === "en") notFound()

  return {
    ...getHomeMetadata(rawLocale),
    alternates: {
      canonical: `/${rawLocale}`,
      languages: {
        en: "/",
        zh: "/zh",
      },
    },
  }
}

export default async function LocalizedHome({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale) || rawLocale === "en") notFound()

  return <HomePage content={getHomeContent(rawLocale as Locale)} />
}
