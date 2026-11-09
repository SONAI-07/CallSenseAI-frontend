export function DemoNotice({ show }: { show: boolean }) {
    if (!show) return null;
    return (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300">
            Demo mode — backend not reachable. Showing clearly-labelled sample data. Set NEXT_PUBLIC_API_URL and start FastAPI for live numbers.
        </div>
    );
}