import dotenv from "dotenv";
import { getKeychainValue } from "../keychain/KeychainService";
dotenv.config();

const API_URL = process.env.API_URL;
const API_TIMEOUT = process.env.API_TIMEOUT;
const KEYCHAIN_ID = process.env.KEYCHAIN_ID;

interface RequestConfig {
    timeout: number;
}

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export default class BaseApi {
    private readonly apiURL: string;
    private readonly keychainId: string;
    private readonly apiConfig: RequestConfig;

    constructor(apiConfig?: RequestConfig) {
        if (API_URL == null) {
            throw new Error("API_URL is not defined inside .env");
        }
        if (KEYCHAIN_ID == null) {
            throw new Error("KEYCHAIN_ID is not defined inside .env");
        }

        this.apiURL = API_URL;
        this.keychainId = KEYCHAIN_ID;

        if (apiConfig == null) {
            if (API_TIMEOUT == null) {
                throw new Error("API_TIMEOUT is not defined inside .env");
            }
            const timeout = Number(API_TIMEOUT);
            this.apiConfig = { timeout };
        } else {
            this.apiConfig = apiConfig;
        }
    }

    async getHeaders(): Promise<Headers> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        // This is the important part
        const accessToken = await getKeychainValue(this.keychainId);
        headers.append("Authorization", `Bearer ${accessToken}`);
        return headers;
    }

    async get<ResponseType>(url: string): Promise<ResponseType> {
        return await this.sendRequestBase(url, HttpMethod.GET, 3000);
    }

    async post<RequestType, ResponseType>(
        url: string,
        body: RequestType
    ): Promise<ResponseType> {
        return await this.sendRequestBase(url, HttpMethod.POST, body);
    }

    async put<RequestType, ResponseType>(
        url: string,
        body: RequestType
    ): Promise<ResponseType> {
        return await this.sendRequestBase(url, HttpMethod.PUT, body);
    }

    async delete<ResponseType>(url: string): Promise<ResponseType> {
        return await this.sendRequestBase(url, HttpMethod.DELETE, 3000);
    }

    async sendRequestBase(
        url: string,
        method: string,
        body?: any
    ): Promise<any> {
        const headers = await this.getHeaders();

        // Use signal to avoid running the request for too long
        const timeout = this.apiConfig.timeout;
        const controller = new AbortController();
        if (isNaN(timeout) || timeout <= 0) {
            throw new Error(
                "Timeout value is not valid. Please reconfig in .env"
            );
        }

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);

        const response = await fetch(`${this.apiURL}${url}`, {
            method,
            headers,
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        return await response.json();
    }
}
