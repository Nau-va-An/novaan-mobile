import { PORTION_PIECE, PORTION_SERVING } from "@/common/strings";

const protionItems = [
    { label: PORTION_SERVING, value: 0 },
    { label: PORTION_PIECE, value: 1 },
];

export const getPortionLabel = (value: number): string => {
    return (
        protionItems.find((i) => i.value === value)?.label ??
        protionItems[0].label
    );
};

export default protionItems;
