import React, { useState, type FC } from "react";
import Swiper from "react-native-swiper";
import MainScrollItem, { type Page } from "./MainScrollItem";
import BoundaryScrollItem from "./BoundaryScrollItem";

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
            {/* {pages.map((page) => (
                <MainScrollItem
                    key={page}
                    id={page}
                    onPageChange={onScrollItemPageChange}
                ></MainScrollItem>
            ))} */}
            <BoundaryScrollItem id={pages[0]} key={pages[0]} />
            <MainScrollItem
                id={pages[1]}
                key={pages[1]}
                onPageChange={onScrollItemPageChange}
            ></MainScrollItem>
            <BoundaryScrollItem id={pages[2]} key={pages[2]} />
        </Swiper>
    );
};

export default InfiniteScroll;
