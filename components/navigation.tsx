"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocalizedHref, type HomeContent, type Locale } from "@/lib/i18n"

type NavigationProps = {
  content: HomeContent["navigation"]
  locale: Locale
}

export function Navigation({ content, locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href={getLocalizedHref(locale, "#home")}
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            ECO<span className="text-accent">Tech</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {content.items.map((item, index) => (
              <motion.a
                key={item.label}
                href={getLocalizedHref(locale, item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a
              href={content.alternateHref}
              hrefLang={content.alternateLocale === "zh" ? "zh-Hant" : "en"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {content.languageLabel}
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 }}
            >
              <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
                <a href={getLocalizedHref(locale, "#contact")}>{content.cta}</a>
              </Button>
            </motion.div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {content.items.map((item) => (
                  <a
                    key={item.label}
                    href={getLocalizedHref(locale, item.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={content.alternateHref}
                  hrefLang={content.alternateLocale === "zh" ? "zh-Hant" : "en"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {content.languageLabel}
                </a>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90" asChild>
                  <a
                    href={getLocalizedHref(locale, "#contact")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {content.cta}
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
