"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            <motion.div variants={item} className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-semibold tracking-tight">Simple, minute-based pricing</h1>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Pay for outbound conversations, not seats. Every plan includes the full Voice AI stack.
                </p>
                <div className="mt-6 flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-1">
                    <button
                        onClick={() => setAnnual(false)}
                        className={cn(
                            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                            !annual ? "bg-violet-600 text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setAnnual(true)}
                        className={cn(
                            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                            annual ? "bg-violet-600 text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Annual <span className="text-emerald-400">−20%</span>
                    </button>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
                {tiers.map((tier) => (
                    <motion.div variants={item} key={tier.name} className="relative">
                        {tier.featured && (
                            <Badge className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 gap-1 border-violet-500/40 bg-violet-600 text-white">
                                <Sparkles className="size-3" /> Most popular
                            </Badge>
                        )}
                        <Card
                            className={cn(
                                "flex h-full flex-col border-border/60 bg-card/60",
                                tier.featured && "border-violet-500/40 bg-gradient-to-b from-violet-600/15 to-card shadow-lg shadow-violet-950/30"
                            )}
                        >
                            <CardContent className="flex flex-1 flex-col p-6">
                                <h2 className="text-lg font-semibold">{tier.name}</h2>
                                <p className="mt-1 text-xs text-muted-foreground">{tier.tagline}</p>

                                <div className="mt-6 flex items-baseline gap-1">
                                    {tier.monthly === null ? (
                                        <span className="text-4xl font-semibold tracking-tight">Custom</span>
                                    ) : (
                                        <>
                      <span className="text-4xl font-semibold tracking-tight tabular-nums">
                        ${annual ? tier.annual : tier.monthly}
                      </span>
                                            <span className="text-sm text-muted-foreground">/month</span>
                                        </>
                                    )}
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {tier.monthly === null ? "Tailored contract" : annual ? "Billed annually" : "Billed monthly"}
                                </p>

                                <ul className="mt-6 space-y-2.5">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <Button
                                        variant={tier.featured ? "default" : "outline"}
                                        className={cn("w-full", tier.featured && "bg-violet-600 hover:bg-violet-500")}
                                    >
                                        {tier.cta}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.p variants={item} className="text-center text-xs text-muted-foreground">
                Prices in USD. Minutes reset monthly and do not roll over. Telephony usage billed at cost.
            </motion.p>
        </motion.div>
    );
}