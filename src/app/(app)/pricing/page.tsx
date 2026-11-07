"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Starter",
        tagline: "For founders validating the idea",
        monthly: 0,
        annual: 0,
        cta: "Start free",
        featured: false,
        features: [
            "1 deployed voice agent",
            "100 outbound minutes / month",
            "Basic call insights",
            "Email support",
        ],
    },
    {
        name: "Growth",
        tagline: "For teams running real outbound",
        monthly: 18,
        annual: 15,
        cta: "Start 14-day trial",
        featured: true,
        features: [
            "5 deployed voice agents",
            "1,000 outbound minutes / month",
            "Live transcripts & intent analytics",
            "WhatsApp, email & follow-up actions",
            "API keys & webhooks",
            "Priority support",
        ],
    },
    {
        name: "Enterprise",
        tagline: "For scale-ups with custom needs",
        monthly: null,
        annual: null,
        cta: "Contact sales",
        featured: false,
        features: [
            "Unlimited agents & minutes",
            "Custom voices & languages",
            "Dedicated telephony numbers",
            "SSO & audit logs",
            "SLA-backed support",
        ],
    },
];

const inkFlip = "transition-colors duration-150 group-hover:text-[#14110e] group-focus-visible:text-[#14110e]";
const inkFlipSoft = "transition-colors duration-150 group-hover:text-[#241c15] group-focus-visible:text-[#241c15]";

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="space-y-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-md">
                    <h1 className="text-3xl font-medium text-foreground">Pricing per conversation minute</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Every plan includes telephony, live transcripts and follow-up actions
                    </p>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-1">
                    <button
                        onClick={() => setAnnual(false)}
                        className={cn(
                            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                            !annual ? "bg-secondary text-foreground shadow-[var(--inset-shadow-active)]" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setAnnual(true)}
                        className={cn(
                            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                            annual ? "bg-secondary text-foreground shadow-[var(--inset-shadow-active)]" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Annual <span className="font-mono text-[11px] text-[#8f9e77]">−20%</span>
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {tiers.map((tier) => (
                    <div key={tier.name} className="group relative">
                        <Card
                            className={cn(
                                "tier-card surface-card flex h-full flex-col border-border shadow-[var(--inset-highlight)]",
                                tier.featured && "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(166,124,82,0.35)]"
                            )}
                        >
                            <CardContent className="flex flex-1 flex-col p-6">
                                <div className="flex items-baseline justify-between gap-2">
                                    <h2 className={cn("text-lg font-medium text-foreground", inkFlip)}>{tier.name}</h2>
                                    {tier.featured && (
                                        <span className={cn("font-mono text-[11px] text-primary", inkFlip)}>Most popular</span>
                                    )}
                                </div>
                                <p className={cn("mt-1 text-xs text-muted-foreground", inkFlipSoft)}>{tier.tagline}</p>

                                <div className="mt-6 flex items-baseline gap-1">
                                    {tier.monthly === null ? (
                                        <span className={cn("font-mono text-4xl font-medium tracking-tight text-foreground", inkFlip)}>Custom</span>
                                    ) : (
                                        <>
                                            <span className={cn("font-mono text-4xl font-medium tracking-tight tabular-nums text-foreground", inkFlip)}>
                                                ${annual ? tier.annual : tier.monthly}
                                            </span>
                                            <span className={cn("text-sm text-muted-foreground", inkFlipSoft)}>/month</span>
                                        </>
                                    )}
                                </div>
                                <p className={cn("mt-1 text-xs text-muted-foreground", inkFlipSoft)}>
                                    {tier.monthly === null ? "Tailored contract" : annual ? "Billed annually" : "Billed monthly"}
                                </p>

                                <ul className="mt-6 space-y-2.5">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className={cn("flex items-start gap-2.5 text-sm text-muted-foreground", inkFlipSoft)}>
                                            <Check className={cn("mt-0.5 size-4 shrink-0 text-[#8f9e77]", "transition-colors duration-150 group-hover:text-[#14110e] group-focus-visible:text-[#14110e]")} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <Button
                                        variant={tier.featured ? "default" : "outline"}
                                        className={cn(
                                            "w-full",
                                            tier.featured
                                                ? "group-hover:bg-[#14110e] group-hover:text-[#f5e9dd] group-focus-visible:bg-[#14110e] group-focus-visible:text-[#f5e9dd]"
                                                : "group-hover:border-[rgba(20,17,14,0.4)] group-hover:bg-[rgba(20,17,14,0.08)] group-hover:text-[#14110e] group-focus-visible:border-[rgba(20,17,14,0.4)] group-focus-visible:bg-[rgba(20,17,14,0.08)] group-focus-visible:text-[#14110e]"
                                        )}
                                    >
                                        {tier.cta}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <p className="text-xs text-muted-foreground">
                Prices in USD. Minutes reset monthly and do not roll over. Telephony usage billed at cost.
            </p>
        </motion.div>
    );
}