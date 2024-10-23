import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LifeGrid } from "./LifeGrid";
import { SetupScreen } from "./SetupScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Setup"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#65adf1",
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Setup"
                component={SetupScreen}
                options={{ title: "Life in Months" }}
            />
            <StackNavigator.Screen
                name="LifeGrid"
                component={LifeGrid}
                options={{ title: "Your Life Journey" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);