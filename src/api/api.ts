import {API_URL} from "@/config/api.ts";
import type {PageResponse} from "@/types/types.ts";
import axios from "axios";
import type {AuthResponse} from "@/types/auth.ts";

type FetchOptions<T> = {
    params?: Record<string, string>,
    onSuccess: (data: PageResponse<T>) => void,
    onError?: (error: any) => void,
    loading?: (loading: boolean) => void
}

export const fetchData = async <T> (pathApi: string, options?: FetchOptions<T>) => {
    try {
        options?.loading?.(true);
        const params = options?.params ? new URLSearchParams(options?.params).toString() : "";
        const response = await fetch(`${API_URL}${pathApi}?${params}`);
        const data: PageResponse<T> = await response.json();
        options?.loading?.(false);
        options?.onSuccess(data);
    } catch (error) {
        options?.loading?.(false);
        console.error("Failed to fetch data:", error);
        options?.onError?.(error);
    }
}

type FetchSingleOptions<T> = {
    onSuccess: (data: T) => void;
    onError?: (error: any) => void;
    loading?: (loading: boolean) => void;
};

export const fetchOne = async <T>(pathApi: string, options?: FetchSingleOptions<T>) => {
    try {
        options?.loading?.(true);

        const response = await fetch(`${API_URL}${pathApi}`);
        const data: T = await response.json();

        options?.loading?.(false);
        options?.onSuccess(data);
    } catch (error) {
        options?.loading?.(false);
        options?.onError?.(error);
    }
};

let accessToken: string | null = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const api = axios.create({
    baseURL: `${API_URL}/`,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post<AuthResponse>(
                    `${API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error("Refresh failed");
                setAccessToken(null);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
