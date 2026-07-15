import { type ReactElement, type ReactNode, cloneElement, isValidElement, useId } from "react"

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps) {
  const errorId = useId()

  // Wire accessibility onto the control: mark it invalid and point it at the
  // error message so screen readers announce both.
  const field =
    error && isValidElement(children)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-invalid": true,
          "aria-describedby": [
            (children.props as Record<string, unknown>)["aria-describedby"],
            errorId,
          ]
            .filter(Boolean)
            .join(" "),
        })
      : children

  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {field}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
