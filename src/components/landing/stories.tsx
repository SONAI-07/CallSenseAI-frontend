"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/waveform";

const slides = [
    {
        name: "Sarah Kim", role: "Co-owner · Midnight Pizza", initials: "SK",
        quote: "We don't have a huge sales team, so VoxaSell was like hiring three reps overnight. It learns fast, personalises well, and doesn't miss follow-ups. Our inbound and outbound are finally in sync.",
        stats: [{ v: "4×", l: "increase in outbound" }, { v: "2", l: "weeks to ROI-positive" }],
    },
    {
        name: "Rohit Sharma", role: "Head of Sales · Nexus Labs", initials: "RS",
        quote: "The agent handled objections I would have stumbled on. Connect rate went from 31% to 68% in a month, and my reps only talk to people who already said yes.",
        stats: [{ v: "68%", l: "connect rate" }, { v: "3.2×", l: "meetings per rep" }],
    },
    {
        name: "Priya Nair", role: "Founder · Craftline", initials: "PN",
        quote: "I watched the first call transcript twice — it sounded like our best rep, only patient at 11pm. The follow-ups fired themselves before I had finished my coffee.",
        stats: [{ v: "149", l: "meetings booked" }, { v: "104", l: "days saved a year" }],
    },
];

const fmtK = (n: number) => `$${(n / 1000).toFixed(1)}K`;

export function StoriesSection() {
    const [idx, setIdx] = useState(0);
    const [leads, setLeads] = useState(400);
    const [reps, setReps] = useState(3);
    const [wage, setWage] = useState(35);
    const [advanced, setAdvanced] = useState(false);

    const hoursSaved = Math.round(((leads * 18 * 0.9) / 60) * 12);
    const saved = hoursSaved * wage;
    const telephony = Math.round(leads * 12 * 0.9 * 0.15);
    const cost = reps * 18 * 12 + telephony;
    const net = saved - cost;
    const roi = cost ? Math.round((net / cost) * 100) : 0;
    const payback = saved ? cost / (saved / 12) : 0;
    const days = Math.round(hoursSaved / 8);

    const rows = [
        { l: "Dialling & logging", share: 0.6 },
        { l: "Follow-up actions", share: 0.25 },
        { l: "Scheduling & admin", share: 0.15 },
    ];

    const s = slides[idx];

    function downloadReport() {
        const txt = [
            "VoxaSell ROI estimate",
            "----------------------",
            `Leads per month: ${leads}`,
            `Reps: ${reps}`,
            `Blended wage: $${wage}/hr`,
            "",
            `Hours saved per year: ${hoursSaved.toLocaleString()}`,
            `Gross savings: ${fmtK(saved)}`,
            `Tool + telephony cost (yr): ${fmtK(cost)}`,
            `Net savings: ${fmtK(net)}`,
            `ROI: ${roi}%`,
            `Payback: ${payback.toFixed(1)} months`,
            "",
            "Sample model — validate with your own call data.",
        ].join("\n");
        const url = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "voxasell-roi-report.txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <section id="stories" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-3xl font-medium text-foreground lg:text-4xl">Case studies</motion.h2>

                <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
                    <AnimatePresence mode="wait">
                        <motion.div key={idx} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="surface-paper flex flex-col justify-between rounded-2xl p-8">
                            <div>
                                <div className="flex size-16 items-center justify-center rounded-full border border-[rgba(27,22,19,0.2)] bg-[#1b1613] font-mono text-sm text-[#f5e9dd]">{s.initials}</div>
                                <p className="mt-5 text-sm font-medium text-[#1b1613]">{s.name}</p>
                                <p className="mt-1 font-mono text-[11px] text-[#6f6355]">{s.role}</p>
                            </div>
                            <Waveform seed={s.initials} live className="mt-8 text-[#8a5f3c]" />
                        </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.div key={idx} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                            <p className="max-w-2xl text-xl leading-snug text-foreground lg:text-2xl">{s.quote}</p>
                            <div className="mt-8 flex flex-wrap items-end gap-10">
                                {s.stats.map((st) => (
                                    <div key={st.l}>
                                        <p className="font-mono text-3xl font-medium tabular-nums text-foreground">{st.v}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{st.l}</p>
                                    </div>
                                ))}
                                <a href="#work" className="ml-auto"><Button variant="outline" className="h-9">Hear their call</Button></a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="mt-6 flex items-center gap-3">
                    <button onClick={() => setIdx((idx + slides.length - 1) % slides.length)} className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground" aria-label="Previous story"><ArrowLeft className="size-4" /></button>
                    <button onClick={() => setIdx((idx + 1) % slides.length)} className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground" aria-label="Next story"><ArrowRight className="size-4" /></button>
                    <div className="ml-2 flex gap-1.5">
                        {slides.map((_, i) => (
                            <button key={i} onClick={() => setIdx(i)} aria-label={`Story ${i + 1}`} className={`size-1.5 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-[rgba(245,233,221,0.2)]"}`} />
                        ))}
                    </div>
                </div>

                {/* ROI calculator */}
                <div className="mt-24 grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="surface-card rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]">
                        <h3 className="text-base font-medium text-foreground">VoxaSell — prospecting & outreach</h3>
                        <div className="mt-6 space-y-6">
                            <div>
                                <div className="flex justify-between font-mono text-[11px] text-muted-foreground"><span>Leads per month</span><span className="tabular-nums text-foreground">{leads}</span></div>
                                <input type="range" min={50} max={2000} step={50} value={leads} onChange={(e) => setLeads(Number(e.target.value))} className="mt-2 w-full" style={{ accentColor: "#a67c52" }} />
                            </div>
                            <div>
                                <div className="flex justify-between font-mono text-[11px] text-muted-foreground"><span>Reps on the floor</span><span className="tabular-nums text-foreground">{reps}</span></div>
                                <input type="range" min={1} max={20} value={reps} onChange={(e) => setReps(Number(e.target.value))} className="mt-2 w-full" style={{ accentColor: "#a67c52" }} />
                            </div>
                            <button onClick={() => setAdvanced(!advanced)} className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                                <ChevronDown className={`size-3.5 transition-transform ${advanced ? "rotate-180" : ""}`} /> Advanced inputs
                            </button>
                            {advanced && (
                                <div>
                                    <div className="flex justify-between font-mono text-[11px] text-muted-foreground"><span>Blended wage</span><span className="tabular-nums text-foreground">${wage}/hr</span></div>
                                    <input type="range" min={15} max={100} value={wage} onChange={(e) => setWage(Number(e.target.value))} className="mt-2 w-full" style={{ accentColor: "#a67c52" }} />
                                </div>
                            )}
                        </div>
                        <div className="mt-8 space-y-4 border-t border-border pt-6">
                            {rows.map((r) => (
                                <div key={r.l} className="flex items-baseline justify-between gap-4">
                                    <p className="text-sm text-muted-foreground">{r.l}</p>
                                    <p className="font-mono text-sm tabular-nums text-foreground">{fmtK(saved * r.share)} <span className="text-[11px] text-muted-foreground">= {Math.round(days * r.share)} days saved/yr</span></p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="surface-paper flex flex-col rounded-2xl p-8">
                        <p className="text-xs text-[#6f6355]">Your team can save</p>
                        <p className="mt-2 font-mono text-4xl font-medium tabular-nums text-[#1b1613]">{fmtK(saved)}</p>
                        <p className="mt-1 text-xs text-[#6f6355]">per year · {reps} reps at ${wage}/hr</p>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {[{ l: "Payback period", v: `${payback.toFixed(1)} months` }, { l: "ROI", v: `${roi}%` }, { l: "Net savings", v: fmtK(net) }, { l: "Tool cost (yr)", v: fmtK(cost) }].map((k) => (
                                <div key={k.l} className="rounded-lg border border-[rgba(27,22,19,0.12)] bg-[rgba(255,255,255,0.35)] p-3">
                                    <p className="font-mono text-[10px] text-[#6f6355]">{k.l}</p>
                                    <p className="mt-1 font-mono text-sm font-medium tabular-nums text-[#1b1613]">{k.v}</p>
                                </div>
                            ))}
                        </div>
                        <Button onClick={downloadReport} className="mt-auto pt-2 h-10 w-full bg-[#14110e] text-[#f5e9dd] hover:bg-[#1b1613]">Download report</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}