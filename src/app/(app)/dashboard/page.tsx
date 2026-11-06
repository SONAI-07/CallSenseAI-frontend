"use client";

import { motion } from "framer-motion";
import { KeyRound, PhoneCall, Plus, SlidersHorizontal, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DemoNotice } from "@/components/demo-notice";
import { getDashboardSummary, listCalls } from "@/lib/api";
import { useApi } from "@/lib/api/use-api";
import { agents, callTrend, type AgentStatus, type CallResponse } from "@/lib/mock-data";

const chartConfig = {
    connected: { label: "Connected", color: "#1b1613" },
    calls: { label: "Dialed", color: "#8a7a66" },
} satisfies ChartConfig;

const dotTone = {
    olive: "bg-[#8f9e77]",
    brick: "bg-[#b85c5c]",
    amber: "bg-[#c9a06a]",
    muted: "bg-[#6f6355]",
} as const;

function Status({ kind, label }: { kind: keyof typeof dotTone; label: string }) {
    return (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`size-1.5 rounded-full ${dotTone[kind]}`} />
            {label}
        </span>
    );
}

const agentStatus: Record<AgentStatus, keyof typeof dotTone> = { active: "olive", paused: "amber", draft: "muted" };
const callStatus: Record<string, keyof typeof dotTone> = { completed: "olive", failed: "brick", initiating: "amber", initiated: "amber", "no-answer": "muted" };

const fallbackSummary = {
    total_calls: 2721, completed_calls: 1849, failed_calls: 121, total_call_duration_seconds: 98460,
    total_customers: 512, strong_interest_calls: 637, neutral_calls: 420, not_interested_calls: 792,
    whatsapp_actions_executed: 208, email_actions_executed: 134, follow_up_actions_executed: 149,
};

function buildTrend(calls: CallResponse[]) {
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return { key: d.toISOString().slice(0, 10), day: d.toLocaleDateString("en-US", { weekday: "short" }), calls: 0, connected: 0 };
    });
    const idx = new Map(days.map((d) => [d.key, d]));
    for (const c of calls) {
        const row = c.started_at ? idx.get(c.started_at.slice(0, 10)) : undefined;
        if (!row) continue;
        row.calls += 1;
        if (c.status === "completed") row.connected += 1;
    }
    return days;
}

const timeAgo = (iso: string | null) => {
    if (!iso) return "—";
    const s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
};
const duration = (a: string | null, b: string | null) => {
    if (!a || !b) return "—";
    const sec = Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 1000));
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

export default function DashboardPage() {
    const summary = useApi(getDashboardSummary, fallbackSummary);
    const calls = useApi(listCalls, [] as CallResponse[]);
    const s = summary.data ?? fallbackSummary;
    const realCalls = calls.data ?? [];
    const demo = summary.demo || calls.demo;
    const trend = realCalls.length ? buildTrend(realCalls) : callTrend;
    const recent = [...realCalls].sort((a, b) => (b.started_at ?? "").localeCompare(a.started_at ?? "")).slice(0, 6);
    const period = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const connectRate = s.total_calls ? Math.round((s.completed_calls / s.total_calls) * 100) : 0;

    const kpis = [
        { label: "Calls dialed", value: s.total_calls.toLocaleString(), sub: `${s.failed_calls} failed` },
        { label: "Connected", value: s.completed_calls.toLocaleString(), sub: `${connectRate}% of dialed` },
        { label: "Strong interest", value: s.strong_interest_calls.toLocaleString(), sub: `${s.neutral_calls} neutral` },
        { label: "Meetings booked", value: s.follow_up_actions_executed.toLocaleString(), sub: `${s.whatsapp_actions_executed} WhatsApp · ${s.email_actions_executed} email` },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
            <DemoNotice show={demo} />

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-medium text-foreground">{period}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Call outcomes across your deployed agents</p>
                </div>
                <Button><Plus className="size-4" /> New agent</Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((k) => (
                    <Card key={k.label} className="surface-card border-border shadow-[var(--inset-highlight)] transition-colors hover:border-[rgba(245,233,221,0.18)]">
                        <CardContent className="p-5">
                            <p className="text-xs text-muted-foreground">{k.label}</p>
                            <p className="mt-2 font-mono text-[28px] font-medium leading-none tabular-nums text-foreground">
                                {summary.loading ? "—" : k.value}
                            </p>
                            <p className="mt-2 font-mono text-[11px] text-muted-foreground">{k.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {/* The bright moment: cream paper panel */}
                <section className="surface-paper rounded-2xl border border-[rgba(27,22,19,0.10)] p-6 lg:col-span-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                            <h2 className="text-base font-medium text-[#1b1613]">Call activity</h2>
                            <p className="mt-0.5 text-xs text-[#6f6355]">
                                {realCalls.length ? "Last 7 days, from live call records" : "Sample trend — backend offline"}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 font-mono text-[11px] text-[#6f6355]">
                            <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-[#1b1613]" /> Connected</span>
                            <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full bg-[#8a7a66]" /> Dialed</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ChartContainer config={chartConfig} className="h-72 w-full">
                            <AreaChart data={trend} accessibilityLayer margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillPaper" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a67c52" stopOpacity={0.30} />
                                        <stop offset="100%" stopColor="#a67c52" stopOpacity={0.03} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="rgba(27,22,19,0.08)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} tick={{ fontSize: 11, fill: "#6f6355" }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="calls" stroke="#8a7a66" strokeWidth={1.5} fill="none" />
                                <Area type="monotone" dataKey="connected" stroke="#1b1613" strokeWidth={2} fill="url(#fillPaper)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </section>

                <Card className="surface-raised border-border shadow-[var(--inset-highlight)]">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">Quick actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-1">
                        {[
                            { icon: PhoneCall, label: "Run a test call" },
                            { icon: Users, label: "Add leads" },
                            { icon: KeyRound, label: "View API keys" },
                            { icon: SlidersHorizontal, label: "Agent configuration" },
                        ].map((a) => (
                            <Button key={a.label} variant="ghost" className="justify-start gap-3 px-2.5 font-normal text-muted-foreground transition-all hover:translate-x-0.5 hover:bg-[rgba(245,233,221,0.06)] hover:text-foreground">
                                <a.icon className="size-4" /> {a.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="surface-card border-border shadow-[var(--inset-highlight)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium">Recent calls</CardTitle>
                    <CardDescription className="text-xs">{realCalls.length ? "Live from GET /calls" : "No live call records yet"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-xs font-normal text-muted-foreground">Call</TableHead>
                                <TableHead className="text-xs font-normal text-muted-foreground">Status</TableHead>
                                <TableHead className="text-xs font-normal text-muted-foreground">Duration</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Started</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recent.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                                        No calls recorded yet — launch one from the backend to see it here
                                    </TableCell>
                                </TableRow>
                            )}
                            {recent.map((c) => (
                                <TableRow key={c.id} className="transition-colors hover:bg-[rgba(245,233,221,0.03)]">
                                    <TableCell>
                                        <div className="text-sm font-medium text-foreground">Call #{c.id}</div>
                                        <div className="font-mono text-[11px] text-muted-foreground">customer #{c.customer_id}</div>
                                    </TableCell>
                                    <TableCell><Status kind={callStatus[c.status] ?? "muted"} label={c.status} /></TableCell>
                                    <TableCell className="font-mono text-sm tabular-nums">{duration(c.started_at, c.ended_at)}</TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{timeAgo(c.started_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="surface-card border-border shadow-[var(--inset-highlight)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium">Deployed agents</CardTitle>
                    <CardDescription className="text-xs">Fleet overview for this workspace</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-xs font-normal text-muted-foreground">Agent</TableHead>
                                <TableHead className="text-xs font-normal text-muted-foreground">Status</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Calls</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Connected</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Interested</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Meetings</TableHead>
                                <TableHead className="text-right text-xs font-normal text-muted-foreground">Deployed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.map((agent) => (
                                <TableRow key={agent.id} className="transition-colors hover:bg-[rgba(245,233,221,0.03)]">
                                    <TableCell>
                                        <div className="text-sm font-medium text-foreground">{agent.name}</div>
                                        <div className="text-xs text-muted-foreground">{agent.voice} · {agent.language}</div>
                                    </TableCell>
                                    <TableCell><Status kind={agentStatus[agent.status]} label={agent.status} /></TableCell>
                                    <TableCell className="text-right font-mono text-sm tabular-nums">{agent.calls.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-mono text-sm tabular-nums">{agent.connectedRate}%</TableCell>
                                    <TableCell className="text-right font-mono text-sm tabular-nums">{agent.interested.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-mono text-sm tabular-nums">{agent.meetings.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{agent.lastDeployed}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}