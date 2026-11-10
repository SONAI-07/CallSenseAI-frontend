"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, setToken } from "./client";
import type { MeResponse } from "./types";
import { me } from "./";

type AuthState = {
    user: MeResponse | null;
    loading: boolean;
    isAuthenticated: boolean;
};

export function useAuth() {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true,
        isAuthenticated: false,
    });

    const logout = useCallback(() => {
        setToken(null);
        setState({
            user: null,
            loading: false,
            isAuthenticated: false,
        });
        router.push("/login");
    }, [router]);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            // Defer setState to avoid synchronous render
            const timeoutId = setTimeout(() => {
                setState({
                    user: null,
                    loading: false,
                    isAuthenticated: false,
                });
            }, 0);
            return () => clearTimeout(timeoutId);
        }

        let cancelled = false;

        me()
            .then((data) => {
                if (!cancelled) {
                    setState({
                        user: data,
                        loading: false,
                        isAuthenticated: true,
                    });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setToken(null);
                    setState({
                        user: null,
                        loading: false,
                        isAuthenticated: false,
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        ...state,
        logout,
    };
}