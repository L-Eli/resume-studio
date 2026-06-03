"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Award, Rocket, Target, Users } from "lucide-react"
import type { HomeContent } from "@/lib/i18n"

const highlightIcons = [Award, Users, Target, Rocket] as const

type AboutSectionProps = {
  content: HomeContent["about"]
}

export function AboutSection({ content }: AboutSectionProps) {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-secondary blur-3xl"
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-accent uppercase tracking-widest">{content.eyebrow}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
              {content.title}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {content.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {content.highlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? Award

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
