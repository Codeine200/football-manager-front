import { useEffect, useState, useCallback } from "react";
import { getAccessToken, setAccessToken } from "@/api/api";
import {authService} from '@/service/authService';
import type {LoginRequest} from "@/types/auth.ts";

type AuthState = {
    isAuth: boolean;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
};

export const useAuth = (): AuthState => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getAccessToken();

            if (accessToken) {
                setIsAuth(true);
                setLoading(false);
                return;
            }

            try {
                const token = await authService.refresh();
                setAccessToken(token);
                setIsAuth(true);
            } catch {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = useCallback(async (data: LoginRequest) => {
        const res = await authService.login(data);
        setAccessToken(res.accessToken);
        setIsAuth(true);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {}
        setAccessToken(null);
        setIsAuth(false);
    }, []);

    return { isAuth, loading, login, logout };
};