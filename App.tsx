/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { View } from 'react-native';
import React from 'react';
import SignIn from './src/pages/auth/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/auth/SignUp';

export interface RootStackParamList {
  SignIn: undefined;
  SignUp: undefined;
}

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
            options={{ title: 'SignUp' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
