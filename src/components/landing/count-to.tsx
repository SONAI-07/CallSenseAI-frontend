"use client";

import { useEffect, useState } from "react";

export function CountTo({ to, run, duration = 900, suffix = "" }: { to: number; run: boolean; duration?: number; suffix?: string }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!run) return;
        let raf = 0;
        const t0 = performance.now();
        const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [run, to, duration]);
    return <>{val.toLocaleString()}{suffix}</>;
}