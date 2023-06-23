import React from "react";
import { type TDVStates, type TDVParams } from "../common/types/TDVParams";
import {
    CREATE_TIP_DESCRIPTION_LABEL,
    CREATE_TIP_DESCRIPTION_PLACEHOLDER,
    CREATE_TIP_MEDIA_BUTTON_TEXT,
    CREATE_TIP_MEDIA_LABEL,
    CREATE_TIP_THANKS,
    CREATE_TIP_TITLE_LABEL,
    CREATE_TIP_TITLE_PLACEHOLDER,
} from "@/common/strings";

const tipInformationContext = React.createContext<TDVStates>({
    title: "",
    setTitle: () => {},
    description: "",
    setDescription: () => {},
    video: null,
    setVideo: () => {},
});

const createTipLabels: TDVParams<TDVStates>["labels"] = {
    thank: CREATE_TIP_THANKS,
    titleLabel: CREATE_TIP_TITLE_LABEL,
    titlePlaceHolder: CREATE_TIP_TITLE_PLACEHOLDER,
    descriptionLabel: CREATE_TIP_DESCRIPTION_LABEL,
    descriptionPlaceholder: CREATE_TIP_DESCRIPTION_PLACEHOLDER,
    mediaLabel: CREATE_TIP_MEDIA_LABEL,
    mediaButtonText: CREATE_TIP_MEDIA_BUTTON_TEXT,
};

export const tipTDVParams: TDVParams<TDVStates> = {
    labels: createTipLabels,
    states: tipInformationContext,
};
