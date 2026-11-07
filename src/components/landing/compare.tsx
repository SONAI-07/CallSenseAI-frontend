"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AudioLines, Check } from "lucide-react";
import { CountTo } from "./count-to";
import { useInView } from "./use-in-view";

const manual = [
    { t: "Build the call list", d: "Scrape directories and export CRM rows into yet another spreadsheet" },
    { t: "Hunt down direct dials", d: "Ring central after central to discover which numbers actually exist" },
    { t: "Draft the call script", d: "Rewrite last quarter's opener, hoping this version survives first contact" },
    { t: "Schedule call blocks", d: "Protect four hours a day and watch half of them evaporate on voicemail" },
    { t: "Wait for pick-ups", d: "Stare at the dialler while nine of ten calls ring out" },
    { t: "Log notes by hand", d: "Retype outcomes into the CRM before the next call queues" },
    { t: "Qualify on the fly", d: "Score interest from memory between calls, inconsistently" },
    { t: "Chase scheduling", d: "Email tag with prospects to find a slot that suits both sides" },
    { t: "Update CRM fields", d: "Copy dispositions, notes and next steps across three tools" },
    { t: "Meeting finally confirmed", d: "Days later a calendar hold appears — if nobody dropped the thread" },
];

const ai = [
    { t: "Connect your CRM", d: "One sync imports leads, owners and call windows — no setup headaches" },
    { t: "Agent dials and qualifies live", d: "VoxaSell scores intent, handles objections and books while the call is warm" },
    { t: "Smart follow-ups launch", d: "WhatsApp brochures and emails fire the moment interest spikes" },
    { t: "Calendar filled — meeting booked", d: "Confirmations land straight in your team's calendar, no back-and-forth" },
];

export function CompareSection() {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const li = setInterval(() => setLeft((v) => (v >= manual.length ? (clearInterval(li), v) : v + 1)), 340);
        const rt = setTimeout(() => {
            const ri = setInterval(() => setRight((v) => (v >= ai.length ? (clearInterval(ri), v) : v + 1)), 300);
        }, 500);
        return () => { clearInterval(li); clearTimeout(rt); };
    }, [inView]);

    const leftDone = left >= manual.length;
    const rightDone = right >= ai.length;

    return (
        <section id="race" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center font-mono text-[11px] text-primary">
                    Manual chaos → voice AI clarity
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="mx-auto mt-3 max-w-xl text-center text-3xl font-medium text-foreground lg:text-4xl">
                    Automate your outreach. Reclaim your week.
                </motion.h2>

                <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-2">
                    {/* Manual column */}
                    <div>
                        <div className="flex items-center justify-between gap-4 rounded-xl bg-[#14110e] px-5 py-4 shadow-[var(--inset-highlight)]">
                            <p className="text-sm font-medium text-[#f5e9dd]">Manual process</p>
                            <div className="flex items-center gap-3">
                                {leftDone && (
                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="rounded-full bg-[#f5e9dd] px-3 py-1 font-mono text-[11px] font-medium text-[#14110e]">
                                        Finally done
                                    </motion.span>
                                )}
                                <span className="flex items-center gap-2 rounded-full bg-[#f5e9dd] px-3 py-1">
                                    <span className="font-mono text-sm font-medium tabular-nums text-[#14110e]"><CountTo to={120} run={inView} duration={3400} /></span>
                                    <span className="font-mono text-[10px] text-[#6f6355]">Hours</span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {manual.slice(0, left).map((s, i) => (
                                <motion.div key={s.t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="surface-card rounded-xl border border-border p-4 shadow-[var(--inset-highlight)]">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-foreground">{i + 1}. {s.t}</p>
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#14110e]">
                                            <Check className="size-3 text-[#f5e9dd]" />
                                        </motion.span>
                                    </div>
                                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* VoxaSell column */}
                    <div>
                        <div className="flex items-center justify-between gap-4 rounded-xl bg-primary px-5 py-4 shadow-[var(--inset-highlight)]">
                            <p className="flex items-center gap-2 text-sm font-medium text-[#14110e]">
                                <AudioLines className="size-4" /> VoxaSell process
                            </p>
                            <div className="flex items-center gap-3">
                                {rightDone && (
                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="rounded-full bg-[#f5e9dd] px-3 py-1 font-mono text-[11px] font-medium text-[#14110e]">
                                        Done
                                    </motion.span>
                                )}
                                <span className="flex items-center gap-2 rounded-full bg-[#f5e9dd] px-3 py-1">
                                    <span className="font-mono text-sm font-medium tabular-nums text-[#14110e]"><CountTo to={15} run={inView} duration={1200} /></span>
                                    <span className="font-mono text-[10px] text-[#6f6355]">Min</span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {ai.slice(0, right).map((s, i) => (
                                <motion.div key={s.t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="surface-card rounded-xl border border-[rgba(166,124,82,0.35)] p-4 shadow-[var(--inset-highlight)]">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <AudioLines className="size-3.5 text-primary" /> {i + 1}. {s.t}
                                        </p>
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                                            <Check className="size-3 text-[#14110e]" />
                                        </motion.span>
                                    </div>
                                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}