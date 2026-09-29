"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur-xl">
            <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search agents, campaigns, calls…" className="h-9 bg-muted/40 pl-9" />
            </div>
            <Badge variant="secondary" className="ml-auto hidden gap-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 sm:flex">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
        </span>
                All systems operational
            </Badge>
        </header>
    );
}