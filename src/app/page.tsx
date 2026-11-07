import { LandingHero } from "@/components/landing/hero";
import { TranscriptSection } from "@/components/landing/transcript";
import { FeaturesSection } from "@/components/landing/features";
import { CompareSection } from "@/components/landing/compare";
import { StoriesSection } from "@/components/landing/stories";
import { DemoSection } from "@/components/landing/demo";
import { SocialSection, LandingFooter } from "@/components/landing/social";

export default function LandingPage() {
    return (
        <div className="bg-background">
            <LandingHero />
            <TranscriptSection />
            <FeaturesSection />
            <CompareSection />
            <StoriesSection />
            <DemoSection />
            <SocialSection />
            <LandingFooter />
        </div>
    );
}