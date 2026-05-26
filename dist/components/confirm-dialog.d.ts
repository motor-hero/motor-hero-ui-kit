import type { ReactNode } from "react";
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
export declare function ConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmLabel, cancelLabel, loading, variant, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=confirm-dialog.d.ts.map