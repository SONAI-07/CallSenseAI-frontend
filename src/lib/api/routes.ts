// ✅ Verified against the backend repo (Phase 0 crawl)
// ⚠️ TODO items: confirm exact prefixes in FastAPI Swagger → http://localhost:8000/docs
export const ROUTES = {
    health: "/health",                       // ✅
    ready: "/ready",                         // ✅
    dashboardSummary: "/dashboard/summary",  // ✅
    calls: "/calls",                         // ✅
    call: (id: number) => `/calls/${id}`,    // ✅
    outbound: "/calls/outbound",             // ✅ POST { customer_id }
    authLogin: "/auth/login",                // ⚠️ verify
    customers: "/customers",                 // ⚠️ verify
    callInsights: "/call-insights",          // ⚠️ verify
} as const;