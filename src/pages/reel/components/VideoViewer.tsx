import React, { type FC } from "react";
import Video from "react-native-video";

interface VideoViewrProps {
    videoUri: string;
}

const VideoViewer: FC<VideoViewrProps> = ({ videoUri }: VideoViewrProps) => {
    return (
        <Video
            source={{ uri: videoUri }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}
        />
    );
};

export default VideoViewer;
