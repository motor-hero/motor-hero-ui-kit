interface StatusDotProps {
  active: boolean
  label?: string
  className?: string
}

export function StatusDot({ active, label, className }: StatusDotProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span
        className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`}
      />
      {label && <span>{label}</span>}
    </span>
  )
}
