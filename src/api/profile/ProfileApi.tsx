import { useState } from "react";
import { useFetch } from "../baseApiHook";
import { getKeychainValue } from "@/common/KeychainServices";
import { KEYCHAIN_ID } from "@env";
import { type Undefinable } from "@/common/types";
import { decode as decodeBase64 } from "base-64";

interface Followership {
    id: string;
    followerId: string;
    followingId: string;
}

interface ProfileInfo {
    id: string;
    username: string;
    userId: string;
    isFollowing: string;
    followersCount: number;
    followingCount: number;
    avatar: string;
    followerships: Followership[];
}

interface UseProfileInfoReturn {
    profileInfo: Undefinable<ProfileInfo>;
    fetchPersonalProfile: () => Promise<boolean>;
    fetchUserProfile: (userId: string) => Promise<boolean>;
}

const parseJwt = (token: string): any => {
    const base64Url = token.split(".")[1];
    const jsonPayload = decodeBase64(base64Url);
    return JSON.parse(jsonPayload);
};

export const useProfileInfo = (): UseProfileInfoReturn => {
    const { getReq } = useFetch({ authorizationRequired: true });

    const [profileInfo, setProfileInfo] = useState<ProfileInfo>();

    const getUserIdFromToken = async (): Promise<string> => {
        const token = await getKeychainValue(KEYCHAIN_ID);
        const payload = parseJwt(token);
        if (payload == null || typeof payload === "string") {
            throw new Error();
        }

        return payload.nameid;
    };

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
