import React from "react";
import { type TDVParams } from "../common/types/TDVParams";
import { type Asset } from "react-native-image-picker";
import {
    CREATE_TIP_DESCRIPTION_LABEL,
    CREATE_TIP_DESCRIPTION_PLACEHOLDER,
    CREATE_TIP_MEDIA_BUTTON_TEXT,
    CREATE_TIP_MEDIA_LABEL,
    CREATE_TIP_THANKS,
    CREATE_TIP_TITLE_LABEL,
    CREATE_TIP_TITLE_PLACEHOLDER,
} from "@/common/strings";
import { type extractGenericContext } from "../common/utils";

const tipInformationContext = React.createContext<
    extractGenericContext<TDVParams["states"]>
>({
    title: "",
    setTitle: (title: string) => {},
    description: "",
    setDescription: (title: string) => {},
    video: null,
    setVideo: (video: Asset | null) => {},
});

const createTipLabels: TDVParams["labels"] = {
    thank: CREATE_TIP_THANKS,
    titleLabel: CREATE_TIP_TITLE_LABEL,
    titlePlaceHolder: CREATE_TIP_TITLE_PLACEHOLDER,
    descriptionLabel: CREATE_TIP_DESCRIPTION_LABEL,
    descriptionPlaceholder: CREATE_TIP_DESCRIPTION_PLACEHOLDER,
    mediaLabel: CREATE_TIP_MEDIA_LABEL,
    mediaButtonText: CREATE_TIP_MEDIA_BUTTON_TEXT,
};

export const tipTDVParams: TDVParams = {
    labels: createTipLabels,
    states: tipInformationContext,
};
