"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, Mail, MessageCircle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { agents, callTrend, type AgentStatus } from "@/lib/mock-data";
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
    "no-answer": "border-border/60 bg-muted/40 text-muted-foreground",
    failed: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const recentCalls = [
    { customer: "Rohit Sharma — Nexus Labs", status: "completed", outcome: "Strong interest", duration: "3:42", time: "12 min ago" },
    { customer: "Priya Nair — Craftline", status: "completed", outcome: "Follow-up scheduled", duration: "5:18", time: "38 min ago" },
    { customer: "Dev Patel — Ionix", status: "no-answer", outcome: "No answer", duration: "0:00", time: "1 hr ago" },
    { customer: "Sara Khan — Bloomly", status: "failed", outcome: "Provider error", duration: "0:12", time: "2 hrs ago" },
];

export default function AgentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const agent = agents.find((a) => a.id === params.id);

    if (!agent) {
        return (
            <Card className="border-border/60 bg-card/60">
                <CardContent className="flex flex-col items-center gap-3 py-24 text-center">
                    <h1 className="text-lg font-semibold">Agent not found</h1>
                    <Button variant="outline" onClick={() => router.push("/agents")}>Back to agents</Button>
                </CardContent>
            </Card>
        );
    }

    const connected = Math.round((agent.calls * agent.connectedRate) / 100);
    const intent = [
        { label: "Strong interest", value: agent.interested, bar: "bg-emerald-500" },
        { label: "Neutral", value: Math.round(connected * 0.22), bar: "bg-amber-500" },
        { label: "Not interested", value: Math.max(connected - agent.interested - Math.round(connected * 0.22), 0), bar: "bg-rose-500" },
    ];
    const actions = [
        { icon: MessageCircle, label: "WhatsApp brochures sent", value: Math.round(agent.meetings * 1.4) },
        { icon: Mail, label: "Email brochures sent", value: Math.round(agent.meetings * 0.9) },
        { icon: CalendarCheck, label: "Follow-ups scheduled", value: agent.meetings },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.push("/agents")}>
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold tracking-tight">{agent.name}</h1>
                        <Badge variant="secondary" className={cn("capitalize", statusStyles[agent.status])}>{agent.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{agent.voice} • {agent.language} • deployed {agent.lastDeployed}</p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Calls dialed", value: agent.calls.toLocaleString() },
                    { label: "Connect rate", value: `${agent.connectedRate}%` },
                    { label: "Interested", value: agent.interested.toLocaleString() },
                    { label: "Meetings", value: agent.meetings.toLocaleString() },
                ].map((k) => (
                    <Card key={k.label} className="border-border/60 bg-card/60">
                        <CardContent className="p-5">
                            <p className="text-xs text-muted-foreground">{k.label}</p>
                            <p className="mt-1 text-2xl font-semibold tabular-nums">{k.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <Card className="border-border/60 bg-card/60 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Call activity</CardTitle>
                        <CardDescription>Last 7 days for this agent</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-56 w-full">
                            <AreaChart data={callTrend} accessibilityLayer>
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
                        <CardTitle>Intent breakdown</CardTitle>
                        <CardDescription>{connected.toLocaleString()} connected calls</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {intent.map((row) => (
                            <div key={row.label}>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-muted-foreground">{row.label}</span>
                                    <span className="tabular-nums">{row.value.toLocaleString()}</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                    <div className={cn("h-full rounded-full", row.bar)} style={{ width: `${connected ? (row.value / connected) * 100 : 0}%` }} />
                                </div>
                            </div>
                        ))}
                        <Separator />
                        <div className="space-y-2.5">
                            {actions.map((a) => (
                                <div key={a.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <a.icon className="size-4 text-violet-400" /> {a.label}
                  </span>
                                    <span className="font-medium tabular-nums">{a.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/60 bg-card/60">
                <CardHeader>
                    <CardTitle>Recent calls</CardTitle>
                    <CardDescription>Latest conversations handled by this agent</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border/60">
                    {recentCalls.map((call) => (
                        <div key={call.customer} className="flex flex-wrap items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-medium">{call.customer}</p>
                                <p className="text-xs text-muted-foreground">{call.outcome} • {call.duration} • {call.time}</p>
                            </div>
                            <Badge variant="secondary" className={callStatusStyles[call.status]}>{call.status}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}