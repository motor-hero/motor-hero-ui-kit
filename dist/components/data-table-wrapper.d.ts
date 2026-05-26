import type { ReactNode } from "react";
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
export declare function DataTableWrapper({ children, isEmpty, isLoading, emptyIcon, emptyTitle, emptyDescription, page, onPageChange, hasNextPage, hasPreviousPage, }: DataTableWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-wrapper.d.ts.map