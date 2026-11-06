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
            const res = mode === "login"
                ? await login(email, password)
                : await signup(email, password, tenant_name);
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
        <div className="scene-warm relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
            {/* Wordmark in the calm corner, like the reference composition */}
            <div className="absolute left-6 top-6 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                    <AudioLines className="size-4 text-primary" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-sm font-medium text-foreground">VoxaSell</span>
                    <span className="text-[11px] text-muted-foreground">Voice AI for outbound sales</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md lg:ml-[8vw] lg:mr-auto"
            >
                <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--inset-highlight),0_24px_64px_rgba(0,0,0,0.45)]">
                    <div className="mb-8 flex flex-col items-start text-left">
                        <h1 className="text-2xl font-medium text-foreground">
                            {mode === "login" ? "Sign in" : "Create your workspace"}
                        </h1>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                            {mode === "login" ? "Access your CallSense workspace." : "One workspace, one user, one step."}
                        </p>
                    </div>

                    <div className="mb-6 flex rounded-lg border border-border bg-muted/60 p-1">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === "login" ? "bg-secondary text-foreground shadow-[var(--inset-shadow-active)]" : "text-muted-foreground hover:text-foreground"}`}
                        >Sign in</button>
                        <button
                            type="button"
                            onClick={() => setMode("signup")}
                            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === "signup" ? "bg-secondary text-foreground shadow-[var(--inset-shadow-active)]" : "text-muted-foreground hover:text-foreground"}`}
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
                        {error && <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="size-4 animate-spin" />}
                            {loading ? "Please wait" : mode === "login" ? "Sign in" : "Create account"}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">or</span>
                        <Separator className="flex-1" />
                    </div>

                    <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                        Continue in demo mode
                    </Button>

                    <p className="mt-6 rounded-lg border border-border bg-muted/60 px-3 py-2 text-center text-xs text-muted-foreground">
                        {API_CONFIGURED ? `Connected to ${API_BASE}` : "Demo mode — set NEXT_PUBLIC_API_URL to wire the backend."}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}