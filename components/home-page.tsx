import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HtmlLang } from "@/components/html-lang"
import { LoadingScreen } from "@/components/loading-screen"
import { Navigation } from "@/components/navigation"
import { PartnersSection } from "@/components/partners-section"
import { ServicesSection } from "@/components/services-section"
import type { HomeContent } from "@/lib/i18n"

type HomePageProps = {
  content: HomeContent
}

export function HomePage({ content }: HomePageProps) {
  return (
    <>
      <HtmlLang lang={content.htmlLang} />
      <LoadingScreen content={content.loading} />
      <Navigation content={content.navigation} locale={content.locale} />
      <main>
        <HeroSection content={content.hero} locale={content.locale} />
        <ServicesSection content={content.services} />
        <AboutSection content={content.about} />
        <PartnersSection content={content.partners} />
        <ContactSection content={content.contact} />
      </main>
      <Footer content={content.footer} locale={content.locale} />
    </>
  )
}
