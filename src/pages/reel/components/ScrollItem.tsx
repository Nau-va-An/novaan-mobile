import React, { type FC, useRef } from "react";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
// import VideoViewer from "./VideoViewer";
import reelServices from "../services/reelServices";
import Details from "./Details";

interface ScrollItemProps {
    id: number;
    onPageChange?: (page: Page) => void;
}

export type Page = "Profile" | "Video" | "Details";

const ScrollItem: FC<ScrollItemProps> = ({
    id,
    onPageChange,
}: ScrollItemProps) => {
    const post = useRef(reelServices.getNextPost());

    const onIndexChanged = (index: number): void => {
        let page: Page = "Profile";
        switch (index) {
            case 0:
                page = "Profile";
                break;
            case 1:
                page = "Video";
                break;
            case 2:
                page = "Details";
                break;
        }
        console.log("Page: " + page + " - Index: " + index.toString());
        onPageChange?.(page);
    };

    return (
        <Swiper
            loop={false}
            showsPagination={false}
            index={1}
            onIndexChanged={onIndexChanged}
        >
            <View className="flex-1 justify-center items-center bg-white">
                <Text>prrofile - {id}</Text>
            </View>
            <View className="flex-1 justify-center items-center bg-white">
                {/* <VideoViewer videoUri={post.current.video} /> */}
                <Text>video - {id}</Text>
            </View>
            <View className="flex-1">
                <Details post={post.current} />
            </View>
        </Swiper>
    );
};

export default ScrollItem;
