export class ApiError extends Error {
    constructor(public status: number, message: string) { super(message); }
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
export const API_CONFIGURED = API_BASE !== "";

const KEY = "callsense_token";

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(KEY);
}

export function setToken(token: string | null) {
    if (typeof window === "undefined") return;
    if (token) window.localStorage.setItem(KEY, token);
    else window.localStorage.removeItem(KEY);
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    if (!API_CONFIGURED) throw new ApiError(0, "NEXT_PUBLIC_API_URL is not configured");

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
    } catch {
        throw new ApiError(0, "Backend unreachable");
    }

    if (res.status === 401) {
        const hadToken = Boolean(token);
        if (hadToken) {
            setToken(null);
            if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
                // Non-React module: full reload is intentional to reset all client state.
                // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                window.location.replace("/login");
            }
        }
        throw new ApiError(401, hadToken ? "Session expired. Please sign in again." : "Not authenticated");
    }

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(res.status, `API ${res.status} ${path}${body ? ` — ${body.slice(0, 200)}` : ""}`);
    }
    return (await res.json()) as T;
}