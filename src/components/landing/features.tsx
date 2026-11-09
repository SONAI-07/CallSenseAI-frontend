"use client";

import { motion } from "framer-motion";
import { AudioLines, CalendarCheck, KeyRound, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "./use-in-view";

const reveal = { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } };

const nodes = [
    { i: "RS", x: "8%", y: "12%" }, { i: "PN", x: "78%", y: "6%" }, { i: "DP", x: "88%", y: "46%" },
    { i: "SK", x: "74%", y: "82%" }, { i: "MK", x: "12%", y: "78%" }, { i: "EA", x: "2%", y: "44%" },
];

const integrations = [CalendarCheck, Mail, MessageCircle, KeyRound];

export function FeaturesSection() {
    const gauge = useInView<HTMLDivElement>(0.4);

    return (
        <section className="border-t border-border py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="max-w-md">
                        <motion.h2 {...reveal} className="text-3xl font-medium text-foreground lg:text-4xl">Built for enterprise scale and trust</motion.h2>
                        <motion.p {...reveal} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            VoxaSell meets the security, uptime and support standards your revenue engine never slows down for
                        </motion.p>
                    </div>
                    <motion.div {...reveal}>
                        <a href="mailto:sales@voxasell.ai"><Button variant="outline" className="h-9">Get started</Button></a>
                    </motion.div>
                </div>

                <div className="mt-14 grid gap-4 lg:grid-cols-2">
                    {/* Calendar on autopilot */}
                    <motion.div {...reveal} className="surface-card relative overflow-hidden rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]">
                        <div className="flex min-h-56 items-center justify-center">
                            <div className="float-slow surface-paper relative w-64 rounded-xl p-4 shadow-[0_20px_48px_rgba(0,0,0,0.45)]">
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <span className="flex size-7 items-center justify-center rounded-full border border-[rgba(27,22,19,0.2)] bg-[#1b1613] font-mono text-[10px] text-[#f5e9dd]">PN</span>
                                        <span className="flex size-7 items-center justify-center rounded-full border border-[rgba(27,22,19,0.2)] bg-[#a67c52] font-mono text-[10px] text-[#14110e]">AI</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-[#6f6355]">10:30 · Thu</span>
                                </div>
                                <p className="mt-3 text-sm font-medium text-[#1b1613]">Priya Nair · Craftline</p>
                                <p className="mt-1 font-mono text-[10px] text-[#6f6355]">Qualified call · ACV $18k</p>
                                <div className="mt-3 flex items-center gap-1.5 border-t border-[rgba(27,22,19,0.1)] pt-2">
                                    <span className="size-1.5 rounded-full bg-[#5e7b4f]" />
                                    <span className="font-mono text-[10px] text-[#5e7b4f]">Booked</span>
                                </div>
                                <span className="absolute -right-4 -top-4 flex size-12 items-center justify-center rounded-full bg-primary font-mono text-sm font-medium text-[#14110e] shadow-[0_12px_28px_rgba(0,0,0,0.4)]">4×</span>
                            </div>
                        </div>
                        <h3 className="mt-6 text-base font-medium text-foreground">Calendar booking on autopilot</h3>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                            The agent books the moment a lead qualifies — while your team sleeps. No back-and-forth, no dropped threads
                        </p>
                    </motion.div>

                    {/* Scale network */}
                    <motion.div {...reveal} className="surface-card relative overflow-hidden rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]">
                        <div className="relative min-h-56">
                            <svg className="absolute inset-0 h-full w-full" aria-hidden>
                                {nodes.map((n) => (
                                    <line key={n.i} x1="50%" y1="50%" x2={n.x} y2={n.y} stroke="rgba(245,233,221,0.12)" strokeWidth="1" />
                                ))}
                            </svg>
                            <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-mono text-sm font-medium text-[#14110e] shadow-[0_0_0_8px_rgba(166,124,82,0.15)]">
                                10k+
                            </div>
                            {nodes.map((n) => (
                                <span key={n.i} className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-secondary font-mono text-[10px] text-foreground" style={{ left: n.x, top: n.y }}>
                                    {n.i}
                                </span>
                            ))}
                        </div>
                        <h3 className="mt-6 text-base font-medium text-foreground">Scale no team can match</h3>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                            Ten thousand personalised calls a month — every conversation at machine speed while your reps focus on closing
                        </p>
                    </motion.div>

                    {/* Integrations orbit */}
                    <motion.div {...reveal} className="surface-card relative overflow-hidden rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]">
                        <div className="flex min-h-56 items-center justify-center">
                            <div className="relative h-44 w-44 [--orbit-r:78px]">
                                <div className="absolute inset-0 rounded-full border border-[rgba(166,124,82,0.25)]" />
                                <div className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                                    <AudioLines className="size-5 text-primary" />
                                </div>
                                <div className="orbit-spin-slow absolute inset-0">
                                    {integrations.map((Icon, i) => (
                                        <div key={i} className="absolute left-1/2 top-1/2 -ml-4 -mt-4" style={{ transform: `rotate(${i * 90}deg) translateY(calc(var(--orbit-r) * -1))` }}>
                                            <div className="orbit-spin-slow-rev">
                                                <div style={{ transform: `rotate(${-i * 90}deg)` }} className="flex size-8 items-center justify-center rounded-lg border border-border bg-card shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                                                    <Icon className="size-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-6 text-base font-medium text-foreground">Integrations that just work</h3>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                            CRM, calendar, WhatsApp and email — connected without setup calls or workflow disruptions
                        </p>
                    </motion.div>

                    {/* Gauge */}
                    <motion.div {...reveal} className="surface-card relative overflow-hidden rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]">
                        <div ref={gauge.ref} className="flex min-h-56 items-end justify-center pb-4">
                            <div className="relative h-28 w-56 overflow-hidden">
                                <div className="absolute inset-0 rounded-t-full border border-b-0 border-[rgba(245,233,221,0.14)]" />
                                <div className="absolute inset-[18%] rounded-t-full border border-b-0 border-[rgba(166,124,82,0.35)]" />
                                <motion.div
                                    initial={{ rotate: -80 }}
                                    animate={gauge.inView ? { rotate: 62 } : {}}
                                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute bottom-0 left-1/2 h-24 w-0.5 origin-bottom rounded-full bg-primary"
                                />
                                <div className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary" />
                            </div>
                        </div>
                        <h3 className="mt-2 text-base font-medium text-foreground">Carrier-grade call quality</h3>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                            99.98% uptime and elastic telephony that handles traffic spikes without breaking a sweat
                        </p>
                    </motion.div>
                </div>

                {/* Caramel logo banner */}
                <motion.div {...reveal} className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[linear-gradient(90deg,#8a5f3c_0%,#a67c52_55%,#c9a06a_100%)] px-8 py-6 shadow-[var(--inset-highlight)]">
                    <p className="max-w-xs text-sm font-medium leading-snug text-[#f5e9dd]">Powering outbound for modern revenue teams worldwide</p>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[12px] font-medium tracking-wide text-[#f5e9dd]/85">
                        <span>NEXUS LABS</span><span>CRAFTLINE</span><span>IONIX</span><span>BLOOMLY</span><span>MIDNIGHT PIZZA</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}