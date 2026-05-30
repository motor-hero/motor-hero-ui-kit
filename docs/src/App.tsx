import { useEffect, useState } from "react"
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

const pages: Record<string, () => JSX.Element> = {
  introduction: Introduction,
  "form-field": FormFieldPage,
  "auth-card": AuthCardPage,
  "stat-card": StatCardPage,
  "search-input": SearchInputPage,
  pagination: PaginationPage,
  "table-skeleton": TableSkeletonPage,
  "mobile-card-list": MobileCardListPage,
  "empty-state": EmptyStatePage,
  "page-header": PageHeaderPage,
  "status-dot": StatusDotPage,
  "confirm-dialog": ConfirmDialogPage,
  "mode-toggle": ModeTogglePage,
  "responsive-data-view": ResponsiveDataViewPage,
  utilities: UtilitiesPage,
  hooks: HooksPage,
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1)
  return hash && hash in pages ? hash : "introduction"
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const navigate = (page: string) => {
    window.location.hash = page
    setCurrentPage(page)
  }

  const Page = pages[currentPage] ?? Introduction

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6">
            <Sidebar currentPage={currentPage} onNavigate={navigate} />
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
                  navigate(p)
                  setSidebarOpen(false)
                }}
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-6 py-8">
            <Page />
          </div>
        </main>
      </div>
    </div>
  )
}
