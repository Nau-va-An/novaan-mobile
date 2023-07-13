import { type FC } from "react";
import React, { View } from "react-native";
import VideoButton from "./VideoButton";

const ButtonColumn: FC = () => {
    return (
        <View className="space-y-5 pr-3">
            <VideoButton text="1.6K" />
            <VideoButton iconPack="Community" icon="message-text" text="0" />
            <VideoButton icon="md-bookmark" text="Lưu" />
            <VideoButton
                iconPack="Community"
                icon="newspaper-variant"
                text="Chi tiết"
            />
            <VideoButton iconPack="Material" icon="flag" text="Báo cáo"/>
        </View>
    );
};

export default ButtonColumn;
