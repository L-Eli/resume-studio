import { NextResponse } from "next/server"
import { z } from "zod"

import { contactFormSchema } from "@/lib/contact"
import {
  getSheetsQuotaProjectForTokenSource,
  type SheetsTokenSource,
} from "@/lib/google-sheets"

export const runtime = "nodejs"

type ContactPayload = {
  name: string
  email: string
  company: string
  message: string
}

type MetadataTokenResponse = {
  access_token?: string
}

type UpstreamFailure = {
  ok: false
  error: "upstream_failed" | "upstream_unreachable"
  status?: number
  detail?: string
}

type UpstreamSuccess = {
  ok: true
}

type UpstreamResult = UpstreamSuccess | UpstreamFailure

function normalizeAccessToken(token: string) {
  return token.replace(/^Bearer\s+/i, "").trim()
}

function jsonError(status: number, body: unknown) {
  return NextResponse.json(body, { status })
}

function zodFieldErrors(err: z.ZodError) {
  const fieldErrors: Record<string, string> = {}

  for (const issue of err.issues) {
    const key = issue.path.join(".")
    if (!key) continue
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }

  return fieldErrors
}

async function readRequestBody(req: Request): Promise<Record<string, unknown>> {
  const contentType = req.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    const json = (await req.json()) as unknown
    if (json && typeof json === "object" && !Array.isArray(json)) {
      return json as Record<string, unknown>
    }
    return {}
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const fd = await req.formData()
    const out: Record<string, unknown> = {}
    for (const [k, v] of fd.entries()) out[k] = v.toString()
    return out
  }

  return {}
}

async function appendViaAppsScript(
  scriptUrl: string,
  scriptToken: string,
  payload: ContactPayload,
  userAgent: string,
): Promise<UpstreamResult> {
  const params = new URLSearchParams({
    token: scriptToken,
    name: payload.name,
    email: payload.email,
    company: payload.company,
    message: payload.message,
    userAgent,
  })

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 500)
      return {
        ok: false as const,
        error: "upstream_failed" as const,
        status: res.status,
        detail,
      }
    }

    return { ok: true as const }
  } catch {
    return { ok: false as const, error: "upstream_unreachable" as const }
  }
}

async function appendViaSheetsApi(
  spreadsheetId: string,
  range: string,
  bearerToken: string,
  quotaProject: string | undefined,
  payload: ContactPayload,
): Promise<UpstreamResult> {
  const rangePath = encodeURIComponent(range)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${rangePath}:append?valueInputOption=USER_ENTERED`

  const headers: Record<string, string> = {
    authorization: `Bearer ${bearerToken}`,
    "content-type": "application/json; charset=utf-8",
  }

  if (quotaProject) {
    headers["x-goog-user-project"] = quotaProject
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        values: [[payload.name, payload.email, payload.company, payload.message]],
      }),
    })

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 500)
      return {
        ok: false as const,
        error: "upstream_failed" as const,
        status: res.status,
        detail,
      }
    }

    return { ok: true as const }
  } catch {
    return { ok: false as const, error: "upstream_unreachable" as const }
  }
}

async function getCloudRunServiceAccountToken() {
  const metadataUrl =
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"

  try {
    const res = await fetch(metadataUrl, {
      headers: {
        "Metadata-Flavor": "Google",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as MetadataTokenResponse
    const token = data.access_token

    if (!token) {
      return null
    }

    return token
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  const scriptToken = process.env.GOOGLE_SCRIPT_TOKEN
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const spreadsheetRange = process.env.GOOGLE_SHEETS_RANGE || "Contact!A:D"
  const sheetsBearerToken = process.env.GOOGLE_SHEETS_BEARER_TOKEN
  const quotaProject = process.env.GOOGLE_QUOTA_PROJECT

  let raw: Record<string, unknown>
  try {
    raw = await readRequestBody(req)
  } catch {
    return jsonError(400, { ok: false, error: "invalid_body" })
  }

  const parsed = contactFormSchema.safeParse({
    name: raw.name,
    email: raw.email,
    company: raw.company,
    message: raw.message,
  })

  if (!parsed.success) {
    return jsonError(400, {
      ok: false,
      error: "validation_error",
      fieldErrors: zodFieldErrors(parsed.error),
    })
  }

  const userAgent = req.headers.get("user-agent") || ""

  const payload: ContactPayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || "",
    message: parsed.data.message,
  }

  if (scriptUrl && scriptToken) {
    const upstream = await appendViaAppsScript(scriptUrl, scriptToken, payload, userAgent)
    if (!upstream.ok) {
      return jsonError(502, {
        ok: false,
        error: upstream.error,
        upstreamStatus: upstream.status,
        upstreamDetail: upstream.detail,
      })
    }
    return NextResponse.json({ ok: true })
  }

  if (spreadsheetId) {
    const envBearerToken = sheetsBearerToken?.trim()
    const tokenSource: SheetsTokenSource = envBearerToken ? "env" : "metadata"
    const rawBearerToken = envBearerToken || (await getCloudRunServiceAccountToken())
    const bearerToken = rawBearerToken ? normalizeAccessToken(rawBearerToken) : null

    if (!bearerToken) {
      return jsonError(500, {
        ok: false,
        error: "server_misconfigured",
        message:
        "Set GOOGLE_SHEETS_BEARER_TOKEN for local testing, or run on Cloud Run with a service account that can call Sheets API",
      })
    }

    const sheetsQuotaProject = getSheetsQuotaProjectForTokenSource(tokenSource, quotaProject)

    const upstream = await appendViaSheetsApi(
      spreadsheetId,
      spreadsheetRange,
      bearerToken,
      sheetsQuotaProject,
      payload,
    )
    if (!upstream.ok) {
      return jsonError(502, {
        ok: false,
        error: upstream.error,
        upstreamStatus: upstream.status,
        upstreamDetail: upstream.detail,
      })
    }
    return NextResponse.json({ ok: true })
  }

  return jsonError(500, {
    ok: false,
    error: "server_misconfigured",
    message:
      "Set GOOGLE_SCRIPT_URL + GOOGLE_SCRIPT_TOKEN, or set GOOGLE_SHEETS_SPREADSHEET_ID and provide token via GOOGLE_SHEETS_BEARER_TOKEN/local or Cloud Run service account",
  })

}
