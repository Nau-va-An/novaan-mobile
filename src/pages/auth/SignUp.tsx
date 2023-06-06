import React, { useState, type ReactElement } from 'react';
import { Text, TextInput, View } from 'react-native';
import { authInputStyles } from 'components/auth/AuthInput';
import AuthButton from 'components/auth/AuthButton';

const SignUp = (): ReactElement<void> => {
  const [accountId, setAccountId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = (): void => {
    console.log('Sign In');
  };

  return (
    <View className="flex-1 my-16 mx-8">
      <View>
        <Text className="text-4xl font-bold">Hello,</Text>
        <Text className="text-2xl">Welcome back,</Text>
      </View>
      <View className="mt-16 w-full">
        <Text>Email</Text>
        <TextInput
          className={authInputStyles.textInput}
          onChangeText={setAccountId}
          defaultValue={accountId}
          placeholder="Enter your username or email"
        />
        <Text className="mt-8">Enter Password</Text>
        <TextInput
          className={authInputStyles.textInput}
          onChangeText={setPassword}
          defaultValue={password}
          textContentType="password"
          placeholder="Enter your password"
        />
      </View>
      <View className="mt-4">
        <Text style={{ color: '#FFCD80' }}>Forgot Password?</Text>
      </View>
      <View className="mt-4">
        <AuthButton title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
};

export default SignUp;
