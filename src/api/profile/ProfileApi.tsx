import { useState } from "react";
import { useFetch } from "../baseApiHook";
import { KEYCHAIN_ID } from "@env";
import { decode as decodeBase64 } from "base-64";
import {
    type UseProfileInfoReturn,
    type ProfileInfo,
    type GetUserRecipeReturn,
    type useFetchResUriReturn,
} from "./types";
import { getKeychainValue } from "@/common/keychainService";
import { type RecipeResponse } from "../post/types/PostResponse";

const GET_RESOURCE_URL = "content/download";

const PAGE_SIZE = 4;

const parseJwt = (token: string): any => {
    const base64Url = token.split(".")[1];
    const jsonPayload = decodeBase64(base64Url);
    return JSON.parse(jsonPayload);
};

const getUserIdFromToken = async (): Promise<string> => {
    const token = await getKeychainValue(KEYCHAIN_ID);
    const payload = parseJwt(token);
    if (payload == null || typeof payload === "string") {
        throw new Error();
    }

    return payload.nameid;
};

export const useProfileInfo = (): UseProfileInfoReturn => {
    const { getReq } = useFetch({ authorizationRequired: true });

    const [profileInfo, setProfileInfo] = useState<ProfileInfo>();

    // Use boolean to indicate if the call was success or not
    const fetchPersonalProfile = async (): Promise<boolean> => {
        try {
            const currentUserId = await getUserIdFromToken();
            const profileResponse = await getReq(`profile/${currentUserId}`);
            if (profileResponse == null || !("id" in profileResponse)) {
                return false;
            }

            setProfileInfo(profileResponse);
        } catch {
            return false;
        }

        return true;
    };

    // Use boolean to indicate if the call was success or not
    const fetchUserProfile = async (userId: string): Promise<boolean> => {
        const profileResponse = await getReq(`profile/${userId}`);
        if (profileResponse == null || !("id" in profileResponse)) {
            return false;
        }
        setProfileInfo(profileResponse);
        return true;
    };

    return { profileInfo, fetchUserProfile, fetchPersonalProfile };
};

export const useUserRecipes = (userId?: string): GetUserRecipeReturn => {
    const { getReq } = useFetch({ authorizationRequired: true });

    // Indicate if the result is empty
    const [isEmpty, setIsEmpty] = useState(false);
    const [ended, setEnded] = useState(false);

    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const getRecipes = async (
        start: number,
        limit: number
    ): Promise<boolean> => {
        if (userId == null) {
            userId = await getUserIdFromToken();
            console.log(userId);
        }

        const content = (await getReq(
            `profile/${userId}/recipes?Start=${start}&Limit=${limit}`
        )) as RecipeResponse[];

        if (content == null) {
            return false;
        }

        if (start === 0 && content.length === 0) {
            setIsEmpty(true);
            return true;
        }

        if (content.length === 0 || content.length < PAGE_SIZE) {
            setEnded(true);
        }

        // TODO: Need to have a mechanism to auto remove viewed content above and re-query as needed
        // Spread operator to mutate array become more expensive as the array become bigger
        setRecipes((recipes) => [...recipes, ...content]);
        return true;
    };

    const getNext = async (): Promise<boolean> => {
        // Avoid re-fetching data
        if (isEmpty) {
            return true;
        }

        const start = currentPage * PAGE_SIZE;
        if (start < recipes.length) {
            return true;
        }

        setCurrentPage((page) => page + 1);
        return await getRecipes(start, PAGE_SIZE);
    };

    const getPrev = async (): Promise<boolean> => {
        if (isEmpty) {
            return true;
        }

        const start = (currentPage - 1) * PAGE_SIZE;
        if (start < 0) {
            return true;
        }

        setCurrentPage((page) => page - 1);
        return await getRecipes(start, PAGE_SIZE);
    };

    const getPage = (pageNumber: number): RecipeResponse[] => {
        const start = pageNumber * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        if (start >= recipes.length) {
            throw new Error("Page number out of bound");
        }
        if (end >= recipes.length) {
            return recipes.slice(start);
        }

        return recipes.slice(start, end);
    };

    const refresh = (): void => {
        setIsEmpty(false);
        setEnded(false);
        setRecipes([]);
        setCurrentPage(0);
    };

    return { getNext, getPrev, getPage, refresh, recipes, isEmpty, ended };
};

export const useFetchResUri = (): useFetchResUriReturn => {
    const [resourceUri, setResourceUri] = useState<string>("");

    const { getReq } = useFetch({
        authorizationRequired: true,
        timeout: 10000,
    });

    const fetchResourceUri = async (keyId: string): Promise<boolean> => {
        const resource = await getReq(GET_RESOURCE_URL);
        if (resource == null || !("url" in resource)) {
            return false;
        }

        setResourceUri(resource.url);
        return true;
    };

    return { fetchResourceUri, resourceUri };
};

// TODO: Implement this later
// export const useUserTips = () => {};
