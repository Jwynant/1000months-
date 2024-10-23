import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface MonthBoxProps {
    index: number;
    isLived: boolean;
    year: number;
    month: number;
    onTap: (index: number) => void;
    season?: string;
    hasNote?: boolean;
    col: number;
    row: number;
}

export function MonthBox({ index, isLived, year, month, onTap, season, hasNote, col, row }: MonthBoxProps) {
    const getSeasonColor = () => {
        switch (season) {
            case 'Career': return 'bg-purple-500';
            case 'Family': return 'bg-green-500';
            case 'Adventure': return 'bg-orange-500';
            default: return isLived ? 'bg-blue-500' : 'bg-gray-200';
        }
    };

    return (
        <gridLayout
            className={`${getSeasonColor()} rounded`}
            col={col}
            row={row}
            margin={1}
            padding={0}
            width={28}
            height={28}
            onTap={() => onTap(index)}
        >
            {hasNote && (
                <label
                    className="text-[10] text-center"
                    color={isLived ? "white" : "black"}
                >
                    •
                </label>
            )}
        </gridLayout>
    );
}