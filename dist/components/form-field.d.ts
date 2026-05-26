import type { ReactNode } from "react";
interface FormFieldProps {
    label: string;
    htmlFor?: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}
export declare function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=form-field.d.ts.map