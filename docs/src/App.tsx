import { useState } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Introduction } from "./pages/Introduction"
import { FormFieldPage } from "./pages/FormFieldPage"
import { AuthCardPage } from "./pages/AuthCardPage"
import { StatCardPage } from "./pages/StatCardPage"
import { SearchInputPage } from "./pages/SearchInputPage"
import { PaginationPage } from "./pages/PaginationPage"
import { TableSkeletonPage } from "./pages/TableSkeletonPage"
import { MobileCardListPage } from "./pages/MobileCardListPage"
import { EmptyStatePage } from "./pages/EmptyStatePage"
import { PageHeaderPage } from "./pages/PageHeaderPage"
import { StatusDotPage } from "./pages/StatusDotPage"
import { ConfirmDialogPage } from "./pages/ConfirmDialogPage"
import { ModeTogglePage } from "./pages/ModeTogglePage"
import { ResponsiveDataViewPage } from "./pages/ResponsiveDataViewPage"
import { UtilitiesPage } from "./pages/UtilitiesPage"
import { HooksPage } from "./pages/HooksPage"

function renderPage(page: string) {
  switch (page) {
    case "introduction":
      return <Introduction />
    case "form-field":
      return <FormFieldPage />
    case "auth-card":
      return <AuthCardPage />
    case "stat-card":
      return <StatCardPage />
    case "search-input":
      return <SearchInputPage />
    case "pagination":
      return <PaginationPage />
    case "table-skeleton":
      return <TableSkeletonPage />
    case "mobile-card-list":
      return <MobileCardListPage />
    case "empty-state":
      return <EmptyStatePage />
    case "page-header":
      return <PageHeaderPage />
    case "status-dot":
      return <StatusDotPage />
    case "confirm-dialog":
      return <ConfirmDialogPage />
    case "mode-toggle":
      return <ModeTogglePage />
    case "responsive-data-view":
      return <ResponsiveDataViewPage />
    case "utilities":
      return <UtilitiesPage />
    case "hooks":
      return <HooksPage />
    default:
      return <Introduction />
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("introduction")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6">
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div
              className="absolute left-0 top-0 h-full w-64 border-r bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                currentPage={currentPage}
                onNavigate={(p) => {
                  setCurrentPage(p)
                  setSidebarOpen(false)
                }}
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-6 py-8">
            {renderPage(currentPage)}
          </div>
        </main>
      </div>
    </div>
  )
}
