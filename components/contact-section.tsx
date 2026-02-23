"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactFormSchema, type ContactFormValues } from "@/lib/contact"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [submitMessage, setSubmitMessage] = useState<{
    kind: "idle" | "success" | "error"
    text: string
  }>({ kind: "idle", text: "" })

  const errorTextClass = "text-[lab(56.21_94.47_98.89_/_0.98)]"
  const errorBorderClass = "aria-invalid:border-[color:lab(56.21_94.47_98.89_/_0.98)]"
  const errorFocusRingClass = "aria-invalid:focus-visible:ring-[color:lab(56.21_94.47_98.89_/_0.35)] aria-invalid:focus-visible:border-[color:lab(56.21_94.47_98.89_/_0.98)]"

  const fieldSchemas = {
    name: contactFormSchema.shape.name,
    email: contactFormSchema.shape.email,
    company: contactFormSchema.shape.company,
    message: contactFormSchema.shape.message,
  }

  const validateAll = (next: ContactFormValues) => {
    const parsed = contactFormSchema.safeParse(next)
    if (parsed.success) return { ok: true as const, errors: {} as typeof errors }

    const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key !== "string") continue
      if (key in nextErrors) continue
      nextErrors[key as keyof ContactFormValues] = issue.message
    }

    return { ok: false as const, errors: nextErrors }
  }

  const validateField = (field: keyof ContactFormValues, value: string) => {
    const parsed = fieldSchemas[field].safeParse(value)
    return parsed.success ? "" : parsed.error.issues[0]?.message || "Invalid"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitMessage({ kind: "idle", text: "" })

    const validation = validateAll(values)
    if (!validation.ok) {
      setErrors(validation.errors)
      setSubmitMessage({ kind: "error", text: "Please fix the highlighted fields." })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      })

      const data = (await res.json().catch(() => null)) as
        | null
        | { ok?: boolean; fieldErrors?: Record<string, string> }

      if (!res.ok || !data?.ok) {
        const fieldErrors = data?.fieldErrors || {}
        const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {}
        for (const [k, v] of Object.entries(fieldErrors)) {
          if (k === "name" || k === "email" || k === "company" || k === "message") {
            nextErrors[k] = v
          }
        }

        if (Object.keys(nextErrors).length) setErrors(nextErrors)
        setSubmitMessage({ kind: "error", text: "Something went wrong. Please try again." })
        return
      }

      setErrors({})
      setValues({ name: "", email: "", company: "", message: "" })
      setSubmitMessage({ kind: "success", text: "Message sent. We will get back to you soon." })
    } catch {
      setSubmitMessage({ kind: "error", text: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(45,212,191,0.05)_0%,transparent_50%)]" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-accent uppercase tracking-widest">Contact Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-balance">
              Let{"'"}s Build Something Amazing Together
            </h2>
            <p className="text-muted-foreground mb-10 text-pretty">
              Ready to transform your business with AI and IT solutions? 
              Get in touch with our team to discuss your project.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">service@ecotech.tw</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">Taiwan & Worldwide</div>
                </div>
              </motion.div>
            </div>

            {/* Social Links Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-10 pt-10 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/ecotech-tw"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg bg-secondary text-sm hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className={`bg-secondary border-border ${errorBorderClass} ${errorFocusRingClass}`}
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby="contact-name-error"
                      onChange={(e) => {
                        const v = e.target.value
                        setValues((prev) => ({ ...prev, name: v }))
                      }}
                      onBlur={(e) => {
                        const msg = validateField("name", e.target.value)
                        setErrors((prev) => ({ ...prev, name: msg || undefined }))
                      }}
                      disabled={isSubmitting}
                    />
                    <p
                      id="contact-name-error"
                      className={`mt-1 min-h-[1.25rem] text-xs ${errorTextClass}`}
                    >
                      {errors.name || ""}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      className={`bg-secondary border-border ${errorBorderClass} ${errorFocusRingClass}`}
                      value={values.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby="contact-email-error"
                      onChange={(e) => {
                        const v = e.target.value
                        setValues((prev) => ({ ...prev, email: v }))
                      }}
                      onBlur={(e) => {
                        const msg = validateField("email", e.target.value)
                        setErrors((prev) => ({ ...prev, email: msg || undefined }))
                      }}
                      disabled={isSubmitting}
                    />
                    <p
                      id="contact-email-error"
                      className={`mt-1 min-h-[1.25rem] text-xs ${errorTextClass}`}
                    >
                      {errors.email || ""}
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="text-sm text-muted-foreground mb-2 block">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Your company"
                    className={`bg-secondary border-border ${errorBorderClass} ${errorFocusRingClass}`}
                    value={values.company || ""}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby="contact-company-error"
                    onChange={(e) => {
                      const v = e.target.value
                      setValues((prev) => ({ ...prev, company: v }))
                    }}
                    onBlur={(e) => {
                      const msg = validateField("company", e.target.value)
                      setErrors((prev) => ({ ...prev, company: msg || undefined }))
                    }}
                    disabled={isSubmitting}
                  />
                  <p
                    id="contact-company-error"
                    className={`mt-1 min-h-[1.25rem] text-xs ${errorTextClass}`}
                  >
                    {errors.company || ""}
                  </p>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    className={`bg-secondary border-border resize-none ${errorBorderClass} ${errorFocusRingClass}`}
                    value={values.message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby="contact-message-error"
                    onChange={(e) => {
                      const v = e.target.value
                      setValues((prev) => ({ ...prev, message: v }))
                    }}
                    onBlur={(e) => {
                      const msg = validateField("message", e.target.value)
                      setErrors((prev) => ({ ...prev, message: msg || undefined }))
                    }}
                    disabled={isSubmitting}
                  />
                  <p
                    id="contact-message-error"
                    className={`mt-1 min-h-[1.25rem] text-xs ${errorTextClass}`}
                  >
                    {errors.message || ""}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <div className="pt-2 min-h-[1.5rem] text-sm">
                  {submitMessage.kind !== "idle" ? (
                    <span
                      className={
                        submitMessage.kind === "success"
                          ? "text-accent"
                          : errorTextClass
                      }
                    >
                      {submitMessage.text}
                    </span>
                  ) : null}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
