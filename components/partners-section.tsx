"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const partners = [
  { name: "WorldSkills", subtitle: "Champion" },
  { name: "WorldSkills Asia", subtitle: "Expert" },
  { name: "APMIC", subtitle: "Partner" },
  { name: "Ministry of Labor", subtitle: "Republic of China" },
  { name: "hestechs", subtitle: "Technology Partner" },
]

const credentials = [
  "WorldSkills Champion",
  "WorldSkills Asia's Expert",
  "APMIC Certified",
  "Government Approved",
  "Enterprise Ready",
]

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="partners" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-accent uppercase tracking-widest">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Our Partners & Credentials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            We{"'"}re proud to collaborate with leading organizations and hold 
            prestigious credentials that validate our expertise.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 text-center"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{partner.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Credentials Banner */}
        <div className="relative overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...credentials, ...credentials, ...credentials].map((cred, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">{cred}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Achievement Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              number: "01",
              title: "International Recognition",
              desc: "WorldSkills Champion-level expertise recognized globally for technical excellence.",
            },
            {
              number: "02",
              title: "Government Trust",
              desc: "Partnered with Ministry of Labor, Republic of China for workforce development initiatives.",
            },
            {
              number: "03",
              title: "Industry Innovation",
              desc: "APMIC collaboration advancing private machine intelligence solutions.",
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <span className="text-4xl font-bold text-accent/30">{achievement.number}</span>
              <h3 className="text-lg font-semibold mt-4 mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
