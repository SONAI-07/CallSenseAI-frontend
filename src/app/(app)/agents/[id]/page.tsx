"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, Mail, MessageCircle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Waveform } from "@/components/waveform";
import { agents, callTrend, type AgentStatus } from "@/lib/mock-data";

const chartConfig = {
    connected: { label: "Connected", color: "#1b1613" },
    calls: { label: "Dialed", color: "#8a7a66" },
} satisfies ChartConfig;

const dotTone: Record<AgentStatus, string> = {
    active: "bg-[#8f9e77]",
    paused: "bg-[#c9a06a]",
    draft: "bg-[#6f6355]",
};

const callStatus: Record<string, string> = {
    completed: "bg-[#8f9e77]",
    "no-answer": "bg-[#6f6355]",
    failed: "bg-[#b85c5c]",
};

const recentCalls = [
    { customer: "Rohit Sharma — Nexus Labs", status: "completed", outcome: "Strong interest", duration: "3:42", time: "12 min ago" },
    { customer: "Priya Nair — Craftline", status: "completed", outcome: "Follow-up scheduled", duration: "5:18", time: "38 min ago" },
    { customer: "Dev Patel — Ionix", status: "no-answer", outcome: "No answer", duration: "0:00", time: "1 hr ago" },
    { customer: "Sara Khan — Bloomly", status: "failed", outcome: "Provider error", duration: "0:12", time: "2 hrs ago" },
];

function Status({ tone, label }: { tone: string; label: string }) {
    return (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`size-1.5 rounded-full ${tone}`} />
            {label}
        </span>
    );
}

export default function AgentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const agent = agents.find((a) => a.id === params.id);

    if (!agent) {
        return (
            <Card className="surface-card border-border shadow-[var(--inset-highlight)]">
                <CardContent className="flex flex-col items-center gap-3 py-24 text-center">
                    <h1 className="text-lg font-medium text-foreground">Agent not found</h1>
                    <Button variant="outline" onClick={() => router.push("/agents")}>Back to agents</Button>
                </CardContent>
            </Card>
        );
    }

    const connected = Math.round((agent.calls * agent.connectedRate) / 100);
    const intent = [
        { label: "Strong interest", value: agent.interested, bar: "bg-primary" },
        { label: "Neutral", value: Math.round(connected * 0.22), bar: "bg-[#8a7a66]" },
        { label: "Not interested", value: Math.max(connected - agent.interested - Math.round(connected * 0.22), 0), bar: "bg-[#4a4038]" },
    ];
    const actions = [
        { icon: MessageCircle, label: "WhatsApp brochures sent", value: Math.round(agent.meetings * 1.4) },
        { icon: Mail, label: "Email brochures sent", value: Math.round(agent.meetings * 0.9) },
        { icon: CalendarCheck, label: "Follow-ups scheduled", value: agent.meetings },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/agents")}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${dotTone[agent.status]}`} />
                            <h1 className="text-2xl font-medium text-foreground">{agent.name}</h1>
                        </div>
                        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                            {agent.voice} · {agent.language} · deployed {agent.lastDeployed}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2">
                    <Waveform seed={agent.id} live={agent.status === "active"} className="text-primary" />
                    <div className="flex flex-col leading-none">
                        <span className="font-mono text-[11px] text-foreground">{agent.status === "active" ? "On air" : "Idle"}</span>
                        <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">{agent.calls.toLocaleString()} calls lifetime</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Calls dialed", value: agent.calls.toLocaleString() },
                    { label: "Connect rate", value: `${agent.connectedRate}%` },
                    { label: "Interested", value: agent.interested.toLocaleString() },
                    { label: "Meetings", value: agent.meetings.toLocaleString() },
                ].map((k) => (
                    <Card key={k.label} className="surface-card border-border shadow-[var(--inset-highlight)] transition-colors hover:border-[rgba(245,233,221,0.18)]">
                        <CardContent className="p-5">
                            <p className="text-xs text-muted-foreground">{k.label}</p>
                            <p className="mt-2 font-mono text-[28px] font-medium leading-none tabular-nums text-foreground">{k.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <section className="surface-paper rounded-2xl border border-[rgba(27,22,19,0.10)] p-6 lg:col-span-2">
                    <div>
                        <h2 className="text-base font-medium text-[#1b1613]">Call activity</h2>
                        <p className="mt-0.5 text-xs text-[#6f6355]">Last 7 days for this agent</p>
                    </div>
                    <div className="mt-4">
                        <ChartContainer config={chartConfig} className="h-56 w-full">
                            <AreaChart data={callTrend} accessibilityLayer margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillPaperDetail" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a67c52" stopOpacity={0.30} />
                                        <stop offset="100%" stopColor="#a67c52" stopOpacity={0.03} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="rgba(27,22,19,0.08)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} tick={{ fontSize: 11, fill: "#6f6355" }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="calls" stroke="#8a7a66" strokeWidth={1.5} fill="none" />
                                <Area type="monotone" dataKey="connected" stroke="#1b1613" strokeWidth={2} fill="url(#fillPaperDetail)" />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </section>

                <Card className="surface-raised border-border shadow-[var(--inset-highlight)]">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base font-medium">Intent breakdown</CardTitle>
                        <CardDescription className="text-xs">{connected.toLocaleString()} connected calls</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {intent.map((row) => (
                            <div key={row.label}>
                                <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                                    <span className="text-muted-foreground">{row.label}</span>
                                    <span className="tabular-nums text-foreground">{row.value.toLocaleString()}</span>
                                </div>
                                <div className="meter-ticks h-2 overflow-hidden rounded-full bg-[rgba(245,233,221,0.06)]">
                                    <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${connected ? (row.value / connected) * 100 : 0}%` }} />
                                </div>
                            </div>
                        ))}
                        <Separator />
                        <div className="space-y-2.5">
                            {actions.map((a) => (
                                <div key={a.label} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <a.icon className="size-4" /> {a.label}
                                    </span>
                                    <span className="font-mono font-medium tabular-nums text-foreground">{a.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="surface-card border-border shadow-[var(--inset-highlight)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium">Recent calls</CardTitle>
                    <CardDescription className="text-xs">Latest conversations handled by this agent</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    {recentCalls.map((call) => (
                        <div key={call.customer} className="flex flex-wrap items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium text-foreground">{call.customer}</p>
                                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{call.outcome} · {call.duration} · {call.time}</p>
                            </div>
                            <Status tone={callStatus[call.status] ?? "bg-[#6f6355]"} label={call.status} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}