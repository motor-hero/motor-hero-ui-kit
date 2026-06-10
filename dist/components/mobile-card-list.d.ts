import { type ReactNode } from "react";
interface MobileCardListProps<T> {
    data: T[];
    renderCard: (item: T, index: number) => ReactNode;
    keyExtractor: (item: T) => string;
    isLoading?: boolean;
    loadingCount?: number;
    className?: string;
}
export declare function MobileCardList<T>({ data, renderCard, keyExtractor, isLoading, loadingCount, className, }: MobileCardListProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=mobile-card-list.d.ts.map