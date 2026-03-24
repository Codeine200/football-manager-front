import {API_URL} from "@/config/api.ts";
import type {PageResponse} from "@/types/types.ts";

type FetchOptions<T> = {
    params?: Record<string, string>,
    onSuccess: (data: PageResponse<T>) => void,
    onError?: (error: any) => void,
    loading?: (loading: boolean) => void
}

const fetchData = async <T> (pathApi: string, options?: FetchOptions<T>) => {
    try {
        options?.loading?.(true);
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(500);
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

export default fetchData;