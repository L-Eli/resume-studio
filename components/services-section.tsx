"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Code, Cloud, Shield, Zap, LineChart } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description:
      "Custom artificial intelligence and machine learning solutions tailored to your business needs. From predictive analytics to natural language processing.",
  },
  {
    icon: Code,
    title: "Software Development",
    description:
      "End-to-end software development services including web applications, mobile apps, and enterprise systems with modern tech stacks.",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Scalable cloud infrastructure design and implementation. We help you migrate, optimize, and manage your cloud resources efficiently.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets. Risk assessment, penetration testing, and security audits.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description:
      "Transform your business operations with modern technology. Process automation, workflow optimization, and digital strategy.",
  },
  {
    icon: LineChart,
    title: "Data Analytics",
    description:
      "Turn your data into actionable insights. Business intelligence, data visualization, and advanced analytics solutions.",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.05)_0%,transparent_50%)]" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-accent uppercase tracking-widest">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Comprehensive IT Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            We deliver cutting-edge technology solutions that drive innovation and growth 
            for businesses across all industries.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-500 h-full">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300"
                >
                  <service.icon className="w-7 h-7 text-accent" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-8 right-8 text-accent"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
