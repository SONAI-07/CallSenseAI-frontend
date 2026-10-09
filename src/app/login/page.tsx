"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AudioLines, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ApiError, API_BASE, API_CONFIGURED, setToken } from "@/lib/api/client";
import { login, signup } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "");
        const password = String(form.get("password") ?? "");
        const tenant_name = String(form.get("tenant_name") ?? "");

        try {
            const res = mode === "signup"
                ? await signup(email, password, tenant_name)
                : await login(email, password);
            setToken(res.access_token);
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof ApiError) {
                if (err.status === 401) setError("Invalid email or password.");
                else if (err.status === 409) setError(mode === "signup" ? "Email already registered." : "Account conflict.");
                else if (err.status === 0) setError("Backend offline. Check NEXT_PUBLIC_API_URL.");
                else setError(`Auth error (${err.status}): ${err.message}`);
            } else {
                setError("Unexpected error.");
            }
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
            <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-violet-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-cyan-500/15 blur-3xl" />
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
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {mode === "login" ? "Welcome back" : "Create workspace"}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {mode === "login" ? "Sign in to your CallSense workspace" : "New tenant + user in one step"}
                    </p>
                </div>

                <div className="mb-5 flex rounded-lg border border-border/60 bg-muted/40 p-1">
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                        className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === "login" ? "bg-violet-600 text-white" : "text-muted-foreground"}`}
                    >Sign in</button>
                    <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === "signup" ? "bg-violet-600 text-white" : "text-muted-foreground"}`}
                    >Sign up</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"} required minLength={mode === "signup" ? 8 : undefined} />
                    </div>
                    {mode === "signup" && (
                        <div className="space-y-2">
                            <Label htmlFor="tenant_name">Workspace name</Label>
                            <Input id="tenant_name" name="tenant_name" placeholder="Acme Sales" required minLength={1} maxLength={255} />
                        </div>
                    )}
                    {error && <p className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
                    </Button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
                    <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                    Skip — enter demo mode
                </Button>

                <p className="mt-6 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
                    {API_CONFIGURED ? `Connected to ${API_BASE}` : "Demo mode — set NEXT_PUBLIC_API_URL to wire the backend."}
                </p>
            </motion.div>
        </div>
    );
}