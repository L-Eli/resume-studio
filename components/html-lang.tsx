"use client"

import { useEffect } from "react"

type HtmlLangProps = {
  lang: string
}

export function HtmlLang({ lang }: HtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}
