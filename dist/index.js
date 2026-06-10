// src/components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var initialState = {
  theme: "system",
  setTheme: () => null
};
var ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      localStorage.setItem(storageKey, theme2);
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/components/mode-toggle.tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Moon, Sun, Monitor } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function ModeToggle() {
  const { setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu.Root, { children: [
    /* @__PURE__ */ jsx2(DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Alternar tema",
        children: [
          /* @__PURE__ */ jsx2(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
          /* @__PURE__ */ jsx2(Moon, { className: "absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx2(DropdownMenu.Portal, { children: /* @__PURE__ */ jsxs(
      DropdownMenu.Content,
      {
        align: "end",
        className: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: [
          /* @__PURE__ */ jsxs(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("light"),
              children: [
                /* @__PURE__ */ jsx2(Sun, { className: "h-4 w-4" }),
                " Claro"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("dark"),
              children: [
                /* @__PURE__ */ jsx2(Moon, { className: "h-4 w-4" }),
                " Escuro"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("system"),
              children: [
                /* @__PURE__ */ jsx2(Monitor, { className: "h-4 w-4" }),
                " Sistema"
              ]
            }
          )
        ]
      }
    ) })
  ] });
}

// src/components/empty-state.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function EmptyState({ icon, title, description, action, className }) {
  return /* @__PURE__ */ jsxs2("div", { className: `flex flex-col items-center justify-center py-16 text-center ${className ?? ""}`, children: [
    icon && /* @__PURE__ */ jsx3("div", { className: "mb-4 text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsx3("h3", { className: "text-lg font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx3("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: description }),
    action && /* @__PURE__ */ jsx3("div", { className: "mt-4", children: action })
  ] });
}

// src/components/confirm-dialog.tsx
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  variant = "default"
}) {
  return /* @__PURE__ */ jsx4(AlertDialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs3(AlertDialog.Portal, { children: [
    /* @__PURE__ */ jsx4(AlertDialog.Overlay, { className: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ jsxs3(AlertDialog.Content, { className: "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col space-y-2 text-center sm:text-left", children: [
        /* @__PURE__ */ jsx4(AlertDialog.Title, { className: "text-lg font-semibold", children: title }),
        /* @__PURE__ */ jsx4(AlertDialog.Description, { className: "text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ jsx4(AlertDialog.Cancel, { className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer", children: cancelLabel }),
        /* @__PURE__ */ jsx4(
          AlertDialog.Action,
          {
            onClick: onConfirm,
            disabled: loading,
            className: `inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
            children: loading ? "Aguarde..." : confirmLabel
          }
        )
      ] })
    ] })
  ] }) });
}

// src/components/page-header.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function PageHeader({ title, description, action, className }) {
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx5("h1", { className: "truncate text-2xl font-semibold tracking-tight", children: title }),
          description && /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: description })
        ] }),
        action && /* @__PURE__ */ jsx5("div", { className: "shrink-0", children: action })
      ]
    }
  );
}

// src/components/status-dot.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function StatusDot({ active, label, className }) {
  return /* @__PURE__ */ jsxs5("span", { className: `inline-flex items-center gap-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx6(
      "span",
      {
        className: `h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`
      }
    ),
    label && /* @__PURE__ */ jsx6("span", { children: label })
  ] });
}

// src/components/status-badge.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var variantClasses = {
  neutral: {
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    dot: "bg-gray-400"
  },
  info: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    dot: "bg-blue-500"
  },
  success: {
    badge: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    dot: "bg-green-500"
  },
  danger: {
    badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    dot: "bg-red-500"
  },
  warning: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    dot: "bg-amber-500"
  }
};
function StatusBadge({
  variant = "neutral",
  dot = true,
  className,
  children
}) {
  const classes = variantClasses[variant];
  return /* @__PURE__ */ jsxs6(
    "span",
    {
      className: `inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${classes.badge} ${className ?? ""}`,
      children: [
        dot && /* @__PURE__ */ jsx7(
          "span",
          {
            className: `inline-block h-1.5 w-1.5 shrink-0 rounded-full ${classes.dot}`
          }
        ),
        children
      ]
    }
  );
}

// src/components/progress-bar.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "h-1.5",
  md: "h-2"
};
function ProgressBar({
  value,
  size = "md",
  label,
  valueLabel,
  className,
  indicatorClassName
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsxs7("div", { className: `space-y-1.5 ${className ?? ""}`, children: [
    (label || valueLabel) && /* @__PURE__ */ jsxs7("div", { className: "flex items-baseline justify-between gap-2", children: [
      label && /* @__PURE__ */ jsx8("span", { className: "text-sm text-muted-foreground", children: label }),
      valueLabel && /* @__PURE__ */ jsx8("span", { className: "text-sm font-semibold", children: valueLabel })
    ] }),
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: `w-full overflow-hidden rounded-full bg-muted ${sizeClasses[size]}`,
        children: /* @__PURE__ */ jsx8(
          "div",
          {
            className: `h-full rounded-full transition-all duration-300 ${indicatorClassName ?? "bg-primary"}`,
            style: { width: `${clamped}%` }
          }
        )
      }
    )
  ] });
}

// src/components/form-field.tsx
import { cloneElement, isValidElement, useId } from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function FormField({ label, htmlFor, error, required, children, className }) {
  const errorId = useId();
  const field = error && isValidElement(children) ? cloneElement(children, {
    "aria-invalid": true,
    "aria-describedby": [
      children.props["aria-describedby"],
      errorId
    ].filter(Boolean).join(" ")
  }) : children;
  return /* @__PURE__ */ jsxs8("div", { className: `space-y-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxs8(
      "label",
      {
        htmlFor,
        className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        children: [
          label,
          required && /* @__PURE__ */ jsx9("span", { className: "ml-1 text-destructive", children: "*" })
        ]
      }
    ),
    field,
    error && /* @__PURE__ */ jsx9("p", { id: errorId, className: "text-sm text-destructive", children: error })
  ] });
}

// src/components/form-dialog.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/form-dialog.tsx
import { Fragment, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function FormDialogLayout({
  title,
  children,
  onSubmit,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  onCancel,
  isSubmitting = false,
  isDisabled = false
}) {
  return /* @__PURE__ */ jsxs9("form", { onSubmit, children: [
    /* @__PURE__ */ jsx10("div", { className: "flex flex-col space-y-1.5 text-center sm:text-left", children: /* @__PURE__ */ jsx10("h2", { className: "text-lg font-semibold leading-none tracking-tight", children: title }) }),
    /* @__PURE__ */ jsx10("div", { className: "space-y-4 py-4", children }),
    /* @__PURE__ */ jsxs9("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ jsx10(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ jsx10(
        "button",
        {
          type: "submit",
          disabled: isSubmitting || isDisabled,
          className: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: isSubmitting ? "Salvando..." : submitLabel
        }
      )
    ] })
  ] });
}
var sizeClasses2 = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl"
};
function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  onSubmit,
  size = "lg",
  className
}) {
  React.useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);
  const body = /* @__PURE__ */ jsxs9(Fragment, { children: [
    /* @__PURE__ */ jsxs9("div", { className: "flex shrink-0 items-start justify-between gap-4 border-b px-6 py-3", children: [
      /* @__PURE__ */ jsxs9("div", { className: "min-w-0 space-y-1", children: [
        /* @__PURE__ */ jsx10(Dialog.Title, { className: "text-lg font-semibold leading-none tracking-tight", children: title }),
        description && /* @__PURE__ */ jsx10(Dialog.Description, { className: "text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsx10(
        Dialog.Close,
        {
          className: "-mr-1 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "aria-label": "Fechar",
          children: /* @__PURE__ */ jsx10(X, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-4", children }),
    footer && /* @__PURE__ */ jsx10("div", { className: "flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-3 sm:flex-row sm:justify-end", children: footer })
  ] });
  return /* @__PURE__ */ jsx10(Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs9(Dialog.Portal, { children: [
    /* @__PURE__ */ jsx10(Dialog.Overlay, { className: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ jsx10(
      Dialog.Content,
      {
        onCloseAutoFocus: () => {
          document.body.style.pointerEvents = "";
        },
        className: cn(
          "fixed z-50 flex max-h-[92vh] flex-col bg-background shadow-lg outline-none",
          "inset-x-0 bottom-0 rounded-t-2xl",
          "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[92vh] sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          sizeClasses2[size],
          className
        ),
        children: onSubmit ? /* @__PURE__ */ jsx10(
          "form",
          {
            onSubmit,
            className: "flex min-h-0 flex-1 flex-col",
            children: body
          }
        ) : body
      }
    )
  ] }) });
}

// src/components/auth-card.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function AuthCard({ title, description, children, footer }) {
  return /* @__PURE__ */ jsx11("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs10("div", { className: "w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxs10("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsx11("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ jsx11("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx11("div", { className: "space-y-4", children }),
    footer && /* @__PURE__ */ jsx11("div", { className: "mt-4", children: footer })
  ] }) });
}

// src/components/pagination.tsx
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }) {
  return /* @__PURE__ */ jsxs11("div", { className: `flex items-center justify-end gap-4 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        onClick: () => onPageChange(page - 1),
        disabled: !hasPreviousPage,
        className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        children: "Anterior"
      }
    ),
    /* @__PURE__ */ jsxs11("span", { className: "text-sm text-muted-foreground", children: [
      "P\xE1gina ",
      page
    ] }),
    /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        onClick: () => onPageChange(page + 1),
        disabled: !hasNextPage,
        className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        children: "Pr\xF3ximo"
      }
    )
  ] });
}

// src/components/table-skeleton.tsx
import { Fragment as Fragment2, jsx as jsx13 } from "react/jsx-runtime";
function TableSkeleton({ rows = 5, columns = 4 }) {
  return /* @__PURE__ */ jsx13(Fragment2, { children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsx13("tr", { className: "border-b transition-colors", children: Array.from({ length: columns }).map((_2, j) => /* @__PURE__ */ jsx13("td", { className: "p-4 align-middle", children: /* @__PURE__ */ jsx13("div", { className: "h-5 w-full animate-pulse rounded bg-muted" }) }, j)) }, i)) });
}

// src/components/search-input.tsx
import * as React2 from "react";
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var SearchInput = React2.forwardRef(
  ({ containerClassName, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs12("div", { className: `relative flex-1 ${containerClassName ?? ""}`, children: [
      /* @__PURE__ */ jsxs12(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsx14("circle", { cx: "11", cy: "11", r: "8" }),
            /* @__PURE__ */ jsx14("path", { d: "m21 21-4.3-4.3" })
          ]
        }
      ),
      /* @__PURE__ */ jsx14(
        "input",
        {
          ref,
          type: "text",
          className: `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`,
          ...props
        }
      )
    ] });
  }
);
SearchInput.displayName = "SearchInput";

// src/components/stat-card.tsx
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
function StatCard({ label, value, detail, icon, isLoading }) {
  if (isLoading) {
    return /* @__PURE__ */ jsxs13("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx15("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ jsx15("div", { className: "h-4 w-4 animate-pulse rounded bg-muted" })
      ] }),
      /* @__PURE__ */ jsx15("div", { className: "mt-2 h-7 w-16 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx15("div", { className: "mt-1 h-4 w-20 animate-pulse rounded bg-muted" })
    ] });
  }
  return /* @__PURE__ */ jsxs13("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsx15("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
      icon && /* @__PURE__ */ jsx15("span", { className: "text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsx15("div", { className: "text-2xl font-bold", children: value }),
    detail && /* @__PURE__ */ jsx15("p", { className: "text-xs text-muted-foreground", children: detail })
  ] });
}

// src/components/data-table-wrapper.tsx
import { jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
function DataTableWrapper({
  children,
  isEmpty,
  isLoading,
  emptyIcon,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription,
  page,
  onPageChange,
  hasNextPage = false,
  hasPreviousPage = false
}) {
  return /* @__PURE__ */ jsxs14("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx16("div", { className: "overflow-x-auto rounded-md border", children }),
    !isLoading && isEmpty && /* @__PURE__ */ jsxs14("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      emptyIcon && /* @__PURE__ */ jsx16("div", { className: "mb-4 text-muted-foreground", children: emptyIcon }),
      /* @__PURE__ */ jsx16("h3", { className: "text-lg font-semibold tracking-tight", children: emptyTitle }),
      emptyDescription && /* @__PURE__ */ jsx16("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: emptyDescription })
    ] }),
    page !== void 0 && onPageChange && /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-end gap-4", children: [
      /* @__PURE__ */ jsx16(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(page - 1),
          disabled: !hasPreviousPage,
          className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxs14("span", { className: "text-sm text-muted-foreground", children: [
        "P\xE1gina ",
        page
      ] }),
      /* @__PURE__ */ jsx16(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(page + 1),
          disabled: !hasNextPage,
          className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: "Pr\xF3ximo"
        }
      )
    ] })
  ] });
}

// src/components/mobile-card-list.tsx
import { useRef } from "react";
import { jsx as jsx17, jsxs as jsxs15 } from "react/jsx-runtime";
var SCROLL_THRESHOLD = 8;
function MobileCardList({
  data,
  renderCard,
  keyExtractor,
  isLoading = false,
  loadingCount = 5,
  className
}) {
  const start = useRef(null);
  const scrolled = useRef(false);
  const onTouchStart = (e) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
    scrolled.current = false;
  };
  const onTouchMove = (e) => {
    if (!start.current) return;
    const t = e.touches[0];
    if (Math.abs(t.clientX - start.current.x) > SCROLL_THRESHOLD || Math.abs(t.clientY - start.current.y) > SCROLL_THRESHOLD) {
      scrolled.current = true;
    }
  };
  const onClickCapture = (e) => {
    if (scrolled.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx17("div", { className: `space-y-3 ${className ?? ""}`, children: Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ jsx17("div", { className: "rounded-xl border p-4", children: /* @__PURE__ */ jsxs15("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs15("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx17("div", { className: "h-5 w-32 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ jsx17("div", { className: "h-5 w-16 animate-pulse rounded bg-muted" })
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "h-4 w-48 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsxs15("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx17("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ jsx17("div", { className: "h-4 w-20 animate-pulse rounded bg-muted" })
      ] })
    ] }) }, i)) });
  }
  return /* @__PURE__ */ jsx17(
    "div",
    {
      className: `space-y-3 ${className ?? ""}`,
      onTouchStart,
      onTouchMove,
      onClickCapture,
      children: data.map((item, index) => /* @__PURE__ */ jsx17(
        "div",
        {
          className: "rounded-xl border p-4 transition-all duration-150 hover:border-foreground/20 active:scale-[0.99]",
          children: renderCard(item, index)
        },
        keyExtractor(item)
      ))
    }
  );
}

// src/components/responsive-data-view.tsx
import { jsx as jsx18, jsxs as jsxs16 } from "react/jsx-runtime";
function ResponsiveDataView({
  table,
  cards,
  isEmpty,
  isLoading,
  emptyIcon,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription,
  pagination
}) {
  return /* @__PURE__ */ jsxs16("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx18("div", { className: "hidden overflow-x-auto rounded-md border md:block", children: table }),
    /* @__PURE__ */ jsx18("div", { className: "md:hidden", children: cards }),
    !isLoading && isEmpty && /* @__PURE__ */ jsxs16("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      emptyIcon && /* @__PURE__ */ jsx18("div", { className: "mb-4 text-muted-foreground", children: emptyIcon }),
      /* @__PURE__ */ jsx18("h3", { className: "text-lg font-semibold tracking-tight", children: emptyTitle }),
      emptyDescription && /* @__PURE__ */ jsx18("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: emptyDescription })
    ] }),
    pagination
  ] });
}

// src/components/toaster.tsx
import { Toaster as Sonner } from "sonner";
import { jsx as jsx19 } from "react/jsx-runtime";
function Toaster(props) {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx19(
    Sonner,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-md",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:!bg-background group-[.toaster]:!text-foreground group-[.toaster]:!border-success/40",
          error: "group-[.toaster]:!bg-background group-[.toaster]:!text-foreground group-[.toaster]:!border-destructive/40"
        }
      },
      ...props
    }
  );
}

// src/components/app-shell.tsx
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState as useState2 } from "react";

// src/components/sidebar-nav.tsx
import { Fragment as Fragment3 } from "react";

// src/components/types.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var defaultRenderLink = ({ children, ...props }) => /* @__PURE__ */ jsx20("a", { ...props, children });

// src/components/sidebar-nav.tsx
import { Fragment as Fragment4, jsx as jsx21, jsxs as jsxs17 } from "react/jsx-runtime";
function defaultIsActive(item, activePath) {
  if (item.href === "/") return activePath === "/";
  return activePath === item.href || activePath.startsWith(item.href + "/");
}
function SidebarNav({
  items,
  activePath,
  isActive = defaultIsActive,
  isAdmin = false,
  isCollapsed = false,
  renderLink = defaultRenderLink,
  onNavigate
}) {
  const visible = items.filter((item) => !item.adminOnly || isAdmin);
  return /* @__PURE__ */ jsx21("nav", { className: "flex flex-col gap-1", children: visible.map((item) => {
    const active = isActive(item, activePath);
    const link = renderLink({
      href: item.href,
      onClick: onNavigate,
      title: isCollapsed ? item.label : void 0,
      "aria-current": active ? "page" : void 0,
      className: cn(
        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2"
      ),
      children: /* @__PURE__ */ jsxs17(Fragment4, { children: [
        item.icon && /* @__PURE__ */ jsx21("span", { className: "shrink-0", children: item.icon }),
        !isCollapsed && /* @__PURE__ */ jsx21("span", { className: "truncate", children: item.label })
      ] })
    });
    return /* @__PURE__ */ jsx21(Fragment3, { children: link }, item.href);
  }) });
}

// src/components/user-menu.tsx
import * as DropdownMenu2 from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Fragment as Fragment5, jsx as jsx22, jsxs as jsxs18 } from "react/jsx-runtime";
function initials(user) {
  const source = user?.name?.trim() || user?.email?.trim();
  if (!source) return "";
  const parts = source.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}
var itemClass = "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent";
function UserMenu({
  user,
  items = [],
  onLogout,
  logoutLabel = "Sair",
  renderLink = defaultRenderLink,
  align = "end"
}) {
  const label = initials(user);
  return /* @__PURE__ */ jsxs18(DropdownMenu2.Root, { children: [
    /* @__PURE__ */ jsx22(DropdownMenu2.Trigger, { asChild: true, children: /* @__PURE__ */ jsx22(
      "button",
      {
        type: "button",
        className: "inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-input bg-background text-xs font-semibold shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Menu do usu\xE1rio",
        "data-testid": "user-menu",
        children: user?.avatarUrl ? /* @__PURE__ */ jsx22("img", { src: user.avatarUrl, alt: user.name ?? user.email ?? "Avatar", className: "h-full w-full object-cover" }) : label ? /* @__PURE__ */ jsx22("span", { children: label }) : /* @__PURE__ */ jsx22(User, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ jsx22(DropdownMenu2.Portal, { children: /* @__PURE__ */ jsxs18(
      DropdownMenu2.Content,
      {
        align,
        sideOffset: 6,
        className: "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: [
          (user?.name || user?.email) && /* @__PURE__ */ jsxs18(Fragment5, { children: [
            /* @__PURE__ */ jsxs18("div", { className: "px-2 py-1.5", children: [
              user.name && /* @__PURE__ */ jsx22("p", { className: "truncate text-sm font-medium", children: user.name }),
              user.email && /* @__PURE__ */ jsx22("p", { className: "truncate text-xs text-muted-foreground", children: user.email })
            ] }),
            /* @__PURE__ */ jsx22(DropdownMenu2.Separator, { className: "-mx-1 my-1 h-px bg-border" })
          ] }),
          items.map(
            (item) => item.href ? /* @__PURE__ */ jsx22(DropdownMenu2.Item, { asChild: true, children: renderLink({ href: item.href, className: itemClass, children: /* @__PURE__ */ jsxs18(Fragment5, { children: [
              item.icon,
              item.label
            ] }) }) }, item.label) : /* @__PURE__ */ jsxs18(DropdownMenu2.Item, { className: itemClass, onClick: item.onClick, children: [
              item.icon,
              item.label
            ] }, item.label)
          ),
          onLogout && /* @__PURE__ */ jsxs18(Fragment5, { children: [
            items.length > 0 && /* @__PURE__ */ jsx22(DropdownMenu2.Separator, { className: "-mx-1 my-1 h-px bg-border" }),
            /* @__PURE__ */ jsxs18(DropdownMenu2.Item, { className: cn(itemClass, "text-destructive focus:bg-destructive/10"), onClick: onLogout, children: [
              /* @__PURE__ */ jsx22(LogOut, { className: "h-4 w-4" }),
              logoutLabel
            ] })
          ] })
        ]
      }
    ) })
  ] });
}

// src/components/app-shell.tsx
import { jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
function AppShell({
  brand,
  brandCollapsed,
  navItems,
  activePath,
  isActive,
  isAdmin = false,
  user,
  userMenuItems,
  onLogout,
  renderLink = defaultRenderLink,
  headerActions,
  collapsible = true,
  defaultCollapsed = false,
  children
}) {
  const [collapsed, setCollapsed] = useState2(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState2(false);
  const nav = (isCollapsed, onNavigate) => /* @__PURE__ */ jsx23(
    SidebarNav,
    {
      items: navItems,
      activePath,
      isActive,
      isAdmin,
      isCollapsed,
      renderLink,
      onNavigate
    }
  );
  return /* @__PURE__ */ jsxs19("div", { className: "flex h-screen overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxs19(
      "aside",
      {
        className: cn(
          "hidden shrink-0 flex-col border-r bg-card transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-60"
        ),
        children: [
          /* @__PURE__ */ jsx23("div", { className: "flex h-14 shrink-0 items-center border-b px-4", children: collapsed ? brandCollapsed ?? brand : brand }),
          /* @__PURE__ */ jsx23("div", { className: "flex-1 overflow-y-auto px-2 py-4", children: nav(collapsed) }),
          collapsible && /* @__PURE__ */ jsx23("div", { className: "border-t p-2", children: /* @__PURE__ */ jsx23(
            "button",
            {
              type: "button",
              onClick: () => setCollapsed((v) => !v),
              className: "flex w-full items-center justify-center rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              "aria-label": collapsed ? "Expandir menu" : "Recolher menu",
              children: collapsed ? /* @__PURE__ */ jsx23(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx23(ChevronLeft, { className: "h-4 w-4" })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs19(
      "div",
      {
        className: cn(
          "fixed inset-0 z-50 transition-opacity duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        ),
        onClick: () => setMobileOpen(false),
        children: [
          /* @__PURE__ */ jsx23("div", { className: "absolute inset-0 bg-black/50" }),
          /* @__PURE__ */ jsxs19(
            "div",
            {
              className: cn(
                "absolute left-0 top-0 flex h-full w-64 flex-col border-r bg-card transition-transform duration-300",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              ),
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsx23("div", { className: "flex h-14 shrink-0 items-center border-b px-4", children: brand }),
                /* @__PURE__ */ jsx23("div", { className: "flex-1 overflow-y-auto px-2 py-4", children: nav(false, () => setMobileOpen(false)) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs19("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxs19("header", { className: "flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4", children: [
        /* @__PURE__ */ jsx23(
          "button",
          {
            type: "button",
            onClick: () => setMobileOpen(true),
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:hidden",
            "aria-label": "Abrir menu",
            children: /* @__PURE__ */ jsx23(Menu, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs19("div", { className: "ml-auto flex items-center gap-2", children: [
          headerActions,
          (user || onLogout) && /* @__PURE__ */ jsx23(UserMenu, { user, items: userMenuItems, onLogout, renderLink })
        ] })
      ] }),
      /* @__PURE__ */ jsx23("main", { className: "flex-1 overflow-y-auto", children })
    ] })
  ] });
}

// src/components/row-actions-menu.tsx
import * as DropdownMenu3 from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Fragment as Fragment6, jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
var itemClass2 = "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
function RowActionsMenu({
  actions,
  disabled = false,
  align = "end",
  label = "A\xE7\xF5es",
  renderLink = defaultRenderLink
}) {
  if (actions.length === 0) return null;
  return /* @__PURE__ */ jsxs20(DropdownMenu3.Root, { children: [
    /* @__PURE__ */ jsx24(DropdownMenu3.Trigger, { asChild: true, children: /* @__PURE__ */ jsx24(
      "button",
      {
        type: "button",
        disabled,
        "aria-label": label,
        className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        children: /* @__PURE__ */ jsx24(MoreVertical, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ jsx24(DropdownMenu3.Portal, { children: /* @__PURE__ */ jsx24(
      DropdownMenu3.Content,
      {
        align,
        sideOffset: 6,
        className: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: actions.map((action) => {
          const cls = cn(itemClass2, action.destructive && "text-destructive focus:bg-destructive/10");
          return action.href ? /* @__PURE__ */ jsx24(DropdownMenu3.Item, { asChild: true, disabled: action.disabled, children: renderLink({
            href: action.href,
            className: cls,
            children: /* @__PURE__ */ jsxs20(Fragment6, { children: [
              action.icon,
              action.label
            ] })
          }) }, action.label) : /* @__PURE__ */ jsxs20(
            DropdownMenu3.Item,
            {
              className: cls,
              disabled: action.disabled,
              onClick: action.onClick,
              children: [
                action.icon,
                action.label
              ]
            },
            action.label
          );
        })
      }
    ) })
  ] });
}

// src/lib/api-error.ts
function extractApiError(err, fallbackMessage = "Ocorreu um erro inesperado.") {
  const detail = err?.body?.detail || err?.message;
  if (Array.isArray(detail) && detail.length > 0) {
    return detail[0].msg;
  }
  return detail || fallbackMessage;
}

// src/hooks/use-disclosure.ts
import { useCallback, useState as useState3 } from "react";
function useDisclosure(initial = false) {
  const [open, setOpen] = useState3(initial);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((v) => !v), []);
  return { open, onOpen, onClose, onToggle, setOpen };
}

// src/hooks/use-toast.ts
import { toast } from "sonner";
import { useCallback as useCallback2 } from "react";
function useCustomToast() {
  const showToast = useCallback2(
    (title, description, status = "success") => {
      switch (status) {
        case "success":
          toast.success(title, { description });
          break;
        case "error":
          toast.error(title, { description });
          break;
        case "info":
          toast.info(title, { description });
          break;
        case "warning":
          toast.warning(title, { description });
          break;
      }
    },
    []
  );
  return showToast;
}
export {
  AppShell,
  AuthCard,
  ConfirmDialog,
  DataTableWrapper,
  EmptyState,
  FormDialog,
  FormDialogLayout,
  FormField,
  MobileCardList,
  ModeToggle,
  PageHeader,
  Pagination,
  ProgressBar,
  ResponsiveDataView,
  RowActionsMenu,
  SearchInput,
  SidebarNav,
  StatCard,
  StatusBadge,
  StatusDot,
  TableSkeleton,
  ThemeProvider,
  Toaster,
  UserMenu,
  cn,
  defaultRenderLink,
  extractApiError,
  toast,
  useCustomToast,
  useDisclosure,
  useTheme
};
//# sourceMappingURL=index.js.map