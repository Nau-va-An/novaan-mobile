import React, { type StyleProp, type ViewStyle } from "react-native";
import IconLabelButton, {
    type IconLabelButtonProps,
} from "@/common/components/IconLabelButton";
import { type FC } from "react";

interface VideoButtonProps {
    iconPack?: Exclude<IconLabelButtonProps["iconPack"], undefined>;
    icon?: string;
    iconSize?: number;
    text?: string;
    style?: StyleProp<ViewStyle>;
}

const VideoButton: FC<VideoButtonProps> = ({
    iconPack = "Ionicons",
    icon = "heart",
    iconSize,
    text = "Heart",
    style,
}) => {
    return (
        <IconLabelButton
            style={style}
            iconPack={iconPack}
            iconProps={{
                name: icon,
                color: "white",
                ...(iconSize != null ? { size: iconSize } : {}),
            }}
            text={text}
            textClassName="text-white text-xs"
            wrapperClassName="flex-col space-x-0 space-y-1"
        />
    );
};

export default VideoButton;
