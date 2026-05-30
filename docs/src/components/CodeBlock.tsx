import { useEffect, useRef, useState } from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import bash from "highlight.js/lib/languages/bash"
import json from "highlight.js/lib/languages/json"

hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("tsx", typescript)
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("json", json)

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted")
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute right-3 top-2 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="code-block">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
