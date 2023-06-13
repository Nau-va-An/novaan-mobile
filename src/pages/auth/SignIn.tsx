import { type RootStackParamList } from "App";
import React, { useState, type ReactElement } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";

import { authInputStyles } from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import {
    SIGN_IN_WRONG_USERNAME_PASSWORD,
    SIGN_IN_ERROR_OCCURED,
    SIGN_IN_EMAIL_TITLE,
    COMMON_EMPTY_FIELD_NOT_ALLOWED,
    SIGN_IN_EMAIL_PLACEHOLDER,
    SIGN_IN_PASSWORD_TITLE,
    SIGN_IN_PASSWORD_PLACEHOLDER,
    SIGN_IN_SIGN_IN_BUTTON_TITLE,
    SIGN_IN_FORGET_PASSWORD,
    SIGN_IN_CREATE_ACCOUNT_TITLE,
    SIGN_IN_CREATE_ACCOUNT_BUTTON_TITLE,
    AUTH_EMAIL_INVALID,
    AUTH_PASSWORD_TOO_SHORT,
} from "@/common/messages";
import authApi from "@/api/auth/AuthApi";
import { COLOR_CRIMSON } from "@/common/colors";
import OverlayLoading from "@/components/common/OverlayLoading";

interface SignInProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "SignIn">;
}

interface FormData {
    email: string;
    password: string;
}

const SignIn = (props: SignInProps): ReactElement<SignInProps> => {
    const { navigation } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });

    const errorTextStyle = `italic text-[${COLOR_CRIMSON}] text-xs`;

    const handleSignIn = async (data: FormData): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authApi.signIn(data.email, data.password);
            if (response.success) {
                navigation.navigate("MainScreen");
            } else {
                alert(SIGN_IN_WRONG_USERNAME_PASSWORD);
            }
        } catch (error) {
            alert(SIGN_IN_ERROR_OCCURED);
            console.error(`fail: ${String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpRedirect = (): void => {
        navigation.navigate("SignUp");
    };

    return (
        <>
            <View className="flex-1 my-16 mx-8">
                <View>
                    <Text className="text-4xl font-bold">Xin chào</Text>
                </View>
                <View className="mt-16 w-full">
                    <View>
                        <Text>{SIGN_IN_EMAIL_TITLE}</Text>
                    </View>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: true,
                            pattern:
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={authInputStyles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={SIGN_IN_EMAIL_PLACEHOLDER}
                            />
                        )}
                    />
                    <View className="mt-2">
                        {errors.email?.type === "required" && (
                            <Text className={errorTextStyle}>
                                {COMMON_EMPTY_FIELD_NOT_ALLOWED}
                            </Text>
                        )}
                        {errors.email?.type === "pattern" && (
                            <Text className={errorTextStyle}>
                                {AUTH_EMAIL_INVALID}
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text className="mt-6">{SIGN_IN_PASSWORD_TITLE}</Text>
                    </View>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: true, minLength: 8 }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                textContentType="password"
                                secureTextEntry={true}
                                className={authInputStyles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={SIGN_IN_PASSWORD_PLACEHOLDER}
                            />
                        )}
                    />
                    <View className="mt-2">
                        {errors.password?.type === "required" && (
                            <Text className={errorTextStyle}>
                                {COMMON_EMPTY_FIELD_NOT_ALLOWED}
                            </Text>
                        )}
                        {errors.password?.type === "minLength" && (
                            <Text className={errorTextStyle}>
                                {AUTH_PASSWORD_TOO_SHORT}
                            </Text>
                        )}
                    </View>
                </View>
                <View className="mt-6">
                    <Text style={{ color: "#FFCD80" }}>
                        {SIGN_IN_FORGET_PASSWORD}
                    </Text>
                </View>
                <View className="mt-4">
                    <AuthButton
                        title={SIGN_IN_SIGN_IN_BUTTON_TITLE}
                        onPress={handleSubmit(handleSignIn)}
                        disabled={isLoading}
                    />
                </View>
                <View className="mt-40 flex-row justify-center">
                    <Text>{SIGN_IN_CREATE_ACCOUNT_TITLE}</Text>
                    <TouchableOpacity onPress={handleSignUpRedirect}>
                        <Text>{SIGN_IN_CREATE_ACCOUNT_BUTTON_TITLE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading && <OverlayLoading />}
        </>
    );
};

export default SignIn;
