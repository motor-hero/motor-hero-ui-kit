import { toast } from "sonner"
import { useCallback } from "react"

type ToastStatus = "success" | "error" | "info" | "warning"

export function useCustomToast() {
  const showToast = useCallback(
    (title: string, description?: string, status: ToastStatus = "success") => {
      switch (status) {
        case "success":
          toast.success(title, { description })
          break
        case "error":
          toast.error(title, { description })
          break
        case "info":
          toast.info(title, { description })
          break
        case "warning":
          toast.warning(title, { description })
          break
      }
    },
    [],
  )

  return showToast
}

export { toast }
