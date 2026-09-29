"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AudioLines, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Portfolio demo auth — swap for real tenant auth later.
        setTimeout(() => router.push("/dashboard"), 900);
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
            <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-violet-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 left-1/2 size-72 -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card/70 p-8 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/50">
                        <AudioLines className="size-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Sign in to your VoxaSell workspace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input id="email" type="email" placeholder="founder@startup.dev" defaultValue="archan@voxasell.ai" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" defaultValue="demo-password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
                    <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z" />
                        <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
                    </svg>
                    Continue with Google
                </Button>
                <p className="mt-6 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
                    Portfolio demo — any credentials work.
                </p>
            </motion.div>
        </div>
    );
}