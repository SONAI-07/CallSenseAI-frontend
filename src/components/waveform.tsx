function seededHeights(seed: string, n: number) {
    let h = 0;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return Array.from({ length: n }, () => {
        h = (h * 1664525 + 1013904223) >>> 0;
        return 0.25 + ((h % 1000) / 1000) * 0.75;
    });
}

export function Waveform({ seed, live = false, className = "" }: { seed: string; live?: boolean; className?: string }) {
    const bars = seededHeights(seed, 28);
    return (
        <div aria-hidden className={`flex h-6 items-end gap-[3px] ${live ? "" : "eq-static"} ${className}`}>
            {bars.map((b, i) => (
                <span
                    key={i}
                    className="eq-bar w-[3px] rounded-full bg-current"
                    style={{
                        height: `${Math.round(b * 100)}%`,
                        animationDelay: `${(i % 7) * 0.12}s`,
                        animationDuration: `${1.4 + (i % 5) * 0.18}s`,
                    }}
                />
            ))}
        </div>
    );
}