import type { AgentStatsResponse } from "./api/types";
import type { Agent } from "./mock-data";

export function toUiAgent(a: AgentStatsResponse): Agent {
    return {
        id: `ag_${a.id}`,
        name: a.name,
        description: "",
        status: a.is_active ? "active" : "paused",
        voice: a.voice_id ? `Murf · ${a.voice_id}` : "Murf",
        language: a.language_code,
        calls: a.calls,
        connectedRate: a.calls ? Math.round((a.connected / a.calls) * 100) : 0,
        interested: a.interested,
        meetings: a.meetings,
        lastDeployed: new Date(a.created_at).toLocaleDateString(),
    };
}