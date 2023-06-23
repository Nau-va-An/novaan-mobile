import { type Context } from "react";
import { type Asset } from "react-native-image-picker";
import { recipeTDVParams } from "../../create-recipe/RecipeTDVParams";
import { tipTDVParams } from "../../create-tip/TipTDVParams";
import { type Setter } from "../utils";

export interface TDVInformation {
    title: string;
    description: string;
    video: Asset | null;
}

export type TDVStates = TDVInformation & Setter<TDVInformation>;

// props required for the TitleDescriptionVideo screen
export interface TDVParams<T extends TDVStates> {
    labels: {
        thank: string;
        titleLabel: string;
        titlePlaceHolder: string;
        descriptionLabel: string;
        descriptionPlaceholder: string;
        mediaLabel: string;
        mediaButtonText: string;
    };
    states: Context<T>;
}

const TDVParamTypes = {
    recipeTDVParams,
    tipTDVParams,
};

export default TDVParamTypes;
