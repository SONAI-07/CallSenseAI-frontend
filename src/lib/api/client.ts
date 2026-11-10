export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
export const API_CONFIGURED = API_BASE !== "";

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("callsense_token");
}

export function setToken(token: string | null) {
    if (typeof window === "undefined") return;
    if (token) {
        window.localStorage.setItem("callsense_token", token);
    } else {
        window.localStorage.removeItem("callsense_token");
    }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    if (!API_CONFIGURED) {
        throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured");
    }

    const token = getToken();
    let res: Response;

    try {
        res = await fetch(`${API_BASE}${path}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(init?.headers ?? {}),
            },
        });
    } catch (error) {
        throw new ApiError(0, "Backend unreachable");
    }

    // ✅ Handle token expiry - redirect to login on 401
    if (res.status === 401) {
        setToken(null);

        // Only redirect if not already on login page
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
        }

        throw new ApiError(401, "Session expired. Please sign in again.");
    }

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(
            res.status,
            `API ${res.status} ${path}${body ? ` — ${body.slice(0, 200)}` : ""}`
        );
    }

    return (await res.json()) as T;
}