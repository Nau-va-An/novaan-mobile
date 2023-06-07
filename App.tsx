/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { View } from "react-native";
import React from "react";
import SignIn from "./src/pages/auth/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./src/pages/auth/SignUp";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View className="flex-1">
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "SignUp" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
