export function extractApiError(err: any, fallbackMessage = "Ocorreu um erro inesperado."): string {
  const detail = err?.body?.detail || err?.message
  if (Array.isArray(detail) && detail.length > 0) {
    return detail[0].msg
  }
  return detail || fallbackMessage
}
