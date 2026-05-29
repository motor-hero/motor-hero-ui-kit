import type { ReactNode } from "react";
interface ResponsiveDataViewProps {
    table: ReactNode;
    cards: ReactNode;
    isEmpty: boolean;
    isLoading: boolean;
    emptyIcon?: ReactNode;
    emptyTitle?: string;
    emptyDescription?: string;
    pagination?: ReactNode;
}
export declare function ResponsiveDataView({ table, cards, isEmpty, isLoading, emptyIcon, emptyTitle, emptyDescription, pagination, }: ResponsiveDataViewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=responsive-data-view.d.ts.map