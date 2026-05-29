interface Prop {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Prop</th>
            <th className="px-4 py-3 text-left font-medium">Tipo</th>
            <th className="px-4 py-3 text-left font-medium">Padrao</th>
            <th className="px-4 py-3 text-left font-medium">Descricao</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b last:border-0">
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{prop.name}</code>
                {prop.required && <span className="ml-1 text-xs text-destructive">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{prop.default ?? "\u2014"}</td>
              <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
