import React, {
    useRef,
    type FC,
    useState,
    useCallback,
    useEffect,
} from "react";
import { Text, type GestureResponderEvent, View } from "react-native";
import Video from "react-native-video";
import PlayPause from "./PlayPause";
import Seeker from "./Seeker";
import { useFetchResourceUrl } from "@/api/utils/resourceHooks";
import ButtonColumn from "./ButtonColumn";
import type User from "../../types/User";
import ResourceImage from "@/common/components/ResourceImage";
import IconFeather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

interface VideoViewrProps {
    videoId: string;
    creator: User;
    title: string;
    isPaused?: boolean;
}

const VideoViewer: FC<VideoViewrProps> = ({
    videoId,
    creator,
    title,
    isPaused: pausedFromHigherUp = true,
}: VideoViewrProps) => {
    const videoRef = useRef<Video>(null);
    const [paused, setPaused] = useState(pausedFromHigherUp);
    const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
    const [playToggle, setPlayToggle] = useState<boolean>();
    const [pauseToggle, setPauseToggle] = useState<boolean>();
    const videoDuration = useRef(1);

    const { resourceUrl, fetchUrl } = useFetchResourceUrl();

    useEffect(() => {
        void fetchUrl(videoId)
            .then((success) => {
                if (!success) {
                    // Do something to alert user or retry
                }
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        setPaused(pausedFromHigherUp);
    }, [pausedFromHigherUp]);

    const onVideoPress = (e: GestureResponderEvent): void => {
        const pauseState = !paused;
        setPaused(pauseState);
        if (pauseState) {
            setPauseToggle(pauseToggle !== undefined ? !pauseToggle : true);
        } else {
            setPlayToggle(playToggle !== undefined ? !playToggle : true);
        }
    };

    const onSeek = useCallback(
        (progress: number): void => {
            videoRef.current?.seek(progress * videoDuration.current);
        },
        [videoDuration.current]
    );

    const onVideoError = async (): Promise<void> => {
        // Show error
    };

    return (
        <View
            className="absolute top-0 left-0 bottom-0 right-0 bg-black"
            onTouchEnd={onVideoPress}
        >
            {resourceUrl !== "" && (
                <Video
                    paused={paused}
                    ref={videoRef}
                    source={{
                        uri: resourceUrl,
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    resizeMode="contain"
                    repeat
                    onLoad={({ duration }) => {
                        videoRef.current?.seek(1);
                        videoDuration.current = duration;
                    }}
                    onProgress={({ currentTime }) => {
                        setCurrentTimeStamp(currentTime);
                    }}
                    onError={onVideoError}
                />
            )}
            <PlayPause showToggle={pauseToggle} icon="pause" />
            <PlayPause showToggle={playToggle} icon="play" />
            <View className="absolute bottom-0 left-0 right-0 flex-col-reverse">
                <LinearGradient
                    colors={["#ffffff00", "#00000066"]}
                    className="absolute bottom-0 top-0 left-0 right-0 h-[140]"
                />
                <Seeker
                    progress={currentTimeStamp / videoDuration.current}
                    onSeek={onSeek}
                />
                <View className="flex-row-reverse items-end">
                    <ButtonColumn />
                    <View className="flex-1 pl-6 pr-6 space-y-2">
                        <View className="flex-row items-center space-x-3">
                            <View className="bg-xanthous w-[35] h-[35] rounded-full items-center justify-center overflow-hidden">
                                {creator.avatar == null ||
                                creator.avatar === "" ? (
                                    <IconFeather name="user" size={30} />
                                ) : (
                                    <ResourceImage
                                        resourceId={creator.avatar}
                                        className="h-full w-full"
                                    />
                                )}
                            </View>
                            <Text className="text-white font-medium">
                                {creator.username}
                            </Text>
                        </View>
                        <Text className="text-white" style={{ fontSize: 15 }}>
                            {title}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default VideoViewer;
