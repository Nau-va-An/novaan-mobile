import { type Context } from "react";
import { type Asset } from "react-native-image-picker";
import { recipeTDVParams } from "../../create-recipe/RecipeTDVParams";
import { tipTDVParams } from "../../create-tip/TipTDVParams";

// props required for the TitleDescriptionVideo screen
export interface TDVParams {
    labels: {
        thank: string;
        titleLabel: string;
        titlePlaceHolder: string;
        descriptionLabel: string;
        descriptionPlaceholder: string;
        mediaLabel: string;
        mediaButtonText: string;
    };
    states: Context<{
        title: string;
        setTitle: (title: string) => void;
        description: string;
        setDescription: (description: string) => void;
        video: Asset | null;
        setVideo: (video: Asset | null) => void;
    }>;
}

const TDVParamTypes = {
    recipeTDVParams,
    tipTDVParams,
};

export default TDVParamTypes;
