import { type RootStackParamList } from "App";
import React, { useState, type ReactElement } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";

import { authInputStyles } from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import {
    AUTH_EMAIL_INVALID,
    AUTH_PASSWORD_TOO_SHORT,
    AUTH_USERNAME_TOO_SHORT,
    COMMON_EMPTY_FIELD_NOT_ALLOWED,
    COMMON_SERVER_CONNECTION_FAIL_ERROR,
    SIGN_UP_EMAIL_EXISTS_ERROR,
    SIGN_UP_EMAIL_PLACEHOLDER,
    SIGN_UP_EMAIL_TITLE,
    SIGN_UP_FAIL_TITLE,
    SIGN_UP_PASSWORD_PLACEHOLDER,
    SIGN_UP_PASSWORD_TITLE,
    SIGN_UP_REENTER_PASSWORD_DIFFERENT_ERROR,
    SIGN_UP_REENTER_PASSWORD_PLACEHOLDER,
    SIGN_UP_REENTER_PASSWORD_TITLE,
    SIGN_UP_SIGN_IN_BUTTON_TITLE,
    SIGN_UP_SIGN_IN_TITLE,
    SIGN_UP_SIGN_UP_BUTTON_TITLE,
    SIGN_UP_SUCCESS_MESSAGE,
    SIGN_UP_SUCCESS_TITLE,
    SIGN_UP_USERNAME_EXISTS_ERROR,
    SIGN_UP_USERNAME_PLACEHOLDER,
    SIGN_UP_USERNAME_TITLE,
    SING_UP_UNKNOWN_ERROR,
} from "@/common/strings";
import authApi from "@/api/auth/AuthApi";
import OverlayLoading from "@/components/common/OverlayLoading";
import { useForm, Controller } from "react-hook-form";

interface SignUpProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "SignIn">;
}

interface FormData {
    username: string;
    email: string;
    password: string;
    reenterPassword: string;
}

const SignUp = (props: SignUpProps): ReactElement<SignUpProps> => {
    const { navigation } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            reenterPassword: "",
        },
        mode: "all",
    });

    const handleSignUp = async (data: FormData): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authApi.signUp(
                data.username,
                data.email,
                data.password
            );
            if (response.success) {
                Alert.alert(SIGN_UP_SUCCESS_TITLE, SIGN_UP_SUCCESS_MESSAGE);
                navigation.navigate("SignIn");
            } else {
                const failureMessage =
                    response.reason === "email exists"
                        ? SIGN_UP_EMAIL_EXISTS_ERROR
                        : response.reason === "username exists"
                        ? SIGN_UP_USERNAME_EXISTS_ERROR
                        : SING_UP_UNKNOWN_ERROR;
                Alert.alert(SIGN_UP_FAIL_TITLE, failureMessage);
            }
        } catch (error) {
            alert(COMMON_SERVER_CONNECTION_FAIL_ERROR);
            console.error(`fail: ${String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    const errorTextStyle = "italic text-sm text-cwarning";

    const handleSignInRedirect = (): void => {
        navigation.navigate("SignIn");
    };

    return (
        <>
            <View className="flex-1 my-16 mx-8">
                <View>
                    <Text className="text-2xl font-bold">
                        Tạo tài khoản mới
                    </Text>
                </View>
                <View className="mt-8 w-full">
                    <Text>{SIGN_UP_EMAIL_TITLE}</Text>
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
                                placeholder={SIGN_UP_EMAIL_PLACEHOLDER}
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
                    <Text className="mt-8">{SIGN_UP_USERNAME_TITLE}</Text>
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={authInputStyles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={SIGN_UP_USERNAME_PLACEHOLDER}
                            />
                        )}
                    />
                    <View className="mt-2">
                        {errors.username?.type === "required" && (
                            <Text className={errorTextStyle}>
                                {COMMON_EMPTY_FIELD_NOT_ALLOWED}
                            </Text>
                        )}
                        {errors.username?.type === "minLength" && (
                            <Text className={errorTextStyle}>
                                {AUTH_USERNAME_TOO_SHORT}
                            </Text>
                        )}
                    </View>

                    <Text className="mt-8">{SIGN_UP_PASSWORD_TITLE}</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: true,
                            minLength: 8,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={authInputStyles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                textContentType="password"
                                secureTextEntry={true}
                                placeholder={SIGN_UP_PASSWORD_PLACEHOLDER}
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

                    <Text className="mt-8">
                        {SIGN_UP_REENTER_PASSWORD_TITLE}
                    </Text>
                    <Controller
                        control={control}
                        name="reenterPassword"
                        rules={{
                            required: true,
                            validate: (value, formValues) =>
                                value === watch("password"),
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={authInputStyles.textInput}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                textContentType="password"
                                secureTextEntry={true}
                                placeholder={
                                    SIGN_UP_REENTER_PASSWORD_PLACEHOLDER
                                }
                            />
                        )}
                    />
                    <View className="mt-2">
                        {errors.reenterPassword?.type === "required" && (
                            <Text className={errorTextStyle}>
                                {COMMON_EMPTY_FIELD_NOT_ALLOWED}
                            </Text>
                        )}
                        {errors.reenterPassword?.type === "validate" && (
                            <Text className={errorTextStyle}>
                                {SIGN_UP_REENTER_PASSWORD_DIFFERENT_ERROR}
                            </Text>
                        )}
                    </View>
                </View>
                <View className="mt-8">
                    <AuthButton
                        title={SIGN_UP_SIGN_UP_BUTTON_TITLE}
                        onPress={handleSubmit(handleSignUp)}
                    />
                </View>
                <View className="mt-4 flex-row justify-center">
                    <Text>{SIGN_UP_SIGN_IN_TITLE}</Text>
                    <TouchableOpacity onPress={handleSignInRedirect}>
                        <Text className="text-cprimary-200">{SIGN_UP_SIGN_IN_BUTTON_TITLE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading && <OverlayLoading />}
        </>
    );
};

export default SignUp;
