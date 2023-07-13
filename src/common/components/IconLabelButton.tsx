import { customColors } from "@root/tailwind.config";
import React, { type FC, type ReactElement } from "react";
import {
    TouchableOpacity,
    Text,
    type TextProps,
    type TouchableOpacityProps,
    View,
    type ViewStyle,
    type StyleProp,
} from "react-native";
import { type IconProps } from "react-native-vector-icons/Icon";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

export interface IconLabelButtonProps {
    iconPack?: "Ionicons" | "Community" | "Material";
    iconProps?: IconProps;
    text?: string;
    textClassName?: string;
    textProps?: TextProps;
    wrapperClassName?: string;
    buttonProps?: TouchableOpacityProps;
    style?: StyleProp<ViewStyle>;
}

const IconLabelButton: FC<IconLabelButtonProps> = ({
    iconPack = "Ionicons",
    iconProps,
    text,
    textClassName = "",
    textProps,
    wrapperClassName = "",
    buttonProps,
    style,
}: IconLabelButtonProps) => {
    const iProps: IconProps = {
        name: "heart",
        size: 32,
        color: customColors.heart,
        ...iconProps,
    };

    const renderIcon = (): ReactElement | null => {
        if (iconProps?.name == null) {
            return null;
        }

        switch (iconPack) {
            case "Ionicons":
                return <IconIonicons {...iProps} />;
            case "Community":
                return <IconCommunity {...iProps} />;
            case "Material":
                return <IconMaterial {...iProps} />;
        }
    };

    return (
        <TouchableOpacity {...buttonProps} style={style}>
            <View
                className={`flex-row space-x-1 items-center ${wrapperClassName}`}
            >
                {renderIcon()}
                {text !== null && (
                    <Text
                        className={`text-cgrey-dim font-medium text-sm ${textClassName}`}
                        {...textProps}
                    >
                        {text}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default IconLabelButton;
