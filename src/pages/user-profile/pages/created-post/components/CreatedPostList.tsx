import React, { type ReactElement } from "react";
import {
    type RecipeResponse,
    type TipResponse,
} from "@/api/post/types/PostResponse";
import { FlatList } from "react-native";
import CreatedPostItem from "./CreatedPostItem";

interface CreatedPostListProps {
    data: Array<RecipeResponse | TipResponse>;
    hidden: boolean;
    handleItemPress: () => void;
    handleOnEndReached: () => void;
    loading: boolean;
}

const CreatedPostList = ({
    data,
    hidden,
    loading,
    handleItemPress,
    handleOnEndReached,
}: CreatedPostListProps): ReactElement<CreatedPostListProps> => {
    // Render as hidden when needed to avoid rendering the whole list again
    return (
        <FlatList
            style={{ display: hidden ? "none" : "flex" }}
            data={data}
            className="w-full"
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ marginTop: 8 }}
            renderItem={({ item }) => (
                <CreatedPostItem item={item} onItemPress={handleItemPress} />
            )}
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={1}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default CreatedPostList;
