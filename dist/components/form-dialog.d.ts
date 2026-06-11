import * as React from "react";
import type { ReactNode } from "react";
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
export declare function FormDialogLayout({ title, children, onSubmit, submitLabel, cancelLabel, onCancel, isSubmitting, isDisabled, }: FormDialogLayoutProps): React.JSX.Element;
declare const sizeClasses: {
    readonly sm: "sm:max-w-sm";
    readonly md: "sm:max-w-md";
    readonly lg: "sm:max-w-lg";
    readonly xl: "sm:max-w-xl";
    readonly "2xl": "sm:max-w-2xl";
};
export type FormDialogSize = keyof typeof sizeClasses;
interface FormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    /** When provided, the dialog renders a <form> wrapping body + footer. */
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    size?: FormDialogSize;
    className?: string;
}
/**
 * Standardized, responsive modal:
 * - mobile: bottom sheet (full width, up to 92vh tall)
 * - desktop: centered dialog (up to 90vh tall)
 * Header and footer stay fixed; only the body scrolls.
 *
 * Also fixes the known Radix bug where `body { pointer-events: none }`
 * can persist after closing a dialog that contained a Select/Popover,
 * which would otherwise make the rest of the page unclickable.
 */
export declare function FormDialog({ open, onOpenChange, title, description, children, footer, onSubmit, size, className, }: FormDialogProps): React.JSX.Element;
export {};
//# sourceMappingURL=form-dialog.d.ts.map