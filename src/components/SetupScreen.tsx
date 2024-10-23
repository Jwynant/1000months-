import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { DatePicker } from "@nativescript/core";

type SetupScreenProps = {
    navigation: FrameNavigationProp<any, "Setup">,
};

export function SetupScreen({ navigation }: SetupScreenProps) {
    const [birthDate, setBirthDate] = React.useState(new Date());

    const handleDateChange = (args: any) => {
        setBirthDate(args.value);
    };

    const handleContinue = () => {
        navigation.navigate("LifeGrid", { birthDate });
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 text-center">
                When were you born?
            </label>
            <datePicker
                date={birthDate}
                onDateChange={handleDateChange}
                className="mb-4"
            />
            <button
                className="bg-blue-500 text-white p-4 rounded-lg"
                onTap={handleContinue}
            >
                Continue
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
});