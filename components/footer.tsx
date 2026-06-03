"use client"

import { motion } from "framer-motion"
import { getLocalizedHref, type HomeContent, type Locale } from "@/lib/i18n"

type FooterProps = {
  content: HomeContent["footer"]
  locale: Locale
}

function getFooterHref(locale: Locale, href: string) {
  if (href === "#") return href

  return getLocalizedHref(locale, href)
}

export function Footer({ content, locale }: FooterProps) {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold tracking-tight mb-4"
            >
              ECO<span className="text-accent">Tech</span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-6">
              {content.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {content.credentialLine}
            </p>
          </div>

          {content.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <a
                      href={getFooterHref(locale, link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ECO Tech. {content.copyrightSuffix}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ecotech-tw"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
