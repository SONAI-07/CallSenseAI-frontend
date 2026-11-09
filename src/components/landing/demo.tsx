"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, CalendarCheck, Plug, Route, ShieldCheck, Sparkle, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Prospect", "Personalise", "Book"] as const;

const tabContent: Record<typeof tabs[number], { title: string; copy: string }> = {
    Prospect: { title: "Find qualified leads", copy: "The agent dials your list, scores intent live and routes only warm conversations to your team — no dead air, no dialler stare." },
    Personalise: { title: "Every call sounds like your best rep", copy: "Objection handling, tone and pacing trained on your winning calls, in your customer's language and time zone." },
    Book: { title: "Turn replies into meetings", copy: "Positive responses trigger calendar links and confirmations in your voice — booked meetings drop straight into your reps' week." },
};

const pillars = [
    { icon: Route, t: "Instant lead routing", d: "Routed to the right rep in seconds, by intent and territory" },
    { icon: Waves, t: "Automated sequences", d: "Omnichannel follow-ups engage leads 24/7 while you close" },
    { icon: BarChart3, t: "Real-time insights", d: "Live metrics show replies and bookings, driving quick optimisation" },
    { icon: Plug, t: "Native integrations", d: "Bidirectional CRM sync keeps data clean and actionable" },
    { icon: ShieldCheck, t: "Enterprise-grade security", d: "SOC 2 Type II, GDPR-ready — consent logged on every call" },
    { icon: CalendarCheck, t: "Per-minute transparency", d: "Telephony billed at cost, itemised on every invoice" },
];

export function DemoSection() {
    const [tab, setTab] = useState<typeof tabs[number]>("Prospect");

    return (
        <section className="border-t border-border py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mx-auto max-w-xl text-center text-3xl font-medium text-foreground lg:text-4xl">
                    VoxaSell dials, personalises and books — automatically
                </motion.h2>

                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/40 p-1">
                        {tabs.map((t) => (
                            <button key={t} onClick={() => setTab(t)} className="relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors">
                                {tab === t && <motion.span layoutId="seg-pill" transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 rounded-full bg-primary" />}
                                <span className={`relative ${tab === t ? "text-[#14110e]" : "text-muted-foreground hover:text-foreground"}`}>{t}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mx-auto mt-10 max-w-md">
                    <AnimatePresence mode="wait">
                        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="surface-card rounded-2xl border border-border p-6 shadow-[var(--inset-highlight)]">
                            <div className="space-y-2">
                                {[0, 1, 2].map((i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className={`flex items-center gap-3 rounded-lg border border-border p-3 ${i === 2 ? "bg-secondary/60" : "bg-card"}`} style={{ marginLeft: `${i * 14}px` }}>
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f5e9dd] font-mono text-[10px] text-[#1b1613]">{["RS", "PN", "DP"][i]}</span>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-1.5 rounded-full bg-[rgba(245,233,221,0.14)]" style={{ width: `${70 - i * 12}%` }} />
                                            <div className="h-1.5 rounded-full bg-[rgba(245,233,221,0.08)]" style={{ width: `${46 - i * 8}%` }} />
                                        </div>
                                        {tab === "Book" && i === 2 && <CalendarCheck className="size-4 text-primary" />}
                                        {tab === "Prospect" && i === 2 && <Sparkle className="size-4 text-primary" />}
                                    </motion.div>
                                ))}
                            </div>
                            <h3 className="mt-6 text-base font-medium text-foreground">{tabContent[tab].title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tabContent[tab].copy}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pillars */}
                <div className="mt-28 grid gap-10 lg:grid-cols-[320px_1fr]">
                    <div>
                        <h2 className="text-3xl font-medium leading-tight text-foreground lg:text-4xl">Core pillars<br />of VoxaSell</h2>
                        <a href="#pricing" className="mt-6 inline-block"><Button variant="outline" className="h-9">Get started</Button></a>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pillars.map((p) => (
                            <motion.div key={p.t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="surface-card rounded-xl border border-border p-5 shadow-[var(--inset-highlight)] transition-colors hover:border-[rgba(245,233,221,0.18)]">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                                    <p.icon className="size-4 text-primary" />
                                </div>
                                <h3 className="mt-4 text-sm font-medium text-foreground">{p.t}</h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}