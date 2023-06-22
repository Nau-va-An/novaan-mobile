import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RootStackParamList } from "@root/App";
import { useState, type FC } from "react";
import { Bar } from "react-native-progress";
import React, { Text, TouchableOpacity, View } from "react-native";
import IconEvill from "react-native-vector-icons/EvilIcons";
import IconAnt from "react-native-vector-icons/AntDesign";
import CreatedPosts from "../../user-profile/CreatedPosts";
import {
    CREATE_NEXT_STEP_BUTTON_TITLE,
    CREATE_PREVIOUS_STEP_BUTTON_TITLE,
    CREATE_RECIPE_DESCRIPTION_LABEL,
    CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    CREATE_RECIPE_MEDIA_BUTTON_TEXT,
    CREATE_RECIPE_MEDIA_LABEL,
    CREATE_RECIPE_THANKS,
    CREATE_RECIPE_TITLE,
    CREATE_RECIPE_TITLE_LABEL,
    CREATE_RECIPE_TITLE_PLACEHOLDER,
} from "@/common/strings";
import { customColors } from "@root/tailwind.config";
import TitleDescriptionVideo, {
    type TDVRouteProps,
} from "../components/TitleDescriptionVideo";
import type { Asset } from "react-native-image-picker";
import {
    NavigationContainer,
    createNavigationContainerRef,
} from "@react-navigation/native";

interface CreateRecipeProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "CreateTip">;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CreateRecipeTabParamList = {
    TitleDescriptionVideo: undefined;
    PortionDificultyTime: undefined;
    Instructions: undefined;
};

const Tab = createMaterialTopTabNavigator<CreateRecipeTabParamList>();
const navigationRef = createNavigationContainerRef<CreateRecipeTabParamList>();

function navigate(name: keyof CreateRecipeTabParamList, params?: any): void {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

const CreateRecipe: FC<CreateRecipeProps> = ({
    navigation: rootNavigation,
}: CreateRecipeProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState<Asset | null>(null);
    const [thumbnailUri, setThumbnailUri] = useState<string | null>();
    const titleDescriptionVideoProps: TDVRouteProps = {
        title,
        setTitle,
        description,
        setDescription,
        video,
        setVideo,
        labels: {
            thank: CREATE_RECIPE_THANKS,
            titleLabel: CREATE_RECIPE_TITLE_LABEL,
            titlePlaceHolder: CREATE_RECIPE_TITLE_PLACEHOLDER,
            descriptionLabel: CREATE_RECIPE_DESCRIPTION_LABEL,
            descriptionPlaceholder: CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
            mediaLabel: CREATE_RECIPE_MEDIA_LABEL,
            mediaButtonText: CREATE_RECIPE_MEDIA_BUTTON_TEXT,
        },
    };
    const bottomNavButtonClassName =
        "flex-1 flex-row space-x-3 items-center justify-center rounded-full my-2 px-6 py-2";
    const paramList: CreateRecipeTabParamList = {
        TitleDescriptionVideo: undefined,
        PortionDificultyTime: undefined,
        Instructions: undefined,
    };
    const screens = Object.keys(paramList);
    const progressStep = 1 / screens.length;
    const [progress, setProgresss] = useState(progressStep);
    const [currentScreen, setCurrentScreen] = useState(0);

    const goNextScreen = (): void => {
        if (currentScreen < screens.length - 1) {
            navigate(screens[currentScreen + 1] as any);
            setCurrentScreen(currentScreen + 1);
            setProgresss(progress + progressStep);
        }
    };

    const goPreviousScreen = (): void => {
        if (currentScreen > 0) {
            navigate(screens[currentScreen - 1] as any);
            setCurrentScreen(currentScreen - 1);
            setProgresss(progress - progressStep);
        }
    };

    const exit = (): void => {
        rootNavigation.pop();
    };

    return (
        <View className="flex-1">
            <View className="h-[55] flex-row justify-between px-1">
                <View className="flex-row space-x-2 items-center">
                    <TouchableOpacity
                        onPress={exit}
                        activeOpacity={0.2}
                        className="h-10 w-10 items-center justify-center"
                    >
                        <IconEvill name="close" size={25} color="#000" />
                    </TouchableOpacity>
                    <Text className="text-xl font-medium">
                        {CREATE_RECIPE_TITLE}
                    </Text>
                </View>
            </View>
            <Bar
                width={null}
                progress={progress}
                color={customColors.csecondary}
                borderWidth={0}
                unfilledColor={customColors.cgrey.platinum}
                borderRadius={0}
            />
            <NavigationContainer ref={navigationRef} independent={true}>
                <Tab.Navigator
                    screenOptions={{
                        swipeEnabled: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            height: 0,
                        },
                    }}
                >
                    <Tab.Screen
                        name="TitleDescriptionVideo"
                        component={TitleDescriptionVideo}
                        initialParams={titleDescriptionVideoProps as any}
                    />
                    <Tab.Screen
                        name="PortionDificultyTime"
                        component={CreatedPosts}
                    />
                    <Tab.Screen name="Instructions" component={CreatedPosts} />
                </Tab.Navigator>
            </NavigationContainer>
            <View
                className="flex-row justify-center items-center px-5
                border-cgrey-seasalt space-x-5"
                style={{ borderTopWidth: 2 }}
            >
                {/* <TouchableOpacity
                    className="flex-row space-x-3 items-center rounded-full my-2 px-6 py-2 bg-cprimary-500"
                    onPress={submit}
                >
                    <Text className="text-sm text-white">
                        {CREATE_RECIPE_SUBMIT}
                    </Text>
                     change to eyeo for previewing
                    <IconAnt name="upload" color="white" size={18} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    className={
                        bottomNavButtonClassName +
                        " border-2 border-cprimary-500"
                    }
                    onPress={goPreviousScreen}
                >
                    <IconAnt
                        name="arrowleft"
                        color={customColors.cprimary["500"]}
                        size={18}
                    />
                    <Text className="text-sm text-cprimary-500">
                        {CREATE_PREVIOUS_STEP_BUTTON_TITLE}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={bottomNavButtonClassName + " bg-cprimary-500"}
                    onPress={goNextScreen}
                >
                    <Text className="text-sm text-white">
                        {CREATE_NEXT_STEP_BUTTON_TITLE}
                    </Text>
                    <IconAnt name="arrowright" color="white" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateRecipe;
