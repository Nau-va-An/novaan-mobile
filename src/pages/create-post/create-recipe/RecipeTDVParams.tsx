import React from "react";
import type { TDVStates, TDVParams } from "../common/types/TDVParams";
import {
    CREATE_RECIPE_DESCRIPTION_LABEL,
    CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    CREATE_RECIPE_MEDIA_BUTTON_TEXT,
    CREATE_RECIPE_MEDIA_LABEL,
    CREATE_RECIPE_THANKS,
    CREATE_RECIPE_TITLE_LABEL,
    CREATE_RECIPE_TITLE_PLACEHOLDER,
} from "@/common/strings";
import { type Setter } from "../common/utils";

interface AdditionalRecipeInformation {
    difficulty: string;
    portionQuantity: number;
    portionType: string;
    prepTime: string;
    cookTime: string;
    instructions: Array<{ step: number; description: string; image: string }>;
    ingredients: Array<{ name: string; amount: number; unit: string }>;
}

export type RecipeStates = TDVStates &
    AdditionalRecipeInformation &
    Setter<AdditionalRecipeInformation>;

export const recipeInformationContext = React.createContext<RecipeStates>({
    title: "",
    setTitle: () => {},
    description: "",
    setDescription: () => {},
    video: null,
    setVideo: () => {},
    difficulty: "",
    portionQuantity: 0,
    portionType: "",
    prepTime: "",
    cookTime: "",
    instructions: [],
    ingredients: [],
    setDifficulty: () => {},
    setPortionQuantity: () => {},
    setPortionType: () => {},
    setPrepTime: () => {},
    setCookTime: () => {},
    setInstructions: () => {},
    setIngredients: () => {},
});

const createRecipeLabels: TDVParams<RecipeStates>["labels"] = {
    thank: CREATE_RECIPE_THANKS,
    titleLabel: CREATE_RECIPE_TITLE_LABEL,
    titlePlaceHolder: CREATE_RECIPE_TITLE_PLACEHOLDER,
    descriptionLabel: CREATE_RECIPE_DESCRIPTION_LABEL,
    descriptionPlaceholder: CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    mediaLabel: CREATE_RECIPE_MEDIA_LABEL,
    mediaButtonText: CREATE_RECIPE_MEDIA_BUTTON_TEXT,
};

export const recipeTDVParams: TDVParams<RecipeStates> = {
    labels: createRecipeLabels,
    states: recipeInformationContext,
};
