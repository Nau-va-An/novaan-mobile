import React from "react";
import type { TDVStates, TDVParams } from "../../common/types/TDVParams";
import {
    CREATE_RECIPE_DESCRIPTION_LABEL,
    CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    CREATE_RECIPE_FAILED,
    CREATE_RECIPE_FAILED_SECONDARY,
    CREATE_RECIPE_MEDIA_BUTTON_TEXT,
    CREATE_RECIPE_MEDIA_LABEL,
    CREATE_RECIPE_PENDING,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_THANKS,
    CREATE_RECIPE_TITLE_LABEL,
    CREATE_RECIPE_TITLE_PLACEHOLDER,
    CREATE_RECIPE_VIDEO_WRONG_FILE_SIZE_ERROR,
    CREATE_RECIPE_VIDEO_WRONG_LENGTH_ERROR,
} from "@/common/strings";
import type Ingredient from "./Ingredient";
import type Instruction from "./Instruction";
import type RecipeTime from "./RecipeTime";
import { type Setter } from "@/common/utils";

export interface AdditionalRecipeInformation {
    difficulty: number;
    portionQuantity: number;
    portionType: number;
    prepTime: RecipeTime;
    cookTime: RecipeTime;
    instructions: Instruction[];
    ingredients: Ingredient[];
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
    difficulty: 0,
    portionQuantity: 0,
    portionType: 0,
    prepTime: { hour: 0, minute: 0 },
    cookTime: { hour: 0, minute: 0 },
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

const createRecipeTDVLabels: TDVParams<RecipeStates>["labels"] = {
    thank: CREATE_RECIPE_THANKS,
    titleLabel: CREATE_RECIPE_TITLE_LABEL,
    titlePlaceHolder: CREATE_RECIPE_TITLE_PLACEHOLDER,
    descriptionLabel: CREATE_RECIPE_DESCRIPTION_LABEL,
    descriptionPlaceholder: CREATE_RECIPE_DESCRIPTION_PLACEHOLDER,
    mediaLabel: CREATE_RECIPE_MEDIA_LABEL,
    mediaButtonText: CREATE_RECIPE_MEDIA_BUTTON_TEXT,
};

const createRecipeTDVMessages: TDVParams<RecipeStates>["messages"] = {
    wrongFileLengthError: CREATE_RECIPE_VIDEO_WRONG_LENGTH_ERROR,
    wrongFileSizeError: CREATE_RECIPE_VIDEO_WRONG_FILE_SIZE_ERROR,
    compressingMessage: CREATE_RECIPE_PENDING,
    successMessage: CREATE_RECIPE_SUCCESS,
    failMessage: CREATE_RECIPE_FAILED_SECONDARY,
    fail2ndMessage: CREATE_RECIPE_FAILED,
};

export const recipeParams: TDVParams<RecipeStates> = {
    labels: createRecipeTDVLabels,
    messages: createRecipeTDVMessages,
    states: recipeInformationContext,
};
