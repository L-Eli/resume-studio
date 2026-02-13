"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Award, Users, Target, Rocket } from "lucide-react"

const highlights = [
  {
    icon: Award,
    title: "WorldSkills Excellence",
    description: "Our team includes WorldSkills Champion and Asia Expert, bringing world-class expertise to every project.",
  },
  {
    icon: Users,
    title: "Client-Centric Approach",
    description: "We prioritize understanding your unique challenges and delivering solutions that exceed expectations.",
  },
  {
    icon: Target,
    title: "Industry Expertise",
    description: "Deep experience across multiple sectors enables us to deliver tailored solutions for any industry.",
  },
  {
    icon: Rocket,
    title: "Innovation-Driven",
    description: "We stay at the forefront of technology, leveraging the latest advancements to drive your success.",
  },
]

export function AboutSection() {
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
      {/* Parallax Background Elements */}
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
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-accent uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
              Building the Future of Business Technology
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-pretty">
                ECO Tech is a dynamic startup founded with a mission to democratize access 
                to cutting-edge AI and IT solutions. In just one year, we have established 
                ourselves as a trusted partner for businesses seeking digital transformation.
              </p>
              <p className="text-pretty">
                Our team combines world-class technical expertise with deep industry knowledge, 
                delivering solutions that not only meet today{"'"}s needs but anticipate tomorrow{"'"}s 
                challenges.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { value: "2025", label: "Founded" },
                { value: "Global", label: "Reach" },
              ].map((stat, i) => (
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

          {/* Right Content - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
