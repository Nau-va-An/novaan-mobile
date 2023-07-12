import {
    type RecipeResponse,
    type TipResponse,
} from "@/api/post/types/PostResponse";

interface GetUserContentReturn {
    getNext: () => Promise<boolean>;
    getPrev: () => Promise<boolean>;
    getPage: (pageNum: number) => RecipeResponse[];
    refresh: () => void;
    isEmpty: boolean;
    ended: boolean;
}

export interface GetUserRecipeReturn extends GetUserContentReturn {
    recipes: RecipeResponse[];
}

export interface GetUserTipReturn extends GetUserContentReturn {
    tips: TipResponse[];
}
