"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AudioLines, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reveal = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } };

const orbiters = [
    { i: "RS", cls: "bg-[#f5e9dd] text-[#1b1613] border-[rgba(27,22,19,0.2)]" },
    { i: "PN", cls: "bg-secondary text-foreground border-border" },
    { i: "DP", cls: "bg-[#f5e9dd] text-[#1b1613] border-[rgba(27,22,19,0.2)]" },
    { i: "SK", cls: "bg-secondary text-foreground border-border" },
    { i: "MK", cls: "bg-[#f5e9dd] text-[#1b1613] border-[rgba(27,22,19,0.2)]" },
    { i: "EA", cls: "bg-secondary text-foreground border-border" },
];

export function LandingHero() {
    return (
        <section className="scene-warm relative overflow-hidden">
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
                        <a href="#race" className="transition-colors hover:text-foreground">Manual vs AI</a>
                        <a href="#stories" className="transition-colors hover:text-foreground">Stories</a>
                        <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
                    </nav>
                    <div className="ml-auto flex items-center gap-5">
                        <a href="mailto:sales@voxasell.ai" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">Contact sales</a>
                        <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Sign in</Link>
                        <Link href="/login"><Button className="h-9">Get started</Button></Link>
                    </div>
                </div>
            </header>

            <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-36 text-center lg:px-10">
                <motion.div {...reveal} className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1">
                    <span className="relative flex size-1.5">
                        <span className="dot-halo absolute inline-flex h-full w-full rounded-full bg-[#8f9e77]" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-[#8f9e77]" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">24/7 voice fleet · on air now</span>
                </motion.div>

                <motion.h1 {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="mx-auto mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-foreground lg:text-6xl">
                    The sales engine that never{" "}
                    <span className="mx-1 inline-flex size-9 -translate-y-1 items-center justify-center rounded-lg bg-primary align-middle shadow-[var(--inset-highlight)]">
                        <AudioLines className="size-4 text-[#14110e]" />
                    </span>{" "}
                    sleeps
                </motion.h1>
                <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                    VoxaSell dials, qualifies and books — your reps only talk to people who said yes
                </motion.p>
                <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.24 }} className="mt-8 flex justify-center">
                    <Link href="/login">
                        <Button className="h-11 px-6">Get started <span className="ml-2 size-1.5 rounded-full bg-[#14110e]" /></Button>
                    </Link>
                </motion.div>

                {/* Orbit radar */}
                <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.32 }} className="relative mx-auto mt-16 h-[340px] w-[340px] [--orbit-r:150px] sm:h-[420px] sm:w-[420px] sm:[--orbit-r:188px]">
                    <div className="absolute inset-0 rounded-full border border-[rgba(166,124,82,0.22)]" />
                    <div className="absolute inset-[16%] rounded-full border border-[rgba(166,124,82,0.32)]" />
                    <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgba(166,124,82,0.35),rgba(166,124,82,0)_70%)]" />
                    <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary shadow-[var(--inset-highlight),0_0_0_1px_rgba(166,124,82,0.35)]">
                        <AudioLines className="size-7 text-primary" />
                    </div>
                    <div className="orbit-spin absolute inset-0">
                        {orbiters.map((a, i) => (
                            <div key={a.i} className="absolute left-1/2 top-1/2 -ml-5 -mt-5" style={{ transform: `rotate(${i * 60}deg) translateY(calc(var(--orbit-r) * -1))` }}>
                                <div className="orbit-spin-rev">
                                    <div style={{ transform: `rotate(${-i * 60}deg)` }} className={`flex size-10 items-center justify-center rounded-full border font-mono text-[11px] font-medium shadow-[0_8px_20px_rgba(0,0,0,0.35)] ${a.cls}`}>
                                        {a.i}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="float-slow absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#f5e9dd] px-3 py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
                        <span className="size-1.5 rounded-full bg-[#5e7b4f]" />
                        <span className="font-mono text-[11px] font-medium text-[#1b1613]">Call in progress · 0:47</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}