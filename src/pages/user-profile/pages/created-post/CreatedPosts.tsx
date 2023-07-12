import { useUserRecipes } from "@/api/profile/ProfileApi";
import React, {
    useEffect,
    useState,
    type ReactElement,
    useContext,
} from "react";
import { FlatList, Modal, View, Pressable, Text } from "react-native";
import CreatedPostItem from "./components/CreatedPostItem";
import InfiniteScroll from "@/pages/reel/components/InfiniteScroll";
import type Post from "@/pages/reel/types/Post";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { PROFILE_POSTED_TITLE } from "@/common/strings";
import { ToggleButton } from "react-native-paper";
import CustomToggleButton from "./components/CustomToggleButton";
import { UserProfileContext } from "../../UserProfile";
import OverlayLoading from "@/common/components/OverlayLoading";

type ViewCategory = "recipe" | "tips";

const CreatedPosts = (): ReactElement => {
    const { getNext, refresh, recipes, isEmpty, ended } = useUserRecipes();

    const userProfileContext = useContext(UserProfileContext);

    const [viewingItem, setViewingItem] = useState(false);
    const [viewCategory, setViewCategory] = useState<ViewCategory>("recipe");

    const [fetching, setFetching] = useState(false);

    const handleRefresh = (): void => {
        setFetching(true);
        refresh();
    };

    useEffect(() => {
        if (fetching) {
            void getNext().finally(() => {
                setFetching(false);
            });
        }
    }, [fetching]);

    useEffect(() => {
        void getNext();
    }, []);

    const handleFetchMorePost = async (): Promise<void> => {
        if (ended || isEmpty) {
            return;
        }

        setFetching(true);
        await getNext();
        setFetching(false);
    };

    const postGetterProfile = async (index: number): Promise<Post | null> => {
        if (index >= recipes.length || index < 0) {
            return null;
        }

        const userInfo = userProfileContext.userInfo;
        if (userInfo == null) {
            return null;
        }

        const currentRecipe = recipes[index];
        return {
            ...currentRecipe,
            type: "recipe",
            // decoy data
            creator: userInfo,
            prepTime: { hour: 0, minute: 30 },
            cookTime: { hour: 0, minute: 30 },
        };
    };

    const handleItemPress = (): void => {
        setViewingItem(true);
    };

    const handleCloseItemView = (): void => {
        setViewingItem(false);
    };

    const handleChangeViewCategory = (value: ViewCategory): void => {
        if (value == null) {
            return;
        }
        setViewCategory(value);
    };

    if (userProfileContext.userInfo == null) {
        return <View></View>;
    }

    return (
        <View className="flex-1 bg-white">
            <ToggleButton.Row
                style={{
                    borderRadius: 8,
                    marginTop: 16,
                    marginLeft: 8,
                }}
                onValueChange={handleChangeViewCategory}
                value={viewCategory}
            >
                <CustomToggleButton
                    label="Recipe"
                    value="recipe"
                    isChecked={viewCategory === "recipe"}
                />
                <CustomToggleButton
                    label="Tips"
                    value="tips"
                    isChecked={viewCategory === "tips"}
                />
            </ToggleButton.Row>
            <FlatList
                className="w-full"
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ marginTop: 8 }}
                data={recipes}
                renderItem={({ item }) => (
                    <CreatedPostItem
                        item={item}
                        onItemPress={handleItemPress}
                    />
                )}
                onEndReached={handleFetchMorePost}
                onEndReachedThreshold={1}
                onRefresh={handleRefresh}
                refreshing={fetching}
            />
            {viewingItem && (
                <Modal animationType="slide">
                    <View style={{ height: 50 }} className="flex-row">
                        <View className="flex-1 justify-center items-start">
                            <Pressable
                                onPress={handleCloseItemView}
                                className="px-4 py-2 rounded-lg"
                            >
                                <MaterialIcon name="arrow-back" size={24} />
                            </Pressable>
                        </View>
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-base">
                                {PROFILE_POSTED_TITLE}
                            </Text>
                        </View>
                        <View className="flex-1 justify-center items-end">
                            {/* Add delete + edit post options here */}
                            <Pressable className="px-4 py-2 rounded-lg">
                                <IonIcon
                                    name="ios-ellipsis-vertical-sharp"
                                    size={18}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <InfiniteScroll postGetter={postGetterProfile} />
                </Modal>
            )}
        </View>
    );
};

export default CreatedPosts;
