import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ScrollView, GridLayout, Dialogs } from "@nativescript/core";
import { MonthBox } from "./MonthBox";
import { YearLabel } from "./YearLabel";

type LifeGridProps = {
    route: RouteProp<any, "LifeGrid">,
    navigation: FrameNavigationProp<any, "LifeGrid">,
};

interface Note {
    text: string;
    type: 'milestone' | 'goal';
}

interface MonthData {
    season?: string;
    note?: Note;
}

export function LifeGrid({ route }: LifeGridProps) {
    const birthDate = route.params?.birthDate || new Date();
    const totalMonths = 1000;
    const monthsPerRow = 12;
    const [monthsData, setMonthsData] = React.useState<Record<number, MonthData>>({});

    const calculateLivedMonths = () => {
        const today = new Date();
        const birthMonth = birthDate.getMonth();
        const birthYear = birthDate.getFullYear();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return (currentYear - birthYear) * 12 + (currentMonth - birthMonth);
    };

    const livedMonths = calculateLivedMonths();

    const handleMonthTap = async (index: number) => {
        const isLived = index < livedMonths;
        const year = Math.floor(index / 12) + birthDate.getFullYear();
        const month = (index % 12) + 1;

        const result = await Dialogs.action({
            message: `${month}/${year}`,
            cancelButtonText: "Cancel",
            actions: ["Add Note", "Set Life Season", "View Details"]
        });

        if (result === "Add Note") {
            const note = await Dialogs.prompt({
                title: "Add Note",
                message: "Enter your note or milestone",
                okButtonText: "Save",
                cancelButtonText: "Cancel",
                defaultText: monthsData[index]?.note?.text || ""
            });

            if (note.result) {
                setMonthsData(prev => ({
                    ...prev,
                    [index]: {
                        ...prev[index],
                        note: {
                            text: note.text,
                            type: isLived ? 'milestone' : 'goal'
                        }
                    }
                }));
            }
        } else if (result === "Set Life Season") {
            const season = await Dialogs.action({
                message: "Choose Life Season",
                cancelButtonText: "Cancel",
                actions: ["Career", "Family", "Adventure"]
            });

            if (season && season !== "Cancel") {
                setMonthsData(prev => ({
                    ...prev,
                    [index]: {
                        ...prev[index],
                        season
                    }
                }));
            }
        }
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                {Array.from({ length: Math.ceil(totalMonths / monthsPerRow) }).map((_, rowIndex) => {
                    const age = rowIndex;
                    const isDecadeStart = age % 10 === 0 && age !== 0;
                    
                    return (
                        <stackLayout key={`row-container-${rowIndex}`}>
                            {isDecadeStart && <stackLayout height={20} />}
                            <gridLayout columns="40,*" rows="auto" className="mb-1">
                                <label
                                    col={0}
                                    row={0}
                                    className={`text-right pr-2 ${isDecadeStart ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
                                    fontSize={isDecadeStart ? 14 : 12}
                                >
                                    {age}
                                </label>
                                <gridLayout
                                    col={1}
                                    row={0}
                                    columns="*,*,*,*,*,*,*,*,*,*,*,*"
                                    rows="auto"
                                >
                                    {Array.from({ length: monthsPerRow }).map((_, colIndex) => {
                                        const monthIndex = rowIndex * monthsPerRow + colIndex;
                                        if (monthIndex >= totalMonths) return null;
                                        
                                        const monthData = monthsData[monthIndex] || {};
                                        return (
                                            <MonthBox
                                                key={`month-${monthIndex}`}
                                                index={monthIndex}
                                                isLived={monthIndex < livedMonths}
                                                year={Math.floor(monthIndex / 12)}
                                                month={(monthIndex % 12) + 1}
                                                onTap={handleMonthTap}
                                                season={monthData.season}
                                                hasNote={!!monthData.note}
                                                col={colIndex}
                                                row={0}
                                            />
                                        );
                                    })}
                                </gridLayout>
                            </gridLayout>
                        </stackLayout>
                    );
                })}
            </stackLayout>
        </scrollView>
    );
}