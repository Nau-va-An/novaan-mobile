import React from "react";
import { type TDVParams } from "../common/types/TDVParams";
import { type Asset } from "react-native-image-picker";
import {
    CREATE_RECIPE_DESCRIPTION_LABEL,
    CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    CREATE_RECIPE_MEDIA_BUTTON_TEXT,
    CREATE_RECIPE_MEDIA_LABEL,
    CREATE_RECIPE_THANKS,
    CREATE_RECIPE_TITLE_LABEL,
    CREATE_RECIPE_TITLE_PLACEHOLDER,
} from "@/common/strings";
import { type extractGenericContext } from "../common/utils";

export const RecipeInformationContext = React.createContext<
    extractGenericContext<TDVParams["states"]>
>({
    title: "",
    setTitle: (title: string) => {},
    description: "",
    setDescription: (title: string) => {},
    video: null,
    setVideo: (video: Asset | null) => {},
});

const createRecipeLabels: TDVParams["labels"] = {
    thank: CREATE_RECIPE_THANKS,
    titleLabel: CREATE_RECIPE_TITLE_LABEL,
    titlePlaceHolder: CREATE_RECIPE_TITLE_PLACEHOLDER,
    descriptionLabel: CREATE_RECIPE_DESCRIPTION_LABEL,
    descriptionPlaceholder: CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    mediaLabel: CREATE_RECIPE_MEDIA_LABEL,
    mediaButtonText: CREATE_RECIPE_MEDIA_BUTTON_TEXT,
};

export const recipeTDVParams: TDVParams = {
    labels: createRecipeLabels,
    states: RecipeInformationContext,
};
