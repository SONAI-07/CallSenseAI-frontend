"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waveform } from "@/components/waveform";
import { agents, type AgentStatus } from "@/lib/mock-data";

const dotTone: Record<AgentStatus, string> = {
    active: "bg-[#8f9e77]",
    paused: "bg-[#c9a06a]",
    draft: "bg-[#6f6355]",
};

export default function AgentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-medium text-foreground">Agents</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Fleet status and per-agent performance</p>
                </div>
                <Button><Plus className="size-4" /> New agent</Button>
            </div>

            <p className="font-mono text-[11px] text-muted-foreground">
                Sample fleet — the backend agents contract lands in the next release
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                {agents.map((a) => (
                    <Link key={a.id} href={`/agents/${a.id}`} className="group block">
                        <Card className="agent-card surface-card border-border shadow-[var(--inset-highlight)]">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`size-1.5 rounded-full ${dotTone[a.status]}`} />
                                            <h2 className="text-sm font-medium text-foreground transition-colors duration-150 group-hover:text-[#1b1613] group-focus-visible:text-[#1b1613]">
                                                {a.name}
                                            </h2>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground transition-colors duration-150 group-hover:text-[#6f6355] group-focus-visible:text-[#6f6355]">
                                            {a.voice} · {a.language} · {a.status}
                                        </p>
                                    </div>
                                    <Waveform
                                        seed={a.id}
                                        live={a.status === "active"}
                                        className="text-primary/70 transition-colors duration-150 group-hover:text-[#8a5f3c] group-focus-visible:text-[#8a5f3c]"
                                    />
                                </div>
                                <div className="mt-5 grid grid-cols-3 gap-4 border-t border-border pt-4 transition-colors duration-150 group-hover:border-[rgba(27,22,19,0.12)] group-focus-visible:border-[rgba(27,22,19,0.12)]">
                                    <div>
                                        <p className="text-[11px] text-muted-foreground transition-colors duration-150 group-hover:text-[#6f6355] group-focus-visible:text-[#6f6355]">Calls</p>
                                        <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground transition-colors duration-150 group-hover:text-[#1b1613] group-focus-visible:text-[#1b1613]">{a.calls.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground transition-colors duration-150 group-hover:text-[#6f6355] group-focus-visible:text-[#6f6355]">Connected</p>
                                        <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground transition-colors duration-150 group-hover:text-[#1b1613] group-focus-visible:text-[#1b1613]">{a.connectedRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground transition-colors duration-150 group-hover:text-[#6f6355] group-focus-visible:text-[#6f6355]">Meetings</p>
                                        <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground transition-colors duration-150 group-hover:text-[#1b1613] group-focus-visible:text-[#1b1613]">{a.meetings.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}