export type AgentStatus = "active" | "paused" | "draft";

export interface Agent {
    id: string;
    name: string;
    description: string;
    status: AgentStatus;
    voice: string;
    language: string;
    calls: number;
    connectedRate: number;
    interested: number;
    meetings: number;
    lastDeployed: string;
}

export const agents: Agent[] = [
    { id: "ag_9f2e", name: "Aarav — Outbound Sales", description: "Qualifies startup leads and books product demos.", status: "active", voice: "Murf • Aarav", language: "en-IN", calls: 1284, connectedRate: 68, interested: 342, meetings: 96, lastDeployed: "2h ago" },
    { id: "ag_41bb", name: "Diya — Customer Care", description: "Handles support follow-ups and renewal reminders.", status: "active", voice: "Murf • Diya", language: "en-IN", calls: 862, connectedRate: 71, interested: 208, meetings: 41, lastDeployed: "5h ago" },
    { id: "ag_77c1", name: "Kabir — Lead Reactivation", description: "Re-engages cold leads from previous campaigns.", status: "paused", voice: "Murf • Kabir", language: "hi-IN", calls: 431, connectedRate: 54, interested: 87, meetings: 12, lastDeployed: "3d ago" },
    { id: "ag_0d58", name: "Meera — Event Outreach", description: "Invites incubator founders to demo-day webinars.", status: "draft", voice: "Murf • Meera", language: "en-IN", calls: 0, connectedRate: 0, interested: 0, meetings: 0, lastDeployed: "—" },
];

export const callTrend = [
    { day: "Mon", calls: 186, connected: 124 },
    { day: "Tue", calls: 214, connected: 151 },
    { day: "Wed", calls: 168, connected: 109 },
    { day: "Thu", calls: 242, connected: 176 },
    { day: "Fri", calls: 298, connected: 214 },
    { day: "Sat", calls: 121, connected: 74 },
    { day: "Sun", calls: 96, connected: 61 },
];

export const  kpis = [
    { label: "Total Calls", value: "2,721", delta: "+12.4%", positive: true },
    { label: "Connected Calls", value: "1,849", delta: "+8.1%", positive: true },
    { label: "Interested Leads", value: "637", delta: "+21.9%", positive: true },
    { label: "Meetings Scheduled", value: "149", delta: "-2.3%", positive: false },
];