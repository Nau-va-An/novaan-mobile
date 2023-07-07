import React, { useEffect } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatedPosts from "./CreatedPosts";
import SavedPosts from "./SavedPosts";
import { useProfileInfo } from "@/api/profile/ProfileApi";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UserProfileTabParamList = {
    SavedPosts: undefined;
    CreatedPosts: undefined;
};

const Tab = createMaterialTopTabNavigator<UserProfileTabParamList>();

const UserProfile: React.FC = () => {
    const { profileInfo, fetchPersonalProfile } = useProfileInfo();

    useEffect(() => {
        fetchPersonalProfile()
            .then((result) => {
                !result && alert("Fetch profile failed");
            })
            .catch(() => {
                alert("Fetch profile failed");
            });
    }, []);

    useEffect(() => {
        if (profileInfo == null) {
            return;
        }

        console.log(profileInfo);
    }, [profileInfo]);

    return (
        <View className="flex">
            <View
                className="basis-2/5"
                style={{ backgroundColor: "#fff" }}
            ></View>
            <Tab.Navigator
                className="basis-3/4"
                screenOptions={{
                    tabBarItemStyle: { width: 100 },
                }}
            >
                <Tab.Screen
                    name="SavedPosts"
                    component={SavedPosts}
                    options={{
                        tabBarLabel: "Lưu trữ",
                    }}
                />
                <Tab.Screen
                    name="CreatedPosts"
                    component={CreatedPosts}
                    options={{
                        tabBarLabel: "Bài đăng",
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default UserProfile;
