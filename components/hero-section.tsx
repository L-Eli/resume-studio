"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocalizedHref, type HomeContent, type Locale } from "@/lib/i18n"

type Floater = {
  width: number
  height: number
  left: string
  top: string
  alpha: number
  duration: number
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FLOATERS: Floater[] = Array.from({ length: 8 }, (_, i) => {
  const rand = mulberry32(0x2c1b3c6d ^ (i * 0x9e3779b1))
  const width = 20 + rand() * 40
  const height = 20 + rand() * 40
  const left = `${10 + rand() * 80}%`
  const top = `${10 + rand() * 80}%`
  const alpha = 0.1 + rand() * 0.15
  const duration = 10 + rand() * 10

  return { width, height, left, top, alpha, duration }
})

type HeroSectionProps = {
  content: HomeContent["hero"]
  locale: Locale
}

export function HeroSection({ content, locale }: HeroSectionProps) {
  const ref = useRef(null)
  const isCompactHeading = content.heading.presentation === "compact"
  const showAccentUnderline = content.heading.showAccentUnderline
  const headingClassName = isCompactHeading
    ? "mx-auto max-w-5xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-[1.08] mb-6 text-balance"
    : "text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal leading-tight mb-6 text-balance"

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Floating Elements - Antigravity Effect */}
        {FLOATERS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: f.width,
              height: f.height,
              left: f.left,
              top: f.top,
              backgroundImage: `radial-gradient(circle, rgba(45, 212, 191, ${f.alpha}) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">{content.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className={headingClassName}
        >
          {content.heading.beforeAccent}{" "}
          <span className="relative">
            <span className="text-accent">{content.heading.accent}</span>
            {showAccentUnderline ? (
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              />
            ) : null}
          </span>
          <br />
          {content.heading.afterAccent}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
        >
          {content.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 group"
            asChild
          >
            <a href={getLocalizedHref(locale, "#contact")}>
              {content.primaryCta}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary bg-transparent"
            asChild
          >
            <a href={getLocalizedHref(locale, "#services")}>{content.secondaryCta}</a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-border/50"
        >
          {content.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
