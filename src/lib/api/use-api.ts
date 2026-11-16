"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, getToken } from "./client";

type ApiState<T> = { data: T | null; loading: boolean; error: ApiError | null; demo: boolean };

export function useApi<T>(fetcher: () => Promise<T>, fallback: T): ApiState<T> & { refetch: () => void } {
    const fallbackRef = useRef(fallback);           // stable identity — kills the render loop
    const seq = useRef(0);
    const [state, setState] = useState<ApiState<T>>({ data: null, loading: true, error: null, demo: false });

    const load = useCallback(async () => {
        const id = ++seq.current;
        setState((p) => ({ ...p, loading: true, error: null }));

        if (!getToken()) {                          // demo mode: never hit the network
            setState({ data: fallbackRef.current, loading: false, error: null, demo: true });
            return;
        }
        try {
            const data = await fetcher();
            if (id === seq.current) setState({ data, loading: false, error: null, demo: false });
        } catch (err) {
            if (id !== seq.current) return;
            if (err instanceof ApiError && (err.status === 0 || err.status === 401 || err.status >= 500)) {
                setState({ data: fallbackRef.current, loading: false, error: null, demo: true });
            } else {
                setState((p) => ({
                    ...p, loading: false, demo: false,
                    error: err instanceof ApiError ? err : new ApiError(0, "Unexpected error"),
                }));
            }
        }
    }, [fetcher]);

    useEffect(() => {
        const t = setTimeout(load, 0);
        return () => { clearTimeout(t); seq.current++; };
    }, [load]);

    return { ...state, refetch: load };
}