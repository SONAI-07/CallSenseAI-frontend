"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AudioLines, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quotes = [
    { q: "It used to take me a week to build a call list. Now it's Monday coffee and the fleet is already dialling.", n: "Samantha K.", r: "Head of Sales · BrightWave" },
    { q: "Before VoxaSell my inbox was the follow-up system. Now AI handles the chase and I only talk to people ready to buy.", n: "Daniel Ming", r: "Account Executive · FinEdge" },
    { q: "We went live in 48 hours. Research time dropped 80% and the agent booked 27 meetings in the first month.", n: "Elena Tan", r: "Head of Marketing · CircuitFlow" },
    { q: "Personalisation at scale. Positive reply rate jumped from 2% to 7.6% and we opened 14 net-new opps in a quarter.", n: "Marco Alvarez", r: "Co-founder · RenderKit" },
    { q: "The transcripts are the product. Every objection our agents hear becomes next week's script.", n: "Aisha Rahman", r: "RevOps Lead · Loopware" },
];

const posts = [
    { tag: "Voice craft", t: "How voice agents handle the first ten seconds", m: 6 },
    { tag: "Playbooks", t: "Writing call scripts that don't sound like scripts", m: 8 },
    { tag: "Data", t: "What 2,721 calls taught us about follow-up timing", m: 5 },
    { tag: "Field notes", t: "Connect rates by hour — when India actually picks up", m: 4 },
];

const faqs = [
    { q: "What is VoxaSell?", a: "A voice-agent platform that dials your leads, qualifies intent on live calls and books meetings straight into your team's calendar." },
    { q: "How does it learn our ICP and messaging?", a: "You upload winning call recordings and your playbook; the agent trains on tone, objections and offers before its first dial." },
    { q: "How much control do we keep?", a: "Full. Every script line, call window and follow-up action is editable, and any call can be handed to a human mid-conversation." },
    { q: "What does it integrate with?", a: "HubSpot, Salesforce, Google Calendar, WhatsApp Business and any REST webhook — bidirectional, no middleware." },
    { q: "How are compliance and recording handled?", a: "Consent is spoken and logged on every call, recordings are encrypted at rest, and DPR-ready deletion runs on a schedule you set." },
    { q: "How fast can we go live?", a: "Most workspaces place their first call within 48 hours of connecting a CRM." },
];

export function SocialSection() {
    const [annual, setAnnual] = useState(true);
    const [open, setOpen] = useState<number | null>(0);
    const [subscribed, setSubscribed] = useState(false);

    return (
        <>
            {/* Pricing */}
            <section id="pricing" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <h2 className="max-w-md text-3xl font-medium text-foreground lg:text-4xl">Simple, minute-based pricing you can trust</h2>
                        <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/40 p-1">
                            {(["Monthly", "Yearly"] as const).map((m) => (
                                <button key={m} onClick={() => setAnnual(m === "Yearly")} className="relative rounded-full px-4 py-1.5 text-xs font-medium">
                                    {((m === "Yearly") === annual) && <motion.span layoutId="bill-pill" transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 rounded-full bg-secondary shadow-[var(--inset-shadow-active)]" />}
                                    <span className={`relative ${(m === "Yearly") === annual ? "text-foreground" : "text-muted-foreground"}`}>{m}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {[
                            { n: "Starter", p: 0, pa: 0, d: "For founders validating the idea", f: false, feats: ["1 deployed voice agent", "100 outbound minutes / month", "Basic call insights", "Email support"] },
                            { n: "Growth", p: 18, pa: 15, d: "For teams running real outbound", f: true, feats: ["5 deployed voice agents", "1,000 outbound minutes / month", "Live transcripts & intent analytics", "WhatsApp, email & follow-up actions", "API keys & webhooks", "Priority support"] },
                            { n: "Enterprise", p: null, pa: null, d: "For scale-ups with custom needs", f: false, feats: ["Unlimited agents & minutes", "Custom voices & languages", "Dedicated telephony numbers", "SSO & audit logs", "SLA-backed support"] },
                        ].map((t) => (
                            <motion.div key={t.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className={t.f ? "surface-paper flex flex-col rounded-2xl p-8" : "surface-card flex flex-col rounded-2xl border border-border p-8 shadow-[var(--inset-highlight)]"}>
                                <div className="flex items-baseline justify-between">
                                    <h3 className={`text-sm font-medium ${t.f ? "text-[#1b1613]" : "text-foreground"}`}>{t.n}</h3>
                                    {t.f && <span className="font-mono text-[11px] text-[#8a5f3c]">Most popular</span>}
                                </div>
                                <div className="mt-4 flex items-baseline gap-1">
                                    {t.p === null ? (
                                        <span className={`font-mono text-4xl font-medium ${t.f ? "text-[#1b1613]" : "text-foreground"}`}>Custom</span>
                                    ) : (
                                        <>
                                            <span className={`font-mono text-4xl font-medium tabular-nums ${t.f ? "text-[#1b1613]" : "text-foreground"}`}>${annual ? t.pa : t.p}</span>
                                            <span className={`text-sm ${t.f ? "text-[#6f6355]" : "text-muted-foreground"}`}>/month</span>
                                        </>
                                    )}
                                </div>
                                <p className={`mt-1 text-xs ${t.f ? "text-[#6f6355]" : "text-muted-foreground"}`}>{t.d}</p>
                                <ul className="mt-6 space-y-2.5">
                                    {t.feats.map((f) => (
                                        <li key={f} className={`flex items-start gap-2.5 text-sm ${t.f ? "text-[#241c15]" : "text-muted-foreground"}`}>
                                            <Check className={`mt-0.5 size-4 shrink-0 ${t.f ? "text-[#5e7b4f]" : "text-[#8f9e77]"}`} /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-8">
                                    <Link href="/login">
                                        <Button className={`w-full ${t.f ? "bg-[#14110e] text-[#f5e9dd] hover:bg-[#1b1613]" : ""}`} variant={t.f ? "default" : "outline"}>
                                            {t.p === null ? "Contact sales" : "Start free"}
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial marquee */}
            <section className="border-t border-border py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <h2 className="text-3xl font-medium text-foreground">Teams trust VoxaSell</h2>
                </div>
                <div className="mt-10 overflow-hidden">
                    <div className="marquee-track flex w-max gap-4 pr-4">
                        {[...quotes, ...quotes].map((t, i) => (
                            <div key={i} className="surface-card w-80 shrink-0 rounded-xl border border-border p-6 shadow-[var(--inset-highlight)]">
                                <p className="text-sm leading-relaxed text-foreground">{t.q}</p>
                                <p className="mt-4 text-xs font-medium text-foreground">{t.n}</p>
                                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{t.r}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog */}
            <section id="blog" className="scroll-mt-24 border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-medium text-foreground">From the call log</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Notes, playbooks and product updates</p>
                        </div>
                        <a href="mailto:sales@voxasell.ai" className="text-sm text-primary transition-colors hover:text-foreground">Read the blog</a>
                    </div>
                    <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_320px_320px_320px]">
                        <div className="surface-paper flex min-h-64 flex-col justify-between rounded-2xl p-8">
                            <p className="font-mono text-[11px] text-[#8a5f3c]">Featured · Voice craft</p>
                            <div>
                                <h3 className="max-w-md text-2xl font-medium leading-snug text-[#1b1613]">How customer-support teams cut response times by 60% with voice-first triage</h3>
                                <p className="mt-3 font-mono text-[11px] text-[#6f6355]">Adam Guild · Aug 9, 2026 · 8 min read</p>
                            </div>
                        </div>
                        {posts.map((p) => (
                            <div key={p.t} className="surface-card flex flex-col justify-between rounded-2xl border border-border p-6 shadow-[var(--inset-highlight)] transition-colors hover:border-[rgba(245,233,221,0.18)]">
                                <div>
                                    <p className="font-mono text-[10px] text-primary">{p.tag}</p>
                                    <h3 className="mt-3 text-sm font-medium leading-snug text-foreground">{p.t}</h3>
                                </div>
                                <p className="mt-6 font-mono text-[10px] text-muted-foreground">{p.m} min read</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-border py-24 lg:py-32">
                <div className="mx-auto max-w-3xl px-6">
                    <h2 className="text-center text-3xl font-medium text-foreground lg:text-4xl">Your questions, answered</h2>
                    <div className="mt-10 space-y-2">
                        {faqs.map((f, i) => (
                            <div key={f.q} className="surface-card rounded-xl border border-border shadow-[var(--inset-highlight)]">
                                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                                    <span className="text-sm font-medium text-foreground">{f.q}</span>
                                    <Plus className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
                                </button>
                                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA banner */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-20 flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-[linear-gradient(120deg,#8a5f3c_0%,#a67c52_55%,#c9a06a_100%)] p-10 shadow-[var(--inset-highlight)]">
                        <div>
                            <h2 className="text-3xl font-medium leading-tight text-[#f5e9dd]">Prospect smarter.<br />Book faster.</h2>
                            <Link href="/login" className="mt-6 inline-block"><Button className="h-10 bg-[#14110e] text-[#f5e9dd] hover:bg-[#1b1613]">Get started</Button></Link>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-[#f5e9dd]/85">
                            Ditch manual outreach — VoxaSell pinpoints intent, writes hyper-personal follow-ups and auto-books qualified demos so your team can focus on closing deals
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export function LandingFooter() {
    const [subscribed, setSubscribed] = useState(false);
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_auto_auto] lg:px-10">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary shadow-[var(--inset-highlight)]">
                            <AudioLines className="size-5 text-primary" />
                        </div>
                        <span className="text-2xl font-medium text-foreground">VoxaSell</span>
                    </div>
                    <div className="mt-8 max-w-xs">
                        <p className="text-xs text-muted-foreground">Subscribe for updates</p>
                        {subscribed ? (
                            <p className="mt-3 font-mono text-[11px] text-[#8f9e77]">Subscribed — first dispatch lands next Monday</p>
                        ) : (
                            <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                                <Input type="email" required placeholder="your@email.com" className="h-9 bg-secondary/50" />
                                <Button type="submit" className="h-9">Submit</Button>
                            </form>
                        )}
                    </div>
                </div>
                <div>
                    <p className="font-mono text-[10px] text-muted-foreground">Platform</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <a href="#pricing" className="block transition-colors hover:text-foreground">Pricing</a>
                        <a href="#race" className="block transition-colors hover:text-foreground">Manual vs AI</a>
                        <a href="#work" className="block transition-colors hover:text-foreground">Hear a call</a>
                    </div>
                </div>
                <div>
                    <p className="font-mono text-[10px] text-muted-foreground">Resources</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <a href="#blog" className="block transition-colors hover:text-foreground">Blog</a>
                        <a href="#stories" className="block transition-colors hover:text-foreground">Case studies</a>
                        <a href="mailto:sales@voxasell.ai" className="block transition-colors hover:text-foreground">Contact sales</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border">
                <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 lg:px-10">
                    <p className="font-mono text-[10px] text-muted-foreground">© 2026 VoxaSell · CallSense</p>
                    <p className="font-mono text-[10px] text-muted-foreground">Design system after the unslop method · CC BY 4.0 · Damir Sokolovsky</p>
                </div>
            </div>
        </footer>
    );
}