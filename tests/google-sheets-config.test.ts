import assert from "node:assert/strict"
import test from "node:test"

import { getSheetsQuotaProjectForTokenSource } from "../lib/google-sheets"

test("omits quota project when Sheets API uses the Cloud Run metadata token", () => {
  assert.equal(getSheetsQuotaProjectForTokenSource("metadata", "ecotech-tw"), undefined)
})

test("keeps quota project for explicit local bearer tokens", () => {
  assert.equal(getSheetsQuotaProjectForTokenSource("env", " ecotech-tw "), "ecotech-tw")
})
