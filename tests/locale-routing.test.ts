import assert from "node:assert/strict"
import test from "node:test"

import { shouldRedirectToChinese } from "../lib/locale-routing"

test("redirects root visitors with Chinese browser language to the Traditional Chinese page", () => {
  assert.equal(shouldRedirectToChinese("/", "zh-TW,zh;q=0.9,en-US;q=0.8"), true)
  assert.equal(shouldRedirectToChinese("/", "zh-Hant-TW,zh;q=0.9,en;q=0.7"), true)
})

test("does not redirect non-root paths or non-Chinese browser languages", () => {
  assert.equal(shouldRedirectToChinese("/zh", "zh-TW,zh;q=0.9,en-US;q=0.8"), false)
  assert.equal(shouldRedirectToChinese("/api/contact", "zh-TW,zh;q=0.9,en-US;q=0.8"), false)
  assert.equal(shouldRedirectToChinese("/", "en-US,en;q=0.9"), false)
  assert.equal(shouldRedirectToChinese("/", null), false)
})

test("does not redirect Chinese browser languages after an explicit English preference", () => {
  assert.equal(shouldRedirectToChinese("/", "zh-TW,zh;q=0.9,en-US;q=0.8", "en"), false)
})
