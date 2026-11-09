"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Waveform } from "@/components/waveform";

const callLines = [
    { who: "Meera · agent", text: "Hi Priya, this is Meera calling from Craftline — caught you mid-coffee?" },
    { who: "Priya · customer", text: "Ha — exactly one minute, go ahead." },
    { who: "Meera · agent", text: "We help design studios fill pipeline without cold outreach. Worth a quick look?" },
    { who: "Priya · customer", text: "We tried ads last quarter. Nothing converted." },
    { who: "Meera · agent", text: "Most of our customers did too. This is a conversation, not a campaign — could I hold twenty minutes on Thursday?" },
    { who: "Priya · customer", text: "Thursday works. Send it over." },
];

export function TranscriptSection() {
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
        <section id="work" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="font-mono text-[11px] text-primary">Hear it work</motion.p>
                <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="mt-3 max-w-xl text-3xl font-medium text-foreground">A real conversation, not a campaign</motion.h2>
                <div ref={ref} className="mx-auto mt-12 max-w-3xl">
                    <div className="flex items-center justify-between gap-4">
                        <p className="font-mono text-[11px] text-muted-foreground">Call #1042 · outbound · 0:47</p>
                        <div className="flex items-center gap-2.5">
                            <Waveform seed="call-1042" live={playing} className="text-primary" />
                            <span className="font-mono text-[11px] text-muted-foreground">{playing ? "On air" : "Ended"}</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-5">
                        {callLines.slice(0, shown).map((l, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="border-l border-border pl-4">
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
            </div>
        </section>
    );
}