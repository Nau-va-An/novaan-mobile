import { getKeychainValue } from "@/common/KeychainServices";
import { API_URL, API_TIMEOUT, KEYCHAIN_ID } from "@env";
import { useNavigation } from "@react-navigation/core";
import { type RootStackParamList } from "@root/App";
import { useCallback } from "react";
import UnauthorizedError from "./errors/Unauthorized";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RequestConfig {
    timeout?: number;
    authorizationRequired?: boolean;
    contentType?: string;
    needJsonBody?: boolean;
}

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

type ApiRequest = (url: string) => Promise<any>;
type ApiRequestWithBody = (url: string, body: any) => Promise<any>;

interface UseFetchReturn {
    getReq: ApiRequest;
    postReq: ApiRequestWithBody;
    putReq: ApiRequestWithBody;
    deleteReq: ApiRequest;
}

const getDefaultConfig = (): RequestConfig => {
    return {
        timeout: Number(API_TIMEOUT),
        authorizationRequired: false,
    };
};

export const useFetch = (config?: RequestConfig): UseFetchReturn => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Substitute missing config
    config = { ...getDefaultConfig(), ...config };

    const getHeaders = useCallback(
        async (accessTokenRequired: boolean = false): Promise<Headers> => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            headers.append(
                "Access-Control-Allow-Origin",
                "http://localhost:3000"
            );
            headers.append(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );

            if (accessTokenRequired) {
                // Get access token from secure storage
                const accessToken = await getKeychainValue(KEYCHAIN_ID);
                if (accessToken == null) {
                    throw new Error("Access token not found");
                }
                headers.append("Authorization", `Bearer ${accessToken}`);
            }

            return headers;
        },
        []
    );

    const handleServerError = useCallback(
        (error: Error) => {
            // Return to sign in page if unauthorized
            if (error instanceof UnauthorizedError) {
                navigation.navigate("SignIn");
                return true;
            }

            return false;
        },
        [navigation]
    );

    const sendBaseRequest = useCallback(
        async (url: string, method: HttpMethod, body?: any): Promise<any> => {
            try {
                const headers = await getHeaders(config.authorizationRequired);

                // Use signal to avoid running the request for too long
                // Docs for canceling fetch API request
                // https://javascript.info/fetch-abort
                const timeout = config.timeout;
                const controller = new AbortController();
                if (isNaN(timeout) || timeout <= 0) {
                    throw new Error(
                        "Timeout value is not valid. Please reconfig in .env"
                    );
                }

                const timeoutId = setTimeout(() => {
                    controller.abort();
                }, timeout);

                const response = await fetch(`${API_URL}${url}`, {
                    method,
                    headers,
                    body: JSON.stringify(body),
                    signal: controller.signal,
                });

                if (response.status === 401) {
                    throw new UnauthorizedError();
                }

                clearTimeout(timeoutId);

                // Avoid empty response body from server
                try {
                    const body = await response.json();
                    return body;
                } catch {
                    return true;
                }
            } catch (err) {
                if (handleServerError(err)) {
                    return;
                }

                throw err;
            }
        },
        [config, getHeaders, handleServerError]
    );

    const getReq = useCallback(
        async (url: string): Promise<any> => {
            return await sendBaseRequest(url, HttpMethod.GET);
        },
        [sendBaseRequest]
    );

    const postReq = useCallback(
        async (url: string, body: any): Promise<any> => {
            return await sendBaseRequest(url, HttpMethod.POST, body);
        },
        [sendBaseRequest]
    );

    const putReq = useCallback(
        async (url: string, body: any): Promise<any> => {
            return await sendBaseRequest(url, HttpMethod.PUT, body);
        },
        [sendBaseRequest]
    );

    const deleteReq = useCallback(
        async (url: string): Promise<any> => {
            return await sendBaseRequest(url, HttpMethod.DELETE);
        },
        [sendBaseRequest]
    );

    return { getReq, postReq, putReq, deleteReq };
};
