"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AudioLines, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";
import { agents } from "@/lib/mock-data";

const reveal = { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } };

const callLines = [
    { who: "Meera · agent", text: "Hi Priya, this is Meera calling from Craftline — caught you mid-coffee?" },
    { who: "Priya · customer", text: "Ha — exactly one minute, go ahead." },
    { who: "Meera · agent", text: "We help design studios fill pipeline without cold outreach. Worth a quick look?" },
    { who: "Priya · customer", text: "We tried ads last quarter. Nothing converted." },
    { who: "Meera · agent", text: "Most of our customers did too. This is a conversation, not a campaign — could I hold twenty minutes on Thursday?" },
    { who: "Priya · customer", text: "Thursday works. Send it over." },
];

function Transcript() {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            io.disconnect();
            let i = 0;
            const id = setInterval(() => {
                i += 1;
                setShown(i);
                if (i >= callLines.length) clearInterval(id);
            }, 850);
        }, { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const playing = shown < callLines.length;

    return (
        <div ref={ref} className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] text-muted-foreground">Call #1042 · outbound · 0:47</p>
                <div className="flex items-center gap-2.5">
                    <Waveform seed="call-1042" live={playing} className="text-primary" />
                    <span className="font-mono text-[11px] text-muted-foreground">{playing ? "On air" : "Ended"}</span>
                </div>
            </div>
            <div className="mt-6 space-y-5">
                {callLines.slice(0, shown).map((l, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="border-l border-border pl-4">
                        <p className={`font-mono text-[11px] ${l.who.includes("agent") ? "text-primary" : "text-muted-foreground"}`}>{l.who}</p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">{l.text}</p>
                    </motion.div>
                ))}
                {!playing && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="surface-paper mt-8 flex flex-wrap items-center gap-3 rounded-xl px-5 py-4">
                        <Check className="size-4 text-[#1b1613]" />
                        <p className="text-sm font-medium text-[#1b1613]">Outcome · strong interest</p>
                        <p className="font-mono text-[11px] text-[#6f6355]">meeting booked Thu 10:30 · brochure sent on WhatsApp</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [val, setVal] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            io.disconnect();
            const t0 = performance.now();
            const tick = (t: number) => {
                const p = Math.min(1, (t - t0) / 900);
                setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, [to]);
    return <span ref={ref} className="tabular-nums">{val.toLocaleString()}{suffix}</span>;
}

function HeroPreview() {
    return (
        <div className="surface-paper rounded-t-2xl border border-b-0 border-[rgba(27,22,19,0.10)] p-6 shadow-[0_-24px_64px_rgba(0,0,0,0.45)]">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-[#1b1613]">Call activity</p>
                <p className="font-mono text-[11px] text-[#6f6355]">Last 7 days · workspace demo</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-6">
                {[{ l: "Dialed", v: "2,721" }, { l: "Connected", v: "1,849" }, { l: "Meetings", v: "149" }].map((k) => (
                    <div key={k.l}>
                        <p className="font-mono text-[11px] text-[#6f6355]">{k.l}</p>
                        <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-[#1b1613]">{k.v}</p>
                    </div>
                ))}
            </div>
            <svg viewBox="0 0 600 150" className="mt-5 w-full" aria-hidden>
                {[30, 70, 110].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(27,22,19,0.08)" strokeWidth="1" />)}
                <path d="M0,118 C60,108 90,80 150,86 C210,92 240,58 300,50 C360,42 390,28 450,32 C510,36 560,58 600,64 L600,150 L0,150 Z" fill="#a67c52" opacity="0.22" />
                <path d="M0,118 C60,108 90,80 150,86 C210,92 240,58 300,50 C360,42 390,28 450,32 C510,36 560,58 600,64" fill="none" stroke="#1b1613" strokeWidth="2" />
            </svg>
        </div>
    );
}

export default function LandingPage() {
    const intent = [
        { label: "Strong interest", value: 637, bar: "bg-primary" },
        { label: "Neutral", value: 420, bar: "bg-[#8a7a66]" },
        { label: "Not interested", value: 792, bar: "bg-[#4a4038]" },
    ];
    const max = 792;

    return (
        <div className="bg-background">
            {/* ---- Nav: quiet, one primary button ---- */}
            <header className="absolute inset-x-0 top-0 z-20">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                            <AudioLines className="size-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">VoxaSell</span>
                    </Link>
                    <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
                        <a href="#work" className="transition-colors hover:text-foreground">How it works</a>
                        <a href="#numbers" className="transition-colors hover:text-foreground">Numbers</a>
                        <a href="#why" className="transition-colors hover:text-foreground">Story</a>
                        <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
                    </nav>
                    <div className="ml-auto flex items-center gap-5">
                        <a href="mailto:sales@voxasell.ai" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">Contact sales</a>
                        <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sign in</Link>
                        <Link href="/login"><Button className="h-9">Start free</Button></Link>
                    </div>
                </div>
            </header>

            {/* ---- 1 · Scene hero ---- */}
            <section className="scene-warm relative flex min-h-svh flex-col overflow-hidden">
                <div className="mx-auto w-full max-w-7xl flex-1 px-6 pt-40 lg:px-10">
                    <div className="max-w-2xl">
                        <motion.h1 {...reveal} className="text-5xl font-medium leading-[1.05] text-foreground lg:text-6xl">
                            Voice agents that call your leads and book the meetings
                        </motion.h1>
                        <motion.p {...reveal} className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            VoxaSell dials, qualifies and follows up — your team only talks to people who said yes
                        </motion.p>
                        <motion.div {...reveal} className="mt-8 flex flex-wrap items-center gap-5">
                            <Link href="/login"><Button className="h-11 px-6">Start free</Button></Link>
                            <a href="#work" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                                Hear a live call <ArrowRight className="size-4" />
                            </a>
                        </motion.div>
                        <motion.p {...reveal} className="mt-6 font-mono text-[11px] text-muted-foreground">No card · 100 outbound minutes free each month</motion.p>
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center md:flex">
                    <div className="w-[min(1060px,92vw)] translate-y-[24%]"><HeroPreview /></div>
                </div>
                <div className="px-6 pb-10 md:hidden"><HeroPreview /></div>
            </section>

            {/* ---- 2 · Self-playing call ---- */}
            <section id="work" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <motion.p {...reveal} className="font-mono text-[11px] text-primary">01 · Hear it work</motion.p>
                    <motion.h2 {...reveal} className="mt-3 max-w-xl text-3xl font-medium text-foreground">A real conversation, not a campaign</motion.h2>
                    <div className="mt-12"><Transcript /></div>
                </div>
            </section>

            {/* ---- 3 · Numbers that count up ---- */}
            <section id="numbers" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <motion.p {...reveal} className="font-mono text-[11px] text-primary">02 · One month, one workspace</motion.p>
                    <motion.h2 {...reveal} className="mt-3 max-w-xl text-3xl font-medium text-foreground">What the fleet accomplished in October</motion.h2>
                    <div className="mt-12 grid gap-10 lg:grid-cols-2">
                        <div className="grid grid-cols-2 gap-8">
                            {[{ v: 2721, l: "Calls dialed" }, { v: 68, s: "%", l: "Connect rate" }, { v: 637, l: "Strong interest" }, { v: 149, l: "Meetings booked" }].map((k) => (
                                <div key={k.l} className="surface-card rounded-xl border border-border p-5 shadow-[var(--inset-highlight)]">
                                    <p className="font-mono text-[28px] font-medium leading-none text-foreground"><Count to={k.v} suffix={k.s ?? ""} /></p>
                                    <p className="mt-2 text-xs text-muted-foreground">{k.l}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-5 self-center">
                            {intent.map((row) => (
                                <div key={row.label}>
                                    <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                                        <span className="text-muted-foreground">{row.label}</span>
                                        <span className="tabular-nums text-foreground">{row.value.toLocaleString()}</span>
                                    </div>
                                    <div className="meter-ticks h-2 overflow-hidden rounded-full bg-[rgba(245,233,221,0.06)]">
                                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={`h-full origin-left rounded-full ${row.bar}`} style={{ width: `${(row.value / max) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                            <p className="font-mono text-[11px] text-muted-foreground">Sample workspace — figures from the demo fleet</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---- 4 · How it is built ---- */}
            <section id="how" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <motion.p {...reveal} className="font-mono text-[11px] text-primary">03 · The workflow</motion.p>
                    <div className="mt-10">
                        {[
                            { n: "01", t: "Connect your lead list", d: "Import a CSV or sync your CRM — VoxaSell dedupes, schedules around time zones and respects call windows." },
                            { n: "02", t: "Deploy a voice agent", d: "Pick a voice, a language and an objective. The agent handles objections and scores intent while the call is still live." },
                            { n: "03", t: "Actions follow up themselves", d: "WhatsApp brochures, emails and calendar holds fire the moment interest spikes — no human loop, no dropped leads." },
                        ].map((s) => (
                            <motion.div key={s.n} {...reveal} className="grid gap-4 border-t border-border py-8 md:grid-cols-[96px_1fr] md:gap-8">
                                <p className="font-mono text-3xl font-medium text-primary/80">{s.n}</p>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground">{s.t}</h3>
                                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---- 5 · The founder's paper ---- */}
            <section id="why" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <motion.div {...reveal} className="surface-paper mx-auto max-w-3xl rounded-2xl p-8 lg:p-12">
                        <p className="font-mono text-[11px] text-[#8a5f3c]">04 · Why we built it</p>
                        <p className="mt-5 text-xl leading-snug text-[#1b1613] lg:text-2xl">
                            We spent a quarter watching two SDRs dial four hundred numbers a day and reach eleven people. The conversations were never the problem — the dialling was. So we made the dialling disappear, and kept the conversation human.
                        </p>
                        <p className="mt-6 font-mono text-[11px] text-[#6f6355]">Archan Banerjee · founder, CallSense</p>
                    </motion.div>
                </div>
            </section>

            {/* ---- 6 · The fleet ---- */}
            <section className="border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <motion.p {...reveal} className="font-mono text-[11px] text-primary">05 · Inside the platform</motion.p>
                    <motion.h2 {...reveal} className="mt-3 max-w-xl text-3xl font-medium text-foreground">A fleet you can hear, not just monitor</motion.h2>
                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {agents.slice(0, 3).map((a) => (
                            <motion.div key={a.id} {...reveal} className="surface-card rounded-xl border border-border p-5 shadow-[var(--inset-highlight)]">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{a.name}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{a.voice} · {a.language}</p>
                                    </div>
                                    <Waveform seed={a.id} live={a.status === "active"} className="text-primary/70" />
                                </div>
                                <p className="mt-4 font-mono text-[11px] text-muted-foreground">{a.calls.toLocaleString()} calls · {a.connectedRate}% connected</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p {...reveal} className="mt-8">
                        <Link href="/login" className="flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-foreground">
                            Enter the demo dashboard <ArrowRight className="size-4" />
                        </Link>
                    </motion.p>
                </div>
            </section>

            {/* ---- 7 · Pricing strip + close ---- */}
            <section id="pricing" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="grid gap-10 md:grid-cols-3">
                        {[
                            { n: "Starter", p: "$0", d: "1 agent · 100 minutes", f: false },
                            { n: "Growth", p: "$15", d: "5 agents · 1,000 minutes", f: true },
                            { n: "Enterprise", p: "Custom", d: "Unlimited · SSO · SLA", f: false },
                        ].map((t) => (
                            <motion.div key={t.n} {...reveal} className="border-t border-border pt-6">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-sm font-medium text-foreground">{t.n}</h3>
                                    {t.f && <span className="font-mono text-[11px] text-primary">Most popular</span>}
                                </div>
                                <p className="mt-3 font-mono text-3xl font-medium tabular-nums text-foreground">{t.p}</p>
                                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{t.d}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div {...reveal} className="mt-20 flex flex-wrap items-center gap-5">
                        <Link href="/login"><Button className="h-11 px-6">Start free</Button></Link>
                        <a href="mailto:sales@voxasell.ai" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact sales</a>
                    </motion.div>
                </div>
            </section>

            <footer className="border-t border-border py-10">
                <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 lg:px-10">
                    <p className="font-mono text-[11px] text-muted-foreground">© 2026 VoxaSell · CallSense</p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <Link href="/login" className="transition-colors hover:text-foreground">Sign in</Link>
                        <Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
                        <a href="mailto:sales@voxasell.ai" className="transition-colors hover:text-foreground">Contact sales</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}