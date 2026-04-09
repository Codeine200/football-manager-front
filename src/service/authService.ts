import { api } from '@/api/api';
import type {AuthResponse, LoginRequest} from "@/types/auth.ts";

export const authService = {
    login: async (data: LoginRequest) => {
        const res = await api.post<AuthResponse>('/auth/login', data);
        return res.data;
    },

    refresh: async () => {
        const res = await api.post<AuthResponse>('/auth/refresh');
        return res.data.accessToken;
    },

    logout: async () => {
        await api.post('/auth/logout');
    }
};