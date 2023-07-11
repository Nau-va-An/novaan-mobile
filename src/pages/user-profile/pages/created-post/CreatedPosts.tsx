import { useUserRecipes } from "@/api/profile/ProfileApi";
import React, { useEffect, type FC, useState } from "react";
import { FlatList, Modal, View, Pressable, Text } from "react-native";
import CreatedPostItem from "./components/CreatedPostItem";
import InfiniteScroll from "@/pages/reel/components/InfiniteScroll";
import type Post from "@/pages/reel/types/Post";
import postApi from "@/api/post/PostApi";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { PROFILE_POSTED_TITLE } from "@/common/strings";

const CreatedPosts: FC = () => {
    const { recipes, getNext, isEmpty, ended } = useUserRecipes();

    const [viewingItem, setViewingItem] = useState(false);

    useEffect(() => {
        void getNext();
    }, []);

    useEffect(() => {
        if (recipes.length === 0) {
            console.log("Empty");
            return;
        }

        console.log(recipes);
    }, [recipes]);

    const handleFetchMorePost = async (): Promise<void> => {
        if (ended || isEmpty) {
            return;
        }
        await getNext();
    };

    const postGetterProfile = async (index: number): Promise<Post | null> => {
        if (index >= recipes.length || index < 0) {
            return null;
        }

        const currentItem = recipes[index];
        const postResponse = await postApi.getPost(currentItem.id, "recipe");
        if (!postResponse.success) {
            return null;
        }
        return {
            ...postResponse.value,
            // decoy data
            creator: {
                username: "Điện máy XANH",
                userId: "123332",
            },
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

    return (
        <View className="flex-1 bg-white items-center justify-center">
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
