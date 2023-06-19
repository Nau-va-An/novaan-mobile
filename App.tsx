/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import MainScreens from "@/pages/MainScreens";
import CreateTip from "@/pages/create-post/CreateTip";
import { PaperProvider, Portal } from "react-native-paper";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    MainScreens: undefined;
    CreateTip: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <PaperProvider>
            <Portal>
                <View className="flex-1">
                    <NavigationContainer>
                        <RootStack.Navigator
                            screenOptions={{
                                headerShown: false,
                                contentStyle: {
                                    backgroundColor: "#FFFFFF",
                                },
                            }}
                            initialRouteName="MainScreens"
                        >
                            <RootStack.Screen
                                name="SignIn"
                                component={SignIn}
                                options={{ title: "Sign In" }}
                            />
                            <RootStack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ title: "Sign Up" }}
                            />
                            <RootStack.Screen
                                name="MainScreens"
                                component={MainScreens}
                                options={{ title: "Main Screens" }}
                            />
                            <RootStack.Screen
                                name="CreateTip"
                                component={CreateTip}
                                options={{
                                    animation: "slide_from_bottom",
                                    animationDuration: 200,
                                }}
                            />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </View>
            </Portal>
        </PaperProvider>
    );
};

export default App;
