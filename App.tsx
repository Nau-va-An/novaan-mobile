/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./src/pages/auth/SignIn";
import SignUp from "./src/pages/auth/SignUp";
import MainScreen from "./src/pages/inapp/home/MainScreen";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    MainScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <View className="flex-1">
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <RootStack.Screen name="SignIn" component={SignIn} />
                    <RootStack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{ title: "SignUp" }}
                    />
                    <RootStack.Screen
                        name="MainScreen"
                        component={MainScreen}
                        options={{ title: "MainScreen" }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default App;
