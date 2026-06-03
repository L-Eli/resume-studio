import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { localePreferenceCookie, shouldRedirectToChinese } from "@/lib/locale-routing"

export function proxy(request: NextRequest) {
  const explicitLocale =
    request.nextUrl.searchParams.get("lang") || request.cookies.get(localePreferenceCookie)?.value

  if (shouldRedirectToChinese(
    request.nextUrl.pathname,
    request.headers.get("accept-language"),
    explicitLocale,
  )) {
    const url = request.nextUrl.clone()
    url.pathname = "/zh"
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", request.nextUrl.pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (request.nextUrl.searchParams.get("lang") === "en") {
    response.cookies.set(localePreferenceCookie, "en", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    })
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
