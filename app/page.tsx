import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { SessionHighlights } from "@/components/landing/SessionHighlights";
import { StudentFeatures } from "@/components/landing/StudentFeatures";

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <StudentFeatures />
        <SessionHighlights />
      </main>
      <Footer />
    </div>
  );
}
