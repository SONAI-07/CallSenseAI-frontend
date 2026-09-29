"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AudioLines, Bot, CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/agents", label: "Agents", icon: Bot },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border/60 bg-card/40 backdrop-blur-xl">
            <div className="flex h-14 items-center gap-2.5 border-b border-border/60 px-5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-md shadow-violet-950/50">
                    <AudioLines className="size-4 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-sm font-semibold tracking-tight">VoxaSell</span>
                    <span className="text-[10px] text-muted-foreground">Voice AI Platform</span>
                </div>
                <Badge variant="secondary" className="ml-auto text-[10px]">v0.1</Badge>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Workspace
                </p>
                {navItems.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                active
                                    ? "bg-violet-500/15 text-violet-300 shadow-[inset_0_0_0_1px_hsl(263_70%_58%_/_0.25)]"
                                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("size-4", active && "text-violet-400")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-border/60 p-3">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <Avatar className="size-8">
                            <AvatarFallback className="bg-violet-600 text-xs text-white">AB</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-1 flex-col leading-tight">
                            <span className="truncate text-sm font-medium">Archan Banerjee</span>
                            <span className="truncate text-xs text-muted-foreground">archan@voxasell.ai</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="top" className="w-56">
                        <DropdownMenuLabel>My account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="size-4" /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/login")}>
                            <LogOut className="size-4" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}