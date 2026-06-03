export type SheetsTokenSource = "env" | "metadata"

export function getSheetsQuotaProjectForTokenSource(
  tokenSource: SheetsTokenSource,
  quotaProject: string | undefined,
) {
  const normalizedQuotaProject = quotaProject?.trim()

  if (!normalizedQuotaProject || tokenSource === "metadata") {
    return undefined
  }

  return normalizedQuotaProject
}
