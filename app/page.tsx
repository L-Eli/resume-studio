import { HomePage } from "@/components/home-page"
import { defaultLocale, getHomeContent } from "@/lib/i18n"

export default function Home() {
  return <HomePage content={getHomeContent(defaultLocale)} />
}
