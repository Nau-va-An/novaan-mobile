import React, { FC, type ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatedPosts from "./CreatedPosts";
import SavedPosts from "./SavedPosts";
import { useProfileInfo } from "@/api/profile/ProfileApi";
import OverlayLoading from "@/common/components/OverlayLoading";
import { type MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { type BottomTabParamList } from "../MainScreens";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Avatar } from "react-native-paper";
import { customColors } from "@root/tailwind.config";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UserProfileTabParamList = {
    CreatedPosts: undefined;
    SavedPosts: undefined;
    Following: undefined;
};

const Tab = createMaterialTopTabNavigator<UserProfileTabParamList>();

interface UserProfileProps {
    navigation: MaterialBottomTabNavigationProp<BottomTabParamList>;
}

const UserProfile = (
    props: UserProfileProps
): ReactElement<UserProfileProps> => {
    const { navigation } = props;

    const [loading, setLoading] = useState(true);

    const { profileInfo, fetchPersonalProfile } = useProfileInfo();

    useEffect(() => {
        void handleFetchProfile();
    }, []);

    useEffect(() => {
        if (profileInfo == null) {
            return;
        }

        console.log(profileInfo);
    }, [profileInfo]);

    const handleFetchProfile = async (): Promise<void> => {
        setLoading(true);
        try {
            const fetched = await fetchPersonalProfile();
            if (!fetched) {
                throw new Error();
            }
        } catch {
            navigation.navigate("Home");
            Toast.show({
                type: "error",
                text1: "Failed to fetch user profile",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1">
            <View style={{ backgroundColor: "#fff" }}>
                <View className="items-center justify-center mt-4">
                    <Text className="text-cprimary-300 text-xl font-semibold">
                        Trang đại diện
                    </Text>
                </View>
                <View className="mx-6 mt-4 flex-row items-center justify-center">
                    <Avatar.Text
                        size={90}
                        style={{
                            backgroundColor: customColors.cprimary["300"],
                        }}
                        label="TE"
                        className="mr-4"
                    />
                    <View className="flex-row flex-1">
                        <View className="flex-1 items-center">
                            <Text>Recipe</Text>
                            <Text className="text-xl font-semibold text-cprimary-300">
                                100
                            </Text>
                        </View>
                        <View className="flex-1 items-center">
                            <Text>Followers</Text>
                            <Text className="text-xl font-semibold text-cprimary-300">
                                2.5M
                            </Text>
                        </View>
                        <View className="flex-1 items-center">
                            <Text>Following</Text>
                            <Text className="text-xl font-semibold text-cprimary-300">
                                30
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="mx-8 my-4">
                    <Text className="text-xl text-cprimary-300">Your Name</Text>
                    <Text className="text-gray-600 italic mt-2">
                        Oops, this user have not written much about themselves!
                    </Text>
                </View>
            </View>
            <Tab.Navigator
                className="flex-1"
                screenOptions={{
                    tabBarItemStyle: {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                <Tab.Screen
                    name="CreatedPosts"
                    component={CreatedPosts}
                    options={{
                        tabBarLabel: "Bài đăng",
                    }}
                />
                <Tab.Screen
                    name="SavedPosts"
                    component={SavedPosts}
                    options={{
                        tabBarLabel: "Xem sau",
                    }}
                />
                <Tab.Screen
                    name="Following"
                    component={CreatedPosts}
                    options={{
                        tabBarLabel: "Theo dõi",
                    }}
                />
            </Tab.Navigator>
            {loading && <OverlayLoading />}
        </View>
    );
};

export default UserProfile;
