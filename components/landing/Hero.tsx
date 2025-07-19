import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full flex justify-center items-center py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Empowering Students with Personalized Mentorship
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              EduVibe connects students with experienced mentors to guide them
              through their academic journey.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/sign-in">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
          {/* AI struggles to replicate complex, artistic image collages from Figma.
              This manual implementation is a simplified version for the hackathon. */}
          <div className="grid grid-cols-3 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
              alt="Student 1"
              width={200}
              height={300}
              className="rounded-full object-cover w-full h-auto aspect-[2/3]"
            />
            <Image
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
              alt="Student 2"
              width={200}
              height={300}
              className="rounded-full object-cover w-full h-auto aspect-[2/3] mt-8"
            />
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop"
              alt="Student 3"
              width={200}
              height={300}
              className="rounded-full object-cover w-full h-auto aspect-[2/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
