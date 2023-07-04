import React, { type FC } from "react";
import { View, Text } from "react-native";
import { windowHeight } from "@/common/utils";
import { BOTTOM_NAV_HEIGHT } from "@/common/constants";

interface BoundaryScrollItemProps {
    id: number;
}

const itemHeight = windowHeight - BOTTOM_NAV_HEIGHT;

const BoundaryScrollItem: FC<BoundaryScrollItemProps> = ({
    id,
}: BoundaryScrollItemProps) => {
    return (
        <View
            className="justify-center items-center bg-white"
            style={{ height: itemHeight }}
        >
            <Text>boundary - {id}</Text>
        </View>
    );
};

export default BoundaryScrollItem;
