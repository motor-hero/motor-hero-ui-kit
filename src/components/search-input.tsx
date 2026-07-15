import * as React from "react";
import { cn } from "../lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	({ containerClassName, className, ...props }, ref) => {
		return (
			<div className={cn("relative flex-1", containerClassName)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
					className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
				<input
					ref={ref}
					type="text"
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					{...props}
				/>
			</div>
		);
	},
);
SearchInput.displayName = "SearchInput";
