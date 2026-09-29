import { Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AgentsPage() {
    return (
        <Card className="border-border/60 bg-card/60">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-24 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/15">
                    <Bot className="size-6 text-violet-400" />
                </div>
                <h1 className="text-lg font-semibold">Agents workspace</h1>
                <p className="max-w-sm text-sm text-muted-foreground">Agent cards, deploy controls and per-agent analytics land in the next build step.</p>
            </CardContent>
        </Card>
    );
}