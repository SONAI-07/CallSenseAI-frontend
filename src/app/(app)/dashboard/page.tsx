"use client";

import { motion } from "framer-motion";
import { CalendarCheck, HeartHandshake, KeyRound, Phone, PhoneCall, Plus, SlidersHorizontal, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DemoNotice } from "@/components/demo-notice";
import { getDashboardSummary, listCalls } from "@/lib/api";
import { useApi } from "@/lib/api/use-api";
import { agents, callTrend, type AgentStatus, type CallResponse } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const chartConfig = {
    calls: { label: "Calls dialed", color: "var(--color-chart-1)" },
    connected: { label: "Connected", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const statusStyles: Record<AgentStatus, string> = {
    active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    paused: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    draft: "border-border/60 bg-muted/40 text-muted-foreground",
};

const callStatusStyles: Record<string, string> = {
    completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    failed: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    initiating: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    initiated: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
};

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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

export default function DashboardPage() {
    const summary = useApi(getDashboardSummary, fallbackSummary);
    const calls = useApi(listCalls, [] as CallResponse[]);
    const s = summary.data ?? fallbackSummary;
    const realCalls = calls.data ?? [];
    const demo = summary.demo || calls.demo;
    const trend = realCalls.length ? buildTrend(realCalls) : callTrend;
    const recent = [...realCalls].sort((a, b) => (b.started_at ?? "").localeCompare(a.started_at ?? "")).slice(0, 6);

    const kpis = [
        { label: "Total Calls", value: s.total_calls.toLocaleString(), sub: `${s.failed_calls} failed`, icon: Phone },
        { label: "Connected Calls", value: s.completed_calls.toLocaleString(), sub: `${s.total_calls ? Math.round((s.completed_calls / s.total_calls) * 100) : 0}% connect rate`, icon: PhoneCall },
        { label: "Interested Leads", value: s.strong_interest_calls.toLocaleString(), sub: `${s.neutral_calls} neutral`, icon: HeartHandshake },
        { label: "Meetings Scheduled", value: s.follow_up_actions_executed.toLocaleString(), sub: `${s.whatsapp_actions_executed} WA • ${s.email_actions_executed} email`, icon: CalendarCheck },
    ];

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <DemoNotice show={demo} />

            <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Good evening, Archan</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Here is what your voice agents accomplished.</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-500"><Plus className="size-4" /> New Agent</Button>
            </motion.div>

            <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                    <Card key={kpi.label} className="border-border/60 bg-card/60">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                            <kpi.icon className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight tabular-nums">{summary.loading ? "—" : kpi.value}</div>
                            <p className="mt-1.5 text-xs text-muted-foreground">{kpi.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <motion.div variants={item} className="grid gap-4 lg:grid-cols-3">
                <Card className="border-border/60 bg-card/60 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Call activity</CardTitle>
                        <CardDescription>{realCalls.length ? "Derived from live call records — last 7 days" : "Sample trend — backend offline"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                            <AreaChart data={trend} accessibilityLayer>
                                <CartesianGrid vertical={false} stroke="hsl(215 28% 17%)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="calls" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.22} strokeWidth={2} />
                                <Area type="monotone" dataKey="connected" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.14} strokeWidth={2} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/60 bg-card/60">
                    <CardHeader>
                        <CardTitle>Quick actions</CardTitle>
                        <CardDescription>Jump straight into a workflow</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        {[
                            { icon: PhoneCall, label: "Run a test call" },
                            { icon: Users, label: "Add leads" },
                            { icon: KeyRound, label: "View API keys" },
                            { icon: SlidersHorizontal, label: "Agent configuration" },
                        ].map((a) => (
                            <Button key={a.label} variant="ghost" className="justify-start gap-3 font-normal text-muted-foreground hover:text-foreground">
                                <a.icon className="size-4 text-violet-400" /> {a.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="border-border/60 bg-card/60">
                    <CardHeader>
                        <CardTitle>Recent calls</CardTitle>
                        <CardDescription>{realCalls.length ? "Live from GET /calls" : "No live call records yet"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Call</TableHead><TableHead>Status</TableHead><TableHead>Duration</TableHead><TableHead className="text-right">Started</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recent.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">No calls recorded yet — launch one from the backend to see it here.</TableCell></TableRow>
                                )}
                                {recent.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>
                                            <div className="font-medium">Call #{c.id}</div>
                                            <div className="text-xs text-muted-foreground">customer #{c.customer_id}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="secondary" className={callStatusStyles[c.status] ?? "border-border/60 bg-muted/40 text-muted-foreground"}>{c.status}</Badge></TableCell>
                                        <TableCell className="tabular-nums">{duration(c.started_at, c.ended_at)}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">{timeAgo(c.started_at)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="border-border/60 bg-card/60">
                    <CardHeader>
                        <CardTitle>Deployed agents</CardTitle>
                        <CardDescription>Sample fleet data — the backend does not expose an agents contract yet (required backend addition)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Agent</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Calls</TableHead><TableHead className="text-right">Connected</TableHead><TableHead className="text-right">Interested</TableHead><TableHead className="text-right">Meetings</TableHead><TableHead className="text-right">Deployed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.map((agent) => (
                                    <TableRow key={agent.id}>
                                        <TableCell>
                                            <div className="font-medium">{agent.name}</div>
                                            <div className="text-xs text-muted-foreground">{agent.voice} • {agent.language}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="secondary" className={cn("capitalize", statusStyles[agent.status])}>{agent.status}</Badge></TableCell>
                                        <TableCell className="text-right tabular-nums">{agent.calls.toLocaleString()}</TableCell>
                                        <TableCell className="text-right tabular-nums">{agent.connectedRate}%</TableCell>
                                        <TableCell className="text-right tabular-nums">{agent.interested}</TableCell>
                                        <TableCell className="text-right tabular-nums">{agent.meetings}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">{agent.lastDeployed}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}