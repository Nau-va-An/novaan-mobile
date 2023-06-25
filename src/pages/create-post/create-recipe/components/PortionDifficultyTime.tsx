import React, { type FC, useContext } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import WarningAsterisk from "@/common/components/WarningAeterisk";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RootStackParamList } from "@root/App";
import { recipeInformationContext } from "../RecipeParams";
import {
    CREATE_RECIPE_COOK_TIME_TITLE,
    CREATE_RECIPE_PDT_SUBTITLE,
    CREATE_RECIPE_PORTION_DIFFICULTY_TITLE,
    CREATE_RECIPE_PORTION_QUANTITY_PLACEHOLDER,
    CREATE_RECIPE_PORTION_TITLE,
    CREATE_RECIPE_PREPARE_TIME_TITLE,
} from "@/common/strings";
import DropDown from "./DropDown";

export interface TitleDescriptionVideoProps {
    navigation?: NativeStackNavigationProp<RootStackParamList, "CreateTip">;
}

const PortionDificultyTime: FC<TitleDescriptionVideoProps> = (
    props: TitleDescriptionVideoProps
) => {
    const {
        // portionType,
        // portionQuantity,
        // difficulty,
        // cookTime,
        // prepTime,
        setPortionType,
        setPortionQuantity,
        setDifficulty,
        setCookTime,
        setPrepTime,
    } = useContext(recipeInformationContext);
    const labelClassName = "text-base font-medium uppercase";
    const protionTypeItems = [
        { label: "Phần", value: "Servings" },
        { label: "Miếng", value: "Pieces" },
    ];
    const difficultyItems = [
        { label: "Dễ", value: "Easy" },
        { label: "Trung bình", value: "Medium" },
        { label: "Khó", value: "Hard" },
    ];
    const setQuantity = (value: string): void => {
        setPortionQuantity(parseFloat(value));
    };
    return (
        <ScrollView
            className="flex-1 bg-white"
        >
            <Text className="text-base p-5 bg-ctertiary ">
                {CREATE_RECIPE_PDT_SUBTITLE}
            </Text>
            <View className="px-3 py-7">
                <Text className={labelClassName}>
                    {CREATE_RECIPE_PORTION_TITLE}
                    <WarningAsterisk />
                </Text>
                <View className="z-[4000] flex-row space-x-2 justify-center mt-2">
                    <TextInput
                        keyboardType="decimal-pad"
                        textAlign={"center"}
                        className="text-xl flex-1 py-2 border-cgrey-platinum"
                        // classname doesn't work
                        style={{ borderBottomWidth: 1 }}
                        onChangeText={setQuantity}
                        placeholder={CREATE_RECIPE_PORTION_QUANTITY_PLACEHOLDER}
                    />
                    <View
                        className="text-xl flex-[2] py-2 border-cgrey-platinum"
                        // classname doesn't work
                        style={{ borderBottomWidth: 1 }}
                    >
                        <DropDown
                            items={protionTypeItems}
                            onValueChange={setPortionType}
                        />
                    </View>
                </View>
                <Text className={labelClassName + " mt-10"}>
                    {CREATE_RECIPE_PORTION_DIFFICULTY_TITLE}
                    <WarningAsterisk />
                </Text>
                <View className="mt-5 z-[3000]">
                    <DropDown
                        items={difficultyItems}
                        onValueChange={setDifficulty}
                    />
                </View>
                <View className="flex-row">
                    <Text className={labelClassName + " mt-10"}>
                        {CREATE_RECIPE_PREPARE_TIME_TITLE}
                        <WarningAsterisk />
                    </Text>
                    <TextInput
                        textAlign={"center"}
                        className="text-xl flex-1 py-2 border-cgrey-platinum"
                        // classname doesn't work
                        style={{ borderBottomWidth: 1 }}
                        placeholder={CREATE_RECIPE_PORTION_QUANTITY_PLACEHOLDER}
                        onChangeText={setPrepTime}
                    />
                </View>
                <View className="flex-row">
                    <Text className={labelClassName + " mt-10"}>
                        {CREATE_RECIPE_COOK_TIME_TITLE}
                        <WarningAsterisk />
                    </Text>
                    <TextInput
                        textAlign={"center"}
                        className="text-xl flex-1 py-2 border-cgrey-platinum"
                        // classname doesn't work
                        style={{ borderBottomWidth: 1 }}
                        placeholder={CREATE_RECIPE_PORTION_QUANTITY_PLACEHOLDER}
                        onChangeText={setCookTime}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default PortionDificultyTime;
