import { type JSX, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { AppShellPage } from "./pages/AppShellPage";
import { AuthCardPage } from "./pages/AuthCardPage";
import { BaseDialogPage } from "./pages/BaseDialogPage";
import { ComboboxPage } from "./pages/ComboboxPage";
import { ConfirmDialogPage } from "./pages/ConfirmDialogPage";
import { ContributingPage } from "./pages/ContributingPage";
import { DatePickerPage } from "./pages/DatePickerPage";
import { EmptyStatePage } from "./pages/EmptyStatePage";
import { FilterToolbarPage } from "./pages/FilterToolbarPage";
import { FormDialogPage } from "./pages/FormDialogPage";
import { FormFieldPage } from "./pages/FormFieldPage";
import { HooksPage } from "./pages/HooksPage";
import { Introduction } from "./pages/Introduction";
import { MobileCardListPage } from "./pages/MobileCardListPage";
import { ModeTogglePage } from "./pages/ModeTogglePage";
import { MultiComboboxPage } from "./pages/MultiComboboxPage";
import { MultiStepFormPage } from "./pages/MultiStepFormPage";
import { PageHeaderPage } from "./pages/PageHeaderPage";
import { PaginationPage } from "./pages/PaginationPage";
import { RatingPage } from "./pages/RatingPage"
import { PasswordInputPage } from "./pages/PasswordInputPage";
import { ProgressBarPage } from "./pages/ProgressBarPage";
import { ResponsiveDataViewPage } from "./pages/ResponsiveDataViewPage";
import { RowActionsMenuPage } from "./pages/RowActionsMenuPage";
import { SearchInputPage } from "./pages/SearchInputPage";
import { StatCardPage } from "./pages/StatCardPage";
import { StatusBadgePage } from "./pages/StatusBadgePage";
import { StatusDotPage } from "./pages/StatusDotPage";
import { TableSkeletonPage } from "./pages/TableSkeletonPage";
import { ThemeProviderPage } from "./pages/ThemeProviderPage";
import { ToasterPage } from "./pages/ToasterPage";
import { UtilitiesPage } from "./pages/UtilitiesPage";

const pages: Record<string, () => JSX.Element> = {
	introduction: Introduction,
	"theme-provider": ThemeProviderPage,
	"form-field": FormFieldPage,
	"base-dialog": BaseDialogPage,
	"form-dialog": FormDialogPage,
	"multi-step-form": MultiStepFormPage,
	"auth-card": AuthCardPage,
	"stat-card": StatCardPage,
	"search-input": SearchInputPage,
	"password-input": PasswordInputPage,
	combobox: ComboboxPage,
	"multi-combobox": MultiComboboxPage,
	"filter-toolbar": FilterToolbarPage,
	pagination: PaginationPage,
	"table-skeleton": TableSkeletonPage,
	"mobile-card-list": MobileCardListPage,
	"empty-state": EmptyStatePage,
	"page-header": PageHeaderPage,
	"progress-bar": ProgressBarPage,
	rating: RatingPage,
	"status-badge": StatusBadgePage,
	"status-dot": StatusDotPage,
	"date-picker": DatePickerPage,
	"confirm-dialog": ConfirmDialogPage,
	"mode-toggle": ModeTogglePage,
	"responsive-data-view": ResponsiveDataViewPage,
	utilities: UtilitiesPage,
	hooks: HooksPage,
	toaster: ToasterPage,
	"app-shell": AppShellPage,
	"row-actions-menu": RowActionsMenuPage,
	contributing: ContributingPage,
};

function getPageFromHash() {
	const hash = window.location.hash.slice(1);
	return hash && hash in pages ? hash : "introduction";
}

export default function App() {
	const [currentPage, setCurrentPage] = useState(getPageFromHash);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const mainRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const onHashChange = () => {
			setCurrentPage(getPageFromHash());
			mainRef.current?.scrollTo({ top: 0 });
		};
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	const navigate = (page: string) => {
		window.location.hash = page;
		setCurrentPage(page);
		mainRef.current?.scrollTo({ top: 0 });
	};

	const Page = pages[currentPage] ?? Introduction;

	return (
		<div className="flex h-screen flex-col overflow-hidden">
			<Header onMenuClick={() => setSidebarOpen(true)} />
			<div className="flex flex-1 overflow-hidden">
				<aside className="hidden w-64 shrink-0 border-r md:block">
					<div className="sidebar-scroll h-full overflow-y-auto py-6">
						<Sidebar currentPage={currentPage} onNavigate={navigate} />
					</div>
				</aside>

				{/* Mobile sidebar overlay */}
				<div
					className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${sidebarOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
						}`}
					onClick={() => setSidebarOpen(false)}
				>
					<div className="absolute inset-0 bg-black/50" />
					<div
						className={`sidebar-scroll absolute left-0 top-0 h-full w-64 overflow-y-auto border-r bg-background p-6 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
							}`}
						onClick={(e) => e.stopPropagation()}
					>
						<Sidebar
							currentPage={currentPage}
							onNavigate={(p) => {
								navigate(p);
								setSidebarOpen(false);
							}}
						/>
					</div>
				</div>

				<main ref={mainRef} className="flex-1 overflow-y-auto">
					<div className="mx-auto max-w-4xl px-6 py-8">
						<Page />
					</div>
				</main>
			</div>
		</div>
	);
}
