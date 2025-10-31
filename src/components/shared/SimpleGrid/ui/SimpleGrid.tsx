import React from "react";

interface SimpleGridProps {
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4;
    gap?: number | string;
}

export const SimpleGrid = ({ children, columns = 2, gap = 16 }: SimpleGridProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: typeof gap === "number" ? `${gap}px` : gap,
            }}
        >
            {children}
        </div>
    );
};
