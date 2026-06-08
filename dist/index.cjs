"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppShell: () => AppShell,
  AuthCard: () => AuthCard,
  ConfirmDialog: () => ConfirmDialog,
  DataTableWrapper: () => DataTableWrapper,
  EmptyState: () => EmptyState,
  FormDialogLayout: () => FormDialogLayout,
  FormField: () => FormField,
  MobileCardList: () => MobileCardList,
  ModeToggle: () => ModeToggle,
  PageHeader: () => PageHeader,
  Pagination: () => Pagination,
  ProgressBar: () => ProgressBar,
  ResponsiveDataView: () => ResponsiveDataView,
  RowActionsMenu: () => RowActionsMenu,
  SearchInput: () => SearchInput,
  SidebarNav: () => SidebarNav,
  StatCard: () => StatCard,
  StatusBadge: () => StatusBadge,
  StatusDot: () => StatusDot,
  TableSkeleton: () => TableSkeleton,
  ThemeProvider: () => ThemeProvider,
  Toaster: () => Toaster,
  UserMenu: () => UserMenu,
  cn: () => cn,
  defaultRenderLink: () => defaultRenderLink,
  extractApiError: () => extractApiError,
  toast: () => import_sonner2.toast,
  useCustomToast: () => useCustomToast,
  useDisclosure: () => useDisclosure,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(index_exports);

// src/components/theme-provider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var initialState = {
  theme: "system",
  setTheme: () => null
};
var ThemeProviderContext = (0, import_react.createContext)(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}) {
  const [theme, setTheme] = (0, import_react.useState)(
    () => localStorage.getItem(storageKey) || defaultTheme
  );
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProviderContext.Provider, { ...props, value, children });
}
function useTheme() {
  const context = (0, import_react.useContext)(ThemeProviderContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/components/mode-toggle.tsx
var DropdownMenu = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function ModeToggle() {
  const { setTheme } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(DropdownMenu.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        className: "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Alternar tema",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Moon, { className: "absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DropdownMenu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      DropdownMenu.Content,
      {
        align: "end",
        className: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("light"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Sun, { className: "h-4 w-4" }),
                " Claro"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("dark"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Moon, { className: "h-4 w-4" }),
                " Escuro"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            DropdownMenu.Item,
            {
              className: "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent",
              onClick: () => setTheme("system"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Monitor, { className: "h-4 w-4" }),
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
var import_jsx_runtime3 = require("react/jsx-runtime");
function EmptyState({ icon, title, description, action, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `flex flex-col items-center justify-center py-16 text-center ${className ?? ""}`, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mb-4 text-muted-foreground", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: description }),
    action && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-4", children: action })
  ] });
}

// src/components/confirm-dialog.tsx
var AlertDialog = __toESM(require("@radix-ui/react-alert-dialog"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AlertDialog.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(AlertDialog.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AlertDialog.Overlay, { className: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(AlertDialog.Content, { className: "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col space-y-2 text-center sm:text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AlertDialog.Title, { className: "text-lg font-semibold", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AlertDialog.Description, { className: "text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AlertDialog.Cancel, { className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer", children: cancelLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
function PageHeader({ title, description, action, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      className: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className ?? ""}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "truncate text-2xl font-semibold tracking-tight", children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-muted-foreground", children: description })
        ] }),
        action && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "shrink-0", children: action })
      ]
    }
  );
}

// src/components/status-dot.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function StatusDot({ active, label, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: `inline-flex items-center gap-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "span",
      {
        className: `h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: label })
  ] });
}

// src/components/status-badge.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "span",
    {
      className: `inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${classes.badge} ${className ?? ""}`,
      children: [
        dot && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: `space-y-1.5 ${className ?? ""}`, children: [
    (label || valueLabel) && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-baseline justify-between gap-2", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-sm text-muted-foreground", children: label }),
      valueLabel && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-sm font-semibold", children: valueLabel })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "div",
      {
        className: `w-full overflow-hidden rounded-full bg-muted ${sizeClasses[size]}`,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_jsx_runtime9 = require("react/jsx-runtime");
function FormField({ label, htmlFor, error, required, children, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: `space-y-2 ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "label",
      {
        htmlFor,
        className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        children: [
          label,
          required && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "ml-1 text-destructive", children: "*" })
        ]
      }
    ),
    children,
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-destructive", children: error })
  ] });
}

// src/components/form-dialog.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("form", { onSubmit, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex flex-col space-y-1.5 text-center sm:text-left", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { className: "text-lg font-semibold leading-none tracking-tight", children: title }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "space-y-4 py-4", children }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var import_jsx_runtime11 = require("react/jsx-runtime");
function AuthCard({ title, description, children, footer }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "space-y-4", children }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "mt-4", children: footer })
  ] }) });
}

// src/components/pagination.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: `flex items-center justify-end gap-4 ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "button",
      {
        type: "button",
        onClick: () => onPageChange(page - 1),
        disabled: !hasPreviousPage,
        className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        children: "Anterior"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
      "P\xE1gina ",
      page
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var import_jsx_runtime13 = require("react/jsx-runtime");
function TableSkeleton({ rows = 5, columns = 4 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_jsx_runtime13.Fragment, { children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("tr", { className: "border-b transition-colors", children: Array.from({ length: columns }).map((_2, j) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("td", { className: "p-4 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-5 w-full animate-pulse rounded bg-muted" }) }, j)) }, i)) });
}

// src/components/search-input.tsx
var React = __toESM(require("react"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
var SearchInput = React.forwardRef(
  ({ containerClassName, className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `relative flex-1 ${containerClassName ?? ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "m21 21-4.3-4.3" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
var import_jsx_runtime15 = require("react/jsx-runtime");
function StatCard({ label, value, detail, icon, isLoading }) {
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center justify-between pb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-4 w-4 animate-pulse rounded bg-muted" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mt-2 h-7 w-16 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mt-1 h-4 w-20 animate-pulse rounded bg-muted" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "rounded-lg border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center justify-between pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
      icon && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-muted-foreground", children: icon })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-2xl font-bold", children: value }),
    detail && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-xs text-muted-foreground", children: detail })
  ] });
}

// src/components/data-table-wrapper.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "overflow-x-auto rounded-md border", children }),
    !isLoading && isEmpty && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      emptyIcon && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mb-4 text-muted-foreground", children: emptyIcon }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h3", { className: "text-lg font-semibold tracking-tight", children: emptyTitle }),
      emptyDescription && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: emptyDescription })
    ] }),
    page !== void 0 && onPageChange && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center justify-end gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(page - 1),
          disabled: !hasPreviousPage,
          className: "inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { className: "text-sm text-muted-foreground", children: [
        "P\xE1gina ",
        page
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
var import_jsx_runtime17 = require("react/jsx-runtime");
function MobileCardList({
  data,
  renderCard,
  keyExtractor,
  isLoading = false,
  loadingCount = 5,
  className
}) {
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: `space-y-3 ${className ?? ""}`, children: Array.from({ length: loadingCount }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "rounded-xl border p-4", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-5 w-32 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-5 w-16 animate-pulse rounded bg-muted" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-4 w-48 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-4 w-20 animate-pulse rounded bg-muted" })
      ] })
    ] }) }, i)) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: `space-y-3 ${className ?? ""}`, children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "div",
    {
      className: "rounded-xl border p-4 transition-all duration-150 hover:border-foreground/20 active:scale-[0.99]",
      children: renderCard(item, index)
    },
    keyExtractor(item)
  )) });
}

// src/components/responsive-data-view.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "hidden overflow-x-auto rounded-md border md:block", children: table }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "md:hidden", children: cards }),
    !isLoading && isEmpty && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
      emptyIcon && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mb-4 text-muted-foreground", children: emptyIcon }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h3", { className: "text-lg font-semibold tracking-tight", children: emptyTitle }),
      emptyDescription && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: emptyDescription })
    ] }),
    pagination
  ] });
}

// src/components/toaster.tsx
var import_sonner = require("sonner");
var import_jsx_runtime19 = require("react/jsx-runtime");
function Toaster(props) {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    import_sonner.Toaster,
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
var import_lucide_react3 = require("lucide-react");
var import_react3 = require("react");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/sidebar-nav.tsx
var import_react2 = require("react");

// src/components/types.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var defaultRenderLink = ({ children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("a", { ...props, children });

// src/components/sidebar-nav.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("nav", { className: "flex flex-col gap-1", children: visible.map((item) => {
    const active = isActive(item, activePath);
    const link = renderLink({
      href: item.href,
      onClick: onNavigate,
      title: isCollapsed ? item.label : void 0,
      "aria-current": active ? "page" : void 0,
      className: cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-accent text-accent-foreground font-semibold" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
        item.icon && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "shrink-0", children: item.icon }),
        !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "truncate", children: item.label })
      ] })
    });
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react2.Fragment, { children: link }, item.href);
  }) });
}

// src/components/user-menu.tsx
var DropdownMenu2 = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime22 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(DropdownMenu2.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DropdownMenu2.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      "button",
      {
        type: "button",
        className: "inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-input bg-background text-xs font-semibold shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Menu do usu\xE1rio",
        "data-testid": "user-menu",
        children: user?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("img", { src: user.avatarUrl, alt: user.name ?? user.email ?? "Avatar", className: "h-full w-full object-cover" }) : label ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: label }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react2.User, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DropdownMenu2.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
      DropdownMenu2.Content,
      {
        align,
        sideOffset: 6,
        className: "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: [
          (user?.name || user?.email) && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "px-2 py-1.5", children: [
              user.name && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "truncate text-sm font-medium", children: user.name }),
              user.email && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "truncate text-xs text-muted-foreground", children: user.email })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DropdownMenu2.Separator, { className: "-mx-1 my-1 h-px bg-border" })
          ] }),
          items.map(
            (item) => item.href ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DropdownMenu2.Item, { asChild: true, children: renderLink({ href: item.href, className: itemClass, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
              item.icon,
              item.label
            ] }) }) }, item.label) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(DropdownMenu2.Item, { className: itemClass, onClick: item.onClick, children: [
              item.icon,
              item.label
            ] }, item.label)
          ),
          onLogout && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
            items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(DropdownMenu2.Separator, { className: "-mx-1 my-1 h-px bg-border" }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(DropdownMenu2.Item, { className: cn(itemClass, "text-destructive focus:bg-destructive/10"), onClick: onLogout, children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react2.LogOut, { className: "h-4 w-4" }),
              logoutLabel
            ] })
          ] })
        ]
      }
    ) })
  ] });
}

// src/components/app-shell.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
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
  const [collapsed, setCollapsed] = (0, import_react3.useState)(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = (0, import_react3.useState)(false);
  const nav = (isCollapsed, onNavigate) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex h-screen overflow-hidden bg-background", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "aside",
      {
        className: cn(
          "hidden shrink-0 flex-col border-r bg-card transition-all duration-300 md:flex",
          collapsed ? "w-16" : "w-60"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex h-14 shrink-0 items-center border-b px-4", children: collapsed ? brandCollapsed ?? brand : brand }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex-1 overflow-y-auto px-2 py-4", children: nav(collapsed) }),
          collapsible && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "border-t p-2", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setCollapsed((v) => !v),
              className: "flex w-full items-center justify-center rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              "aria-label": collapsed ? "Expandir menu" : "Recolher menu",
              children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react3.ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react3.ChevronLeft, { className: "h-4 w-4" })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        className: cn(
          "fixed inset-0 z-50 transition-opacity duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        ),
        onClick: () => setMobileOpen(false),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "absolute inset-0 bg-black/50" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
            "div",
            {
              className: cn(
                "absolute left-0 top-0 flex h-full w-64 flex-col border-r bg-card transition-transform duration-300",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              ),
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex h-14 shrink-0 items-center border-b px-4", children: brand }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex-1 overflow-y-auto px-2 py-4", children: nav(false, () => setMobileOpen(false)) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("header", { className: "flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setMobileOpen(true),
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:hidden",
            "aria-label": "Abrir menu",
            children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react3.Menu, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "ml-auto flex items-center gap-2", children: [
          headerActions,
          (user || onLogout) && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(UserMenu, { user, items: userMenuItems, onLogout, renderLink })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("main", { className: "flex-1 overflow-y-auto", children })
    ] })
  ] });
}

// src/components/row-actions-menu.tsx
var DropdownMenu3 = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var itemClass2 = "flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
function RowActionsMenu({
  actions,
  disabled = false,
  align = "end",
  label = "A\xE7\xF5es",
  renderLink = defaultRenderLink
}) {
  if (actions.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(DropdownMenu3.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DropdownMenu3.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      "button",
      {
        type: "button",
        disabled,
        "aria-label": label,
        className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react4.MoreVertical, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DropdownMenu3.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      DropdownMenu3.Content,
      {
        align,
        sideOffset: 6,
        className: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        children: actions.map((action) => {
          const cls = cn(itemClass2, action.destructive && "text-destructive focus:bg-destructive/10");
          return action.href ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(DropdownMenu3.Item, { asChild: true, disabled: action.disabled, children: renderLink({
            href: action.href,
            className: cls,
            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
              action.icon,
              action.label
            ] })
          }) }, action.label) : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
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
var import_react4 = require("react");
function useDisclosure(initial = false) {
  const [open, setOpen] = (0, import_react4.useState)(initial);
  const onOpen = (0, import_react4.useCallback)(() => setOpen(true), []);
  const onClose = (0, import_react4.useCallback)(() => setOpen(false), []);
  const onToggle = (0, import_react4.useCallback)(() => setOpen((v) => !v), []);
  return { open, onOpen, onClose, onToggle, setOpen };
}

// src/hooks/use-toast.ts
var import_sonner2 = require("sonner");
var import_react5 = require("react");
function useCustomToast() {
  const showToast = (0, import_react5.useCallback)(
    (title, description, status = "success") => {
      switch (status) {
        case "success":
          import_sonner2.toast.success(title, { description });
          break;
        case "error":
          import_sonner2.toast.error(title, { description });
          break;
        case "info":
          import_sonner2.toast.info(title, { description });
          break;
        case "warning":
          import_sonner2.toast.warning(title, { description });
          break;
      }
    },
    []
  );
  return showToast;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppShell,
  AuthCard,
  ConfirmDialog,
  DataTableWrapper,
  EmptyState,
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
});
//# sourceMappingURL=index.cjs.map