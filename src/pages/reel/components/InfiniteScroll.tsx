import React, { useState, type FC } from "react";
import Swiper from "react-native-swiper";
import ScrollItem, { type Page } from "./ScrollItem";

const InfiniteScroll: FC = () => {
    const [pages, setPages] = useState([0, 1, 2]);
    const [key, setKey] = useState(1);
    const [scrollEnabled, setScrollEnabled] = useState(false);

    const onPageChange = (newIndex: number): void => {
        if (newIndex === 0) {
            const newPages = pages.map((value) => value - 1);
            setPages(newPages);
        } else if (newIndex === 2) {
            const newPages = pages.map((value) => value + 1);
            setPages(newPages);
        }
        setKey((key + 1) % 2);
    };

    const onScrollItemPageChange = (page: Page): void => {
        if (page === "Details" || page === "Profile") {
            setScrollEnabled(false);
            console.log("no scroll");
        } else {
            setScrollEnabled(true);
            console.log("scroll");
        }
    };

    return (
        <Swiper
            scrollEnabled={scrollEnabled}
            index={1}
            key={key}
            horizontal={false}
            loop={false}
            showsPagination={false}
            onIndexChanged={onPageChange}
        >
            {pages.map((page) => (
                <ScrollItem
                    key={page}
                    id={page}
                    onPageChange={onScrollItemPageChange}
                ></ScrollItem>
            ))}
        </Swiper>
    );
};

export default InfiniteScroll;
