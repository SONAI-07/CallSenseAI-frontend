"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useApi<T>(fetcher: () => Promise<T>, fallback?: T) {
    const fetcherRef = useRef(fetcher);
    const fallbackRef = useRef(fallback);
    fetcherRef.current = fetcher;
    fallbackRef.current = fallback;

    const [state, setState] = useState<{ data: T | null; loading: boolean; error: string | null; demo: boolean }>({
        data: fallbackRef.current ?? null, loading: true, error: null, demo: false,
    });

    const load = useCallback(() => {
        setState((s) => ({ ...s, loading: true, error: null }));
        fetcherRef.current()
            .then((data) => setState({ data, loading: false, error: null, demo: false }))
            .catch((err: Error) => {
                if (fallbackRef.current !== undefined) setState({ data: fallbackRef.current, loading: false, error: null, demo: true });
                else setState({ data: null, loading: false, error: err.message, demo: false });
            });
    }, []);

    useEffect(() => { load(); }, [load]);
    return { ...state, refetch: load };
}