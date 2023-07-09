import React, { type FC, useRef, memo } from "react";
import {
    View,
    Text,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    useWindowDimensions,
} from "react-native";
import Swiper, { type SwiperInternals } from "react-native-swiper";
import reelServices from "../services/reelServices";
import Details from "./Details";
import VideoViewer from "./VideoViewer";
import { windowWidth } from "@/common/utils";

interface MainScrollItemProps {
    id: number;
    onPageChange?: (page: Page) => void;
}

export type Page = "Profile" | "Video" | "Details" | "Changing";

const ScrollItem: FC<MainScrollItemProps> = ({
    id,
    onPageChange,
}: MainScrollItemProps) => {
    const post = useRef(reelServices.getNextPost());

    const dimension = useWindowDimensions();

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
        onPageChange?.(page);
    };

    const onScrollBeginDrag = (
        _e: NativeSyntheticEvent<NativeScrollEvent>,
        state: SwiperInternals,
        _swiper: Swiper
    ): void => {
        onPageChange?.("Changing");
    };

    const onScrollEndDrag = (
        _e: NativeSyntheticEvent<NativeScrollEvent>,
        state: SwiperInternals,
        _swiper: Swiper
    ): void => {
        const index = Math.round(state.offset.x / windowWidth);
        onIndexChanged(index);
    };

    return (
        <Swiper
            style={{ height: dimension.height }}
            loop={false}
            showsPagination={false}
            index={1}
            onScrollBeginDrag={onScrollBeginDrag}
            onMomentumScrollEnd={onScrollEndDrag}
        >
            <View className="flex-1 justify-center items-center bg-white">
                <Text>profile - {id}</Text>
            </View>
            <View className="flex-1 justify-center items-center bg-white">
                <VideoViewer videoUri={post.current.video} />
            </View>
            <View className="flex-1">
                <Details post={post.current} />
            </View>
        </Swiper>
    );
};

export default memo(ScrollItem);
