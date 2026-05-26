interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    className?: string;
}
export declare function Pagination({ page, onPageChange, hasNextPage, hasPreviousPage, className }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=pagination.d.ts.map