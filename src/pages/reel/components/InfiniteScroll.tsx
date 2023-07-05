import React, { useState, type FC, useCallback } from "react";
import ScrollItem, { type Page } from "./ScrollItem";
import { FlatList, SafeAreaView } from "react-native";
import { SCROLL_ITEM_HEIGHT } from "../commons/constants";

const InfiniteScroll: FC = () => {
    const [pages, setPages] = useState([0, 1, 2]);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const fetchMoreData = (): void => {
        const lastId = pages[pages.length - 1];
        for (let i = 1; i <= 4; i++) {
            pages.push(lastId + i);
        }
        setPages([...pages]);
    };

    const onScrollItemPageChange = useCallback((page: Page): void => {
        if (page === "Video") {
            setScrollEnabled(true);
            console.log("scroll");
        } else {
            setScrollEnabled(false);
            console.log("no scroll");
        }
    }, []);

    return (
        <SafeAreaView style={{ height: SCROLL_ITEM_HEIGHT }}>
            <FlatList
                data={pages}
                scrollEnabled={scrollEnabled}
                pagingEnabled={true}
                renderItem={({ item }) => (
                    <ScrollItem
                        id={item}
                        onPageChange={onScrollItemPageChange}
                    />
                )}
                onEndReachedThreshold={4}
                onEndReached={fetchMoreData}
            />
        </SafeAreaView>
    );
};

export default InfiniteScroll;
