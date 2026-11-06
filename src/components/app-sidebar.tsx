"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AudioLines, Bot, CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
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
        <motion.aside
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="surface-sidebar fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border"
        >
            <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                    <AudioLines className="size-4 text-primary" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-sm font-medium text-foreground">VoxaSell</span>
                    <span className="text-[11px] text-muted-foreground">Voice AI</span>
                </div>
            </div>

            <nav className="flex-1 space-y-0.5 px-3 py-4">
                <p className="px-2.5 pb-2 text-[11px] font-medium text-muted-foreground">Workspace</p>
                {navItems.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {active && (
                                <motion.span
                                    layoutId="nav-pill"
                                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 rounded-md bg-secondary shadow-[var(--inset-shadow-active)]"
                                />
                            )}
                            <item.icon className={cn("relative size-4 transition-transform duration-200", active ? "text-primary" : "group-hover:translate-x-0.5")} />
                            <span className="relative">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-border p-3">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <Avatar className="size-7">
                            <AvatarFallback className="bg-secondary text-[11px] text-foreground">AB</AvatarFallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-1 flex-col leading-tight">
                            <span className="truncate text-sm font-medium text-foreground">Archan Banerjee</span>
                            <span className="truncate text-[11px] text-muted-foreground">archan@voxasell.ai</span>
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
        </motion.aside>
    );
}