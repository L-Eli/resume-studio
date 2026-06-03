type LanguagePreference = {
  tag: string
  q: number
  order: number
}

function parseAcceptLanguage(acceptLanguage: string | null): LanguagePreference[] {
  if (!acceptLanguage) return []

  return acceptLanguage
    .split(",")
    .map((part, order) => {
      const [rawTag, ...rawParams] = part.trim().split(";")
      const tag = rawTag.trim().toLowerCase()
      const qParam = rawParams.map((param) => param.trim()).find((param) => param.startsWith("q="))
      const q = qParam ? Number(qParam.slice(2)) : 1

      return {
        tag,
        q: Number.isFinite(q) ? q : 0,
        order,
      }
    })
    .filter((preference) => preference.tag && preference.q > 0)
}

function isChineseLanguageTag(tag: string) {
  return tag === "zh" || tag.startsWith("zh-")
}

export function prefersChineseLanguage(acceptLanguage: string | null) {
  const [topPreference] = parseAcceptLanguage(acceptLanguage).sort((a, b) => b.q - a.q || a.order - b.order)

  return topPreference ? isChineseLanguageTag(topPreference.tag) : false
}

export function shouldRedirectToChinese(pathname: string, acceptLanguage: string | null) {
  return pathname === "/" && prefersChineseLanguage(acceptLanguage)
}
