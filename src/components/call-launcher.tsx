"use client";

import { useState } from "react";
import { PhoneCall, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCustomer, createOutboundCall, listAgents, listCustomers } from "@/lib/api";
import { useApi } from "@/lib/api/use-api";
import type { AgentStatsResponse, CustomerResponse } from "@/lib/api/types";

export function CallLauncher() {
    const customers = useApi(listCustomers, [] as CustomerResponse[]);
    const agents = useApi(listAgents, [] as AgentStatsResponse[]);
    const [customerId, setCustomerId] = useState("");
    const [agentId, setAgentId] = useState("");
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [lead, setLead] = useState({ name: "", phone_number: "" });

    async function launch() {
        if (!customerId || !agentId) { setMsg("Pick a lead and an agent first"); return; }
        setBusy(true); setMsg(null);
        try {
            const call = await createOutboundCall({ customer_id: Number(customerId), agent_id: Number(agentId) });
            setMsg(`Call #${call.id} ${call.status}`);
        } catch (e) {
            setMsg(e instanceof Error ? e.message : "Call failed");
        } finally { setBusy(false); }
    }

    async function addLead() {
        if (!lead.name || !lead.phone_number) { setMsg("Name and phone required"); return; }
        setBusy(true);
        try {
            const c = await createCustomer(lead);
            setMsg(`Lead ${c.name} added`);
            setLead({ name: "", phone_number: "" });
            customers.refetch();
        } catch (e) {
            setMsg(e instanceof Error ? e.message : "Could not add lead");
        } finally { setBusy(false); }
    }

    const selectCls = "h-9 w-full rounded-md border border-border bg-secondary/50 px-2.5 text-sm text-foreground";

    return (
        <div className="space-y-3">
            <div className="grid gap-2">
                <select className={selectCls} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                    <option value="">Select lead</option>
                    {(customers.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.name} · {c.phone_number}</option>)}
                </select>
                <select className={selectCls} value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                    <option value="">Select agent</option>
                    {(agents.data ?? []).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <Button onClick={launch} disabled={busy} className="justify-start gap-3">
                    <PhoneCall className="size-4" /> Run a test call
                </Button>
            </div>
            <div className="grid gap-2 border-t border-border pt-3">
                <Input placeholder="Lead name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <Input placeholder="+91…" value={lead.phone_number} onChange={(e) => setLead({ ...lead, phone_number: e.target.value })} />
                <Button variant="outline" onClick={addLead} disabled={busy} className="justify-start gap-3">
                    <UserPlus className="size-4" /> Add leads
                </Button>
            </div>
            {msg && <p className="font-mono text-[11px] text-muted-foreground">{msg}</p>}
        </div>
    );
}