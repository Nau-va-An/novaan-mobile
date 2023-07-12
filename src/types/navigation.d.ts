import { type ProfileInfo } from "@/api/profile/types";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    MainScreens: undefined;
    CreateTip: undefined;
    CreateRecipe: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Reel: undefined;
    UserProfile: undefined;
    CreatePostPopup: undefined;
};

export type RecipeTabParamList = {
    TitleDescriptionVideo: TDVRouteProps;
    PortionDificultyTime: undefined;
    Ingredients: undefined;
    Instructions: undefined;
};

export type IngredientStackParamList = {
    ViewIngredient: undefined;
    AddIngredient: AddIngredientParams;
};

export type InstructionStackParamList = {
    ViewInstruction: undefined;
    AddInstruction: AddInstructionParams;
};

export type UserProfileTabParamList = {
    SavedPosts: { currentUser: ProfileInfo };
    CreatedPosts: undefined;
    Following: undefined;
};
