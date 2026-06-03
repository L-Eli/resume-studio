"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Cloud, Code, LineChart, Shield, Zap } from "lucide-react"
import type { HomeContent } from "@/lib/i18n"

const serviceIcons = [Brain, Code, Cloud, Shield, Zap, LineChart] as const

type ServicesSectionProps = {
  content: HomeContent["services"]
}

export function ServicesSection({ content }: ServicesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.05)_0%,transparent_50%)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-accent uppercase tracking-widest">{content.eyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {content.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.cards.map((service, index) => {
            const Icon = serviceIcons[index] ?? Brain

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-500 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300"
                  >
                    <Icon className="w-7 h-7 text-accent" />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-8 right-8 text-accent"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
