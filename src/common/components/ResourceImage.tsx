import { useState, type FC, useEffect } from "react";
import React, { View, type StyleProp, Image } from "react-native";
import FastImage, { type ImageStyle } from "react-native-fast-image";

import { windowWidth } from "../utils";
import services from "../services";
interface ResourceImageProps {
    resourceId: string;
    style?: StyleProp<ImageStyle>;
    className?: string;
}

const ResourceImage: FC<ResourceImageProps> = ({
    resourceId,
    style,
    className,
}) => {
    const [url, setUrl] = useState<string>("");
    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    }>();

    useEffect(() => {
        void (async () => {
            const resourceUrl = await services.getResourceUrl(resourceId);
            if (resourceUrl != null) {
                setUrl(resourceUrl);
                Image.getSize(resourceUrl, (width, height) => {
                    setDimensions({ width, height });
                });
            }
        })();
    }, []);

    return url !== "" ? (
        <FastImage
            source={{ uri: url }}
            style={[
                dimensions != null
                    ? {
                          width: windowWidth,
                          height:
                              (windowWidth / dimensions.width) *
                              dimensions.height,
                      }
                    : {},
                style,
            ]}
            className={className}
        />
    ) : (
        <View />
    );
};

export default ResourceImage;
