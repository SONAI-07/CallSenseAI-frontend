import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingPage() {
    return (
        <Card className="border-border/60 bg-card/60">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-24 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/15">
                    <CreditCard className="size-6 text-violet-400" />
                </div>
                <h1 className="text-lg font-semibold">Pricing</h1>
                <p className="max-w-sm text-sm text-muted-foreground">Stripe-style pricing tiers land in the next build step.</p>
            </CardContent>
        </Card>
    );
}