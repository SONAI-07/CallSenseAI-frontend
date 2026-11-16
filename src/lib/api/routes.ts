// Single source of truth. Mirrors app/routes/* in CallSense-AI.
export const ROUTES = {
    health: "/health",
    ready: "/ready",
    authLogin: "/auth/login",
    authSignup: "/auth/signup",
    authMe: "/auth/me",
    dashboardSummary: "/dashboard/summary",
    customers: "/customers",
    calls: "/calls",
    call: (id: number) => `/calls/${id}`,
    callInsight: (callId: number) => `/calls/${callId}/insight`,
    outbound: "/calls/outbound",
    agents: "/agents",
    agent: (id: number) => `/agents/${id}`,
    campaigns: "/campaigns",
} as const;