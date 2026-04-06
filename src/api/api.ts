import {API_URL} from "@/config/api.ts";
import type {PageResponse} from "@/types/types.ts";

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
