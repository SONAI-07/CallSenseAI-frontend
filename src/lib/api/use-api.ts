"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./client";

type ApiState<T> = {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    demo: boolean;
};

export function useApi<T>(
    fetcher: () => Promise<T>,
    fallback: T
): ApiState<T> & { refetch: () => void } {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: null,
        demo: false,
    });

    const abortRef = useRef<AbortController | null>(null);
    const mountedRef = useRef(true);

    const fetchData = useCallback(async () => {
        // Cancel previous request
        if (abortRef.current) {
            abortRef.current.abort();
        }

        abortRef.current = new AbortController();

        // Use functional setState to avoid closure issues
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const data = await fetcher();

            if (mountedRef.current) {
                setState({
                    data,
                    loading: false,
                    error: null,
                    demo: false,
                });
            }
        } catch (err) {
            if (!mountedRef.current) return;

            if (err instanceof ApiError) {
                // Use fallback on auth or server errors
                if (err.status === 401 || err.status === 0) {
                    setState({
                        data: fallback,
                        loading: false,
                        error: null,
                        demo: true,
                    });
                } else {
                    setState((prev) => ({
                        ...prev,
                        loading: false,
                        error: err,
                        demo: false,
                    }));
                }
            } else {
                // Network or unexpected errors - use fallback
                setState({
                    data: fallback,
                    loading: false,
                    error: null,
                    demo: true,
                });
            }
        }
    }, [fetcher, fallback]);

    useEffect(() => {
        mountedRef.current = true;

        // Use microtask to defer setState and avoid synchronous render
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 0);

        return () => {
            mountedRef.current = false;
            clearTimeout(timeoutId);
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, [fetchData]);

    return {
        ...state,
        refetch: fetchData,
    };
}