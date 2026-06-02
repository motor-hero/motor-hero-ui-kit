import { useEffect, useRef, useState, type JSX } from "react"
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
import { ToasterPage } from "./pages/ToasterPage"
import { ContributingPage } from "./pages/ContributingPage"

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
  toaster: ToasterPage,
  contributing: ContributingPage,
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1)
  return hash && hash in pages ? hash : "introduction"
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash())
      mainRef.current?.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const navigate = (page: string) => {
    window.location.hash = page
    setCurrentPage(page)
    mainRef.current?.scrollTo({ top: 0 })
  }

  const Page = pages[currentPage] ?? Introduction

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="sidebar-scroll sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6">
            <Sidebar currentPage={currentPage} onNavigate={navigate} />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className={`absolute left-0 top-0 h-full w-64 border-r bg-background p-6 transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
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

        <main ref={mainRef} className="flex-1 overflow-auto h-[calc(100vh-3.5rem)]">
          <div className="mx-auto max-w-4xl px-6 py-8">
            <Page />
          </div>
        </main>
      </div>
    </div>
  )
}
