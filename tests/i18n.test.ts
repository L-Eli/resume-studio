import assert from "node:assert/strict"
import test from "node:test"

import {
  defaultLocale,
  getHomeContent,
  getLocalizedHref,
  isLocale,
  locales,
} from "../lib/i18n"

test("i18n exposes English default and Traditional Chinese homepage copy", () => {
  assert.deepEqual(locales, ["en", "zh"])
  assert.equal(defaultLocale, "en")

  const english = getHomeContent("en")
  const chinese = getHomeContent("zh")

  assert.equal(english.locale, "en")
  assert.equal(chinese.locale, "zh")
  assert.equal(english.htmlLang, "en")
  assert.equal(chinese.htmlLang, "zh-Hant")

  assert.equal(english.navigation.items[0]?.label, "Home")
  assert.equal(chinese.navigation.items[0]?.label, "首頁")
  assert.equal(chinese.hero.heading.beforeAccent, "設計與開發")
  assert.equal(chinese.hero.heading.accent, "AI 與 IT")
  assert.equal(chinese.hero.heading.afterAccent, "解決方案，服務每個產業")
  assert.equal(chinese.contact.form.submit, "送出訊息")

  assert.equal(getLocalizedHref("en", "#contact"), "/#contact")
  assert.equal(getLocalizedHref("zh", "#contact"), "/zh#contact")
})

test("isLocale only accepts configured locale segments", () => {
  assert.equal(isLocale("en"), true)
  assert.equal(isLocale("zh"), true)
  assert.equal(isLocale("zh-TW"), false)
  assert.equal(isLocale(""), false)
})
