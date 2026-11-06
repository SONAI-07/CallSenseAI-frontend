"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBar() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card px-6">
            <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search agents, calls..." className="h-9 border-transparent bg-secondary/50 pl-9 focus-visible:bg-secondary" />
            </div>

            <div className="ml-auto hidden items-center gap-2 sm:flex">
                <span className="relative flex size-1.5">
                    <span className="dot-halo absolute inline-flex h-full w-full rounded-full bg-[#8f9e77]" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#8f9e77]" />
                </span>
                <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
        </header>
    );
}