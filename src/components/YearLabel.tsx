import * as React from "react";

interface YearLabelProps {
    year: number;
}

export function YearLabel({ year }: YearLabelProps) {
    return (
        <label className="text-xs text-gray-600 w-[30] text-center">
            {year}
        </label>
    );
}