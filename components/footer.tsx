"use client"

import { motion } from "framer-motion"

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Services", "Partners", "Contact"],
  },
  {
    title: "Services",
    links: ["AI Solutions", "Software Dev", "Cloud Architecture", "Data Analytics"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
]

export function Footer() {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold tracking-tight mb-4"
            >
              ECO<span className="text-accent">Tech</span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-6">
              Designing and developing AI & IT solutions for every industry. 
              World-class expertise, global reach.
            </p>
            <p className="text-xs text-muted-foreground">
              WorldSkills Champion • WorldSkills Asia Expert
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ECO Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["LinkedIn", "Twitter", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
