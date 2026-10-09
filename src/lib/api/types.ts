// Exact Pydantic mirrors from CallSense-AI backend

export type TokenResponse = { access_token: string; token_type: "bearer" };

export type UserResponse = { id: number; email: string; is_active: boolean };

export type MeResponse = { user: UserResponse; tenant_id: number; tenant_name: string };

export type DashboardSummary = {
    total_calls: number;
    completed_calls: number;
    failed_calls: number;
    total_call_duration_seconds: number;
    total_customers: number;
    strong_interest_calls: number;
    neutral_calls: number;
    not_interested_calls: number;
    whatsapp_actions_executed: number;
    email_actions_executed: number;
    follow_up_actions_executed: number;
};

export type CustomerResponse = {
    id: number;
    name: string;
    phone_number: string;
    email: string | null;
    created_at: string;
};

export type CallResponse = {
    id: number;
    customer_id: number;
    agent_id: number | null;
    campaign_id: number | null;
    twilio_call_sid: string | null;
    status: string;
    started_at: string | null;
    ended_at: string | null;
};

export type CallInsightResponse = {
    id: number;
    call_id: number;
    customer_id: number;
    classification: string; // "STRONG" | "NEUTRAL" | "NOT_INTERESTED"
    purchase_probability: number;
    interest_score: number;
    summary: string;
    important_details: Record<string, unknown>;
    created_at: string;
};

export type OutboundCallRequest = {
    customer_id: number;
    agent_id: number;
    campaign_id?: number | null;
};