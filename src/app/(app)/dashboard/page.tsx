"use client";

import { motion } from "framer-motion";
import {
    ArrowDownRight, ArrowUpRight, CalendarCheck, HeartHandshake,
    KeyRound, Phone, PhoneCall, Plus, SlidersHorizontal, Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { agents, callTrend, kpis, type AgentStatus } from "@/lib/mock-data";
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

const kpiIcons = [Phone, PhoneCall, HeartHandshake, CalendarCheck];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function DashboardPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Good evening, Archan</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Here is what your voice agents accomplished today.</p>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-500">
                    <Plus className="size-4" /> New Agent
                </Button>
            </motion.div>

            <motion.div variants={item}>
                <Card className="relative overflow-hidden border-violet-500/20">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/25 via-transparent to-cyan-500/10" />
                    <CardContent className="relative flex flex-wrap items-center justify-between gap-6 p-6">
                        <div className="max-w-xl">
                            <h2 className="text-xl font-semibold tracking-tight">Outbound sales on autopilot</h2>
                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Your agents dialed <span className="font-medium text-foreground">2,721 calls</span> this month and
                                booked <span className="font-medium text-foreground">149 meetings</span> — without a single human dialer.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="bg-violet-600 hover:bg-violet-500">Create Campaign</Button>
                            <Button variant="outline">View Docs</Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi, i) => {
                    const Icon = kpiIcons[i];
                    return (
                        <Card key={kpi.label} className="border-border/60 bg-card/60">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                                <Icon className="size-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-semibold tracking-tight">{kpi.value}</div>
                                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={cn("flex items-center gap-0.5 font-medium", kpi.positive ? "text-emerald-400" : "text-rose-400")}>
                    {kpi.positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {kpi.delta}
                  </span>
                                    vs last week
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </motion.div>

            <motion.div variants={item} className="grid gap-4 lg:grid-cols-3">
                <Card className="border-border/60 bg-card/60 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Call activity</CardTitle>
                        <CardDescription>Dialed vs connected calls — last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
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
                        <CardTitle>Quick actions</CardTitle>
                        <CardDescription>Jump straight into a workflow</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        {[
                            { icon: PhoneCall, label: "Run a test call" },
                            { icon: Users, label: "Add leads" },
                            { icon: KeyRound, label: "View API keys" },
                            { icon: SlidersHorizontal, label: "Agent configuration" },
                        ].map((action) => (
                            <Button key={action.label} variant="ghost" className="justify-start gap-3 font-normal text-muted-foreground hover:text-foreground">
                                <action.icon className="size-4 text-violet-400" />
                                {action.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="border-border/60 bg-card/60">
                    <CardHeader>
                        <CardTitle>Deployed agents</CardTitle>
                        <CardDescription>Live performance across your agent fleet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Calls</TableHead>
                                    <TableHead className="text-right">Connected</TableHead>
                                    <TableHead className="text-right">Interested</TableHead>
                                    <TableHead className="text-right">Meetings</TableHead>
                                    <TableHead className="text-right">Deployed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.map((agent) => (
                                    <TableRow key={agent.id}>
                                        <TableCell>
                                            <div className="font-medium">{agent.name}</div>
                                            <div className="text-xs text-muted-foreground">{agent.voice} • {agent.language}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={cn("capitalize", statusStyles[agent.status])}>{agent.status}</Badge>
                                        </TableCell>
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