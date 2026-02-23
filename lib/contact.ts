import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .max(254, "Email is too long"),
  company: z
    .string()
    .trim()
    .min(1, "Please enter your company")
    .max(120, "Company is too long"),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .max(2000, "Message is too long"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
