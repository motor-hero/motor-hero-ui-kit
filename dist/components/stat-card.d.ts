import type { ReactNode } from "react";
interface StatCardProps {
    label: string;
    value: ReactNode;
    detail?: string;
    icon?: ReactNode;
    isLoading?: boolean;
}
export declare function StatCard({ label, value, detail, icon, isLoading }: StatCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=stat-card.d.ts.map