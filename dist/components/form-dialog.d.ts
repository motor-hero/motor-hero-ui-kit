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
export declare function FormDialogLayout({ title, children, onSubmit, submitLabel, cancelLabel, onCancel, isSubmitting, isDisabled, }: FormDialogLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=form-dialog.d.ts.map