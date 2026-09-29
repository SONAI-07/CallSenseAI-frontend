import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <AppSidebar />
            <div className="pl-60">
                <TopBar />
                <main className="mx-auto max-w-7xl space-y-6 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}