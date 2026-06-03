import type { Metadata } from "next"

import { HomePage } from "@/components/home-page"
import { getHomeContent, getHomeMetadata } from "@/lib/i18n"

const locale = "zh"

export const metadata: Metadata = {
  ...getHomeMetadata(locale),
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      zh: "/zh",
    },
  },
}

export default function ChineseHome() {
  return <HomePage content={getHomeContent(locale)} />
}
