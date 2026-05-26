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
        className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Alternar tema",
        children: [
          /* @__PURE__ */ jsx2(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
          /* @__PURE__ */ jsx2(Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
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
  return /* @__PURE__ */ jsxs4("div", { className: `flex items-center justify-between ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx5("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ jsx5("p", { className: "text-sm text-muted-foreground", children: description })
    ] }),
    action && /* @__PURE__ */ jsx5("div", { children: action })
  ] });
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

// src/components/form-field.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function FormField({ label, htmlFor, error, required, children, className }) {
  return /* @__PURE__ */ jsxs6("div", { className: `space-y-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxs6(
      "label",
      {
        htmlFor,
        className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        children: [
          label,
          required && /* @__PURE__ */ jsx7("span", { className: "ml-1 text-destructive", children: "*" })
        ]
      }
    ),
    children,
    error && /* @__PURE__ */ jsx7("p", { className: "text-sm text-destructive", children: error })
  ] });
}

// src/components/form-dialog.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs7("form", { onSubmit, children: [
    /* @__PURE__ */ jsx8("div", { className: "flex flex-col space-y-1.5 text-center sm:text-left", children: /* @__PURE__ */ jsx8("h2", { className: "text-lg font-semibold leading-none tracking-tight", children: title }) }),
    /* @__PURE__ */ jsx8("div", { className: "space-y-4 py-4", children }),
    /* @__PURE__ */ jsxs7("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ jsx8(
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

// src/components/auth-card.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function AuthCard({ title, description, children, footer }) {
  return /* @__PURE__ */ jsx9("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs8("div", { className: "w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxs8("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsx9("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ jsx9("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx9("div", { className: "space-y-4", children }),
    footer && /* @__PURE__ */ jsx9("div", { className: "mt-4", children: footer })
  ] }) });
}

// src/components/pagination.tsx
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }) {
  return /* @__PURE__ */ jsxs9("div", { className: `flex items-center justify-end gap-4 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx10(
      "button",
      {
        type: "button",
        onClick: () => onPageChange(page - 1),
        disabled: !hasPreviousPage,
        className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        children: "Anterior"
      }
    ),
    /* @__PURE__ */ jsxs9("span", { className: "text-sm text-muted-foreground", children: [
      "P\xE1gina ",
      page
    ] }),
    /* @__PURE__ */ jsx10(
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
import { Fragment, jsx as jsx11 } from "react/jsx-runtime";
function TableSkeleton({ rows = 5, columns = 4 }) {
  return /* @__PURE__ */ jsx11(Fragment, { children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsx11("tr", { className: "border-b transition-colors", children: Array.from({ length: columns }).map((_2, j) => /* @__PURE__ */ jsx11("td", { className: "p-4 align-middle", children: /* @__PURE__ */ jsx11("div", { className: "h-5 w-full animate-pulse rounded bg-muted" }) }, j)) }, i)) });
}

// src/components/search-input.tsx
import * as React from "react";
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var SearchInput = React.forwardRef(
  ({ containerClassName, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs10("div", { className: `relative flex-1 ${containerClassName ?? ""}`, children: [
      /* @__PURE__ */ jsxs10(
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
            /* @__PURE__ */ jsx12("circle", { cx: "11", cy: "11", r: "8" }),
            /* @__PURE__ */ jsx12("path", { d: "m21 21-4.3-4.3" })
          ]
        }
      ),
      /* @__PURE__ */ jsx12(
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
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function StatCard({ label, value, detail, icon, isLoading }) {
  if (isLoading) {
    return /* @__PURE__ */ jsxs11("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx13("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ jsx13("div", { className: "h-4 w-4 animate-pulse rounded bg-muted" })
      ] }),
      /* @__PURE__ */ jsx13("div", { className: "mt-2 h-7 w-16 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsx13("div", { className: "mt-1 h-4 w-20 animate-pulse rounded bg-muted" })
    ] });
  }
  return /* @__PURE__ */ jsxs11("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsx13("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
      icon && /* @__PURE__ */ jsx13("span", { className: "text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ jsx13("div", { className: "text-2xl font-bold", children: value }),
    detail && /* @__PURE__ */ jsx13("p", { className: "text-xs text-muted-foreground", children: detail })
  ] });
}

// src/components/data-table-wrapper.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs12("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx14("div", { className: "overflow-x-auto rounded-md border", children }),
    !isLoading && isEmpty && /* @__PURE__ */ jsxs12("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      emptyIcon && /* @__PURE__ */ jsx14("div", { className: "mb-4 text-muted-foreground", children: emptyIcon }),
      /* @__PURE__ */ jsx14("h3", { className: "text-lg font-semibold tracking-tight", children: emptyTitle }),
      emptyDescription && /* @__PURE__ */ jsx14("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: emptyDescription })
    ] }),
    page !== void 0 && onPageChange && /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-end gap-4", children: [
      /* @__PURE__ */ jsx14(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(page - 1),
          disabled: !hasPreviousPage,
          className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxs12("span", { className: "text-sm text-muted-foreground", children: [
        "P\xE1gina ",
        page
      ] }),
      /* @__PURE__ */ jsx14(
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

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
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
import { useCallback, useState as useState2 } from "react";
function useDisclosure(initial = false) {
  const [open, setOpen] = useState2(initial);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((v) => !v), []);
  return { open, onOpen, onClose, onToggle, setOpen };
}
export {
  AuthCard,
  ConfirmDialog,
  DataTableWrapper,
  EmptyState,
  FormDialogLayout,
  FormField,
  ModeToggle,
  PageHeader,
  Pagination,
  SearchInput,
  StatCard,
  StatusDot,
  TableSkeleton,
  ThemeProvider,
  cn,
  extractApiError,
  useDisclosure,
  useTheme
};
//# sourceMappingURL=index.js.map