export class ApiError extends Error {
    constructor(public status: number, message: string) { super(message); }
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
export const API_CONFIGURED = API_BASE !== "";

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("callsense_token");
}
export function setToken(token: string | null) {
    if (typeof window === "undefined") return;
    token ? window.localStorage.setItem("callsense_token", token) : window.localStorage.removeItem("callsense_token");
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
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new ApiError(res.status, `API ${res.status} ${path}${body ? ` — ${body.slice(0, 200)}` : ""}`);
    }
    return (await res.json()) as T;
}