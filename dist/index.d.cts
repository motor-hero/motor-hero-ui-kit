import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
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

declare function cn(...inputs: ClassValue[]): string;

declare function useDisclosure(initial?: boolean): {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    setOpen: react.Dispatch<react.SetStateAction<boolean>>;
};

export { ConfirmDialog, EmptyState, ModeToggle, PageHeader, StatusDot, type Theme, ThemeProvider, type ThemeProviderProps, type ThemeProviderState, cn, useDisclosure, useTheme };
