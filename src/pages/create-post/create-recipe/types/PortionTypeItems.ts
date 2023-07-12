import { PORTION_PIECE, PORTION_SERVING } from "@/common/strings";

const portionItems = [
    { label: PORTION_SERVING, value: 0 },
    { label: PORTION_PIECE, value: 1 },
];

export const getPortionLabel = (value: number): string => {
    return (
        portionItems.find((item) => item.value === value)?.label ??
        portionItems[0].label
    );
};

export default portionItems;
