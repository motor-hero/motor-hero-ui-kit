interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

const navigation = [
  {
    category: "Início",
    items: [{ id: "introduction", label: "Introdução" }],
  },
  {
    category: "Layout",
    items: [{ id: "app-shell", label: "AppShell" }],
  },
  {
    category: "Componentes",
    items: [
      { id: "form-field", label: "FormField" },
      { id: "auth-card", label: "AuthCard" },
      { id: "stat-card", label: "StatCard" },
      { id: "search-input", label: "SearchInput" },
      { id: "pagination", label: "Pagination" },
      { id: "table-skeleton", label: "TableSkeleton" },
      { id: "mobile-card-list", label: "MobileCardList" },
      { id: "empty-state", label: "EmptyState" },
      { id: "page-header", label: "PageHeader" },
      { id: "status-dot", label: "StatusDot" },
      { id: "confirm-dialog", label: "ConfirmDialog" },
      { id: "mode-toggle", label: "ModeToggle" },
      { id: "responsive-data-view", label: "ResponsiveDataView" },
      { id: "toaster", label: "Toaster" },
    ],
  },
  {
    category: "Utilitários",
    items: [{ id: "utilities", label: "cn() / extractApiError()" }],
  },
  {
    category: "Hooks",
    items: [{ id: "hooks", label: "useDisclosure() / useTheme() / useCustomToast()" }],
  },
  {
    category: "Contribuindo",
    items: [{ id: "contributing", label: "Versionamento & Releases" }],
  },
]

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <nav className="space-y-6 px-4">
      {navigation.map((group) => (
        <div key={group.category}>
          <h4 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-brand">
            {group.category}
          </h4>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-all duration-200 ${
                    currentPage === item.id
                      ? "sidebar-item-active bg-brand/10 text-brand font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:translate-x-0.5"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
