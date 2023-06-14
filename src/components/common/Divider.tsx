import React, { type ReactElement } from "react";
import { View, Text } from "react-native";

interface DividerProps {
    title: string;
}

const Divider = (props: DividerProps): ReactElement<DividerProps> => {
    return (
        <View className="flex-row items-center">
            <View className="flex-1 bg-gray-600" style={{ height: 1 }} />
            <View>
                <Text className="w-auto text-center">{props.title}</Text>
            </View>
            <View className="flex-1 bg-gray-600" style={{ height: 1 }} />
        </View>
    );
};

export default Divider;
