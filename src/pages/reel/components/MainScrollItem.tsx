import React, { type FC, useRef } from "react";
import { View, Text } from "react-native";
import Swiper from "react-native-swiper";
import reelServices from "../services/reelServices";
import Details from "./Details";
import { windowHeight } from "@/common/utils";
import { BOTTOM_NAV_HEIGHT } from "@/common/constants";
import VideoViewer from "./VideoViewer";

interface MainScrollItemProps {
    id: number;
    onPageChange?: (page: Page) => void;
}

export type Page = "Profile" | "Video" | "Details";

const itemHeight = windowHeight - BOTTOM_NAV_HEIGHT;

const MainScrollItem: FC<MainScrollItemProps> = ({
    id,
    onPageChange,
}: MainScrollItemProps) => {
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
            <View
                className="justify-center items-center bg-white"
                style={{ height: itemHeight }}
            >
                <Text>prrofile - {id}</Text>
            </View>
            <View
                className="justify-center items-center bg-white"
                style={{ height: itemHeight }}
            >
                <VideoViewer videoUri={post.current.video} />
            </View>
            <View style={{ height: itemHeight }}>
                <Details post={post.current} />
            </View>
        </Swiper>
    );
};

export default MainScrollItem;
