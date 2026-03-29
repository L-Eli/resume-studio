import assert from "node:assert/strict"
import test from "node:test"

import { contactFormSchema } from "../lib/contact"

test("contactFormSchema accepts valid input and trims whitespace", () => {
  const parsed = contactFormSchema.parse({
    name: " Alvin ",
    email: " hello@example.com ",
    company: " Eco Tech ",
    message: " Need a solar solution ",
  })

  assert.deepStrictEqual(parsed, {
    name: "Alvin",
    email: "hello@example.com",
    company: "Eco Tech",
    message: "Need a solar solution",
  })
})

test("contactFormSchema rejects invalid email values", () => {
  const parsed = contactFormSchema.safeParse({
    name: "Alvin",
    email: "not-an-email",
    company: "Eco Tech",
    message: "Hello",
  })

  assert.equal(parsed.success, false)

  if (parsed.success) {
    throw new Error("Expected invalid email to fail validation")
  }

  assert.deepStrictEqual(parsed.error.flatten().fieldErrors.email, ["Please enter a valid email"])
})
