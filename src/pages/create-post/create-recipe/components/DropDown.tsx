import React, { useState, type FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface DropDownProps {
    items: Array<{ label: string; value: string }>;
    onValueChange?: (value: string | null) => void;
    style?: StyleProp<ViewStyle>;
}

const DropDown: FC<DropDownProps> = ({
    items,
    onValueChange,
    style,
}: DropDownProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [itemList, setItemList] = useState(items);

    return (
        <DropDownPicker
            style={style}
            open={open}
            value={value}
            items={itemList}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItemList}
            onChangeValue={onValueChange}
        />
    );
};

export default DropDown;
