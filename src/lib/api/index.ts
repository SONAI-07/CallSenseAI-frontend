import { api } from "./client";
import type {
    CallInsightResponse, CallResponse, CustomerResponse, DashboardSummary,
    MeResponse, OutboundCallRequest, TokenResponse,
} from "./types";

const R = {
    login: "/auth/login",
    signup: "/auth/signup",
    me: "/auth/me",
    dashboardSummary: "/dashboard/summary",
    customers: "/customers",
    calls: "/calls",
    call: (id: number) => `/calls/${id}`,
    callInsight: (callId: number) => `/calls/${callId}/insight`,
    outbound: "/calls/outbound",
} as const;

export const login = (email: string, password: string) =>
    api<TokenResponse>(R.login, { method: "POST", body: JSON.stringify({ email, password }) });

export const signup = (email: string, password: string, tenant_name: string) =>
    api<TokenResponse>(R.signup, { method: "POST", body: JSON.stringify({ email, password, tenant_name }) });

export const me = () => api<MeResponse>(R.me);

export const getDashboardSummary = () => api<DashboardSummary>(R.dashboardSummary);
export const listCustomers = () => api<CustomerResponse[]>(R.customers);
export const listCalls = () => api<CallResponse[]>(R.calls);
export const getCall = (id: number) => api<CallResponse>(R.call(id));
export const getCallInsight = (callId: number) => api<CallInsightResponse>(R.callInsight(callId));
export const createOutboundCall = (payload: OutboundCallRequest) =>
    api<CallResponse>(R.outbound, { method: "POST", body: JSON.stringify(payload) });