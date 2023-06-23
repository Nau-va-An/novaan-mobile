import React, { useState, type FC, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import WarningAsterisk from "@/common/components/WarningAeterisk";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { customColors } from "@root/tailwind.config";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RootStackParamList } from "@root/App";
import { pickVideoAndThumbnail } from "../../create-tip/services/createTipService";
import TDVParamTypes from "../types/TDVParams";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultThumbnail = require("@root/assets/default-video.png");

export interface TDVRouteProps {
    labelType: keyof typeof TDVParamTypes;
}

export interface TitleDescriptionVideoProps {
    route: { params: TDVRouteProps };
    navigation?: NativeStackNavigationProp<RootStackParamList, "CreateTip">;
}

const TitleDescriptionVideo: FC<TitleDescriptionVideoProps> = (
    props: TitleDescriptionVideoProps
) => {
    const {
        route: {
            params: { labelType },
        },
    } = props;
    const { title, setTitle, description, setDescription, video, setVideo } =
        labelType === "recipeTDVParams"
            ? useContext(TDVParamTypes[labelType].states)
            : useContext(TDVParamTypes[labelType].states);
    const labels = TDVParamTypes[labelType].labels;
    const [thumbnailUri, setThumbnailUri] = useState<string | null>();

    const labelClassName = "text-base font-medium uppercase";

    const onTitleChange = (text: string): void => {
        setTitle(text);
    };

    const onDescriptionChange = (text: string): void => {
        setDescription(text);
    };

    const selectVideo = async (): Promise<void> => {
        await pickVideoAndThumbnail(setVideo, setThumbnailUri);
    };

    return (
        <ScrollView className="bg-white">
            <Text className="text-base p-5 bg-ctertiary ">{labels.thank}</Text>
            <View className="px-3 py-7">
                <Text className={labelClassName}>
                    {labels.titleLabel}
                    <WarningAsterisk />
                </Text>
                <TextInput
                    onChangeText={onTitleChange}
                    maxLength={55}
                    className="text-xl py-2 border-cgrey-platinum"
                    // classname doesn't work
                    style={{ borderBottomWidth: 1 }}
                    placeholder={labels.titlePlaceHolder}
                />
                <View className="items-end mt-2">
                    <Text className="text-cgrey-dimGrey text-base">
                        {title.length.toString() + "/55"}
                    </Text>
                </View>
                <Text className={labelClassName + " mt-10"}>
                    {labels.descriptionLabel}
                    <WarningAsterisk />
                </Text>
                <TextInput
                    onChangeText={onDescriptionChange}
                    textAlignVertical="top"
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                    className="text-base py-2 first-line:border-cgrey-platinum"
                    // classname doesn't work
                    style={{ borderBottomWidth: 1 }}
                    placeholder={labels.descriptionPlaceholder}
                />
                <View className="items-end">
                    <Text className="text-cgrey-dimGrey text-base">
                        {description.length.toString() + "/500"}
                    </Text>
                </View>
                <Text className={labelClassName + " mt-10"}>
                    {labels.mediaLabel}
                    <WarningAsterisk />
                </Text>
                {video == null ? (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={selectVideo}
                        className="h-[380] mt-2 rounded-md border-cprimary-500 bg-ctertiary"
                        style={{ borderWidth: 1.3 }}
                    >
                        <View className="flex-row px-5 justify-center items-center space-x-2 h-full">
                            <IconMaterial
                                size={60}
                                name="video-library"
                                color={customColors.cprimary[500]}
                            />
                            <Text className="w-[200] text-base text-cprimary-500">
                                {labels.mediaButtonText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={selectVideo}
                        className="h-[380] mt-2 rounded-md overflow-hidden"
                    >
                        <Image
                            className="h-full w-full"
                            source={
                                thumbnailUri !== null
                                    ? { uri: thumbnailUri }
                                    : defaultThumbnail
                            }
                        />
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

export default TitleDescriptionVideo;
