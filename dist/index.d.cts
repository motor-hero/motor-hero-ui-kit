import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import { ReactNode } from 'react';
import { ClassValue } from 'clsx';

type Theme = "dark" | "light" | "system";
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
declare function ThemeProvider({ children, defaultTheme, storageKey, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeProviderState;

declare function ModeToggle(): react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}
declare function EmptyState({ icon, title, description, action, className }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    variant?: "default" | "destructive";
}
declare function ConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmLabel, cancelLabel, loading, variant, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}
declare function PageHeader({ title, description, action, className }: PageHeaderProps): react_jsx_runtime.JSX.Element;

interface StatusDotProps {
    active: boolean;
    label?: string;
    className?: string;
}
declare function StatusDot({ active, label, className }: StatusDotProps): react_jsx_runtime.JSX.Element;

interface FormFieldProps {
    label: string;
    htmlFor?: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}
declare function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps): react_jsx_runtime.JSX.Element;

interface FormDialogLayoutProps {
    title: string;
    children: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelLabel?: string;
    onCancel: () => void;
    isSubmitting?: boolean;
    isDisabled?: boolean;
}
declare function FormDialogLayout({ title, children, onSubmit, submitLabel, cancelLabel, onCancel, isSubmitting, isDisabled, }: FormDialogLayoutProps): react_jsx_runtime.JSX.Element;

interface AuthCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
}
declare function AuthCard({ title, description, children, footer }: AuthCardProps): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    className?: string;
}
declare function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }: PaginationProps): react_jsx_runtime.JSX.Element;

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}
declare function TableSkeleton({ rows, columns }: TableSkeletonProps): react_jsx_runtime.JSX.Element;

interface SearchInputProps extends React$1.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}
declare const SearchInput: React$1.ForwardRefExoticComponent<SearchInputProps & React$1.RefAttributes<HTMLInputElement>>;

interface StatCardProps {
    label: string;
    value: ReactNode;
    detail?: string;
    icon?: ReactNode;
    isLoading?: boolean;
}
declare function StatCard({ label, value, detail, icon, isLoading }: StatCardProps): react_jsx_runtime.JSX.Element;

interface DataTableWrapperProps {
    children: ReactNode;
    isEmpty: boolean;
    isLoading: boolean;
    emptyIcon?: ReactNode;
    emptyTitle?: string;
    emptyDescription?: string;
    page?: number;
    onPageChange?: (page: number) => void;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}
declare function DataTableWrapper({ children, isEmpty, isLoading, emptyIcon, emptyTitle, emptyDescription, page, onPageChange, hasNextPage, hasPreviousPage, }: DataTableWrapperProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

declare function extractApiError(err: any, fallbackMessage?: string): string;

declare function useDisclosure(initial?: boolean): {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    setOpen: React$1.Dispatch<React$1.SetStateAction<boolean>>;
};

export { AuthCard, ConfirmDialog, DataTableWrapper, EmptyState, FormDialogLayout, FormField, ModeToggle, PageHeader, Pagination, SearchInput, StatCard, StatusDot, TableSkeleton, type Theme, ThemeProvider, type ThemeProviderProps, type ThemeProviderState, cn, extractApiError, useDisclosure, useTheme };
