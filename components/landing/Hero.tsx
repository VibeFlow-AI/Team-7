import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full min-h-screen flex justify-center py-20 md:py-25">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col space-y-6 gap-4">
            <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Empowering Students with Personalized Mentorship
            </h1>
            <div className="flex flex-col space-y-6">
              {/* <div className="flex flex-col"> */}
              <p className="max-w-[600px] text-muted-foreground md:text-xl sm:mt-15">
                EduVibe connects students with experienced mentors to guide them
                through their academic journey.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-in">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* AI struggles to replicate complex, artistic image collages from Figma.
              This manual implementation is a simplified version for the hackathon. */}
          <div className="relative flex flex-wrap gap-4 max-h-[600px] overflow-auto justify-center">
            <div className="mt-17 flex flex-col gap-4 flex-1 min-w-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                alt="Student 1"
                width={200}
                height={240}
                className="rounded-full object-cover w-full aspect-[4/5]"
              />
              <Image
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                alt="Student 2"
                width={200}
                height={300}
                className="rounded-full object-cover w-full aspect-[2/3]"
              />
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop"
                alt="Student 3"
                width={200}
                height={280}
                className="rounded-full object-cover w-full aspect-[5/7]"
              />
            </div>
            <div className="flex flex-col gap-4 flex-1 min-w-0">
              <Image
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                alt="Student 2"
                width={200}
                height={320}
                className="rounded-full object-cover w-full aspect-[5/8]"
              />
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop"
                alt="Student 3"
                width={200}
                height={200}
                className="rounded-full object-cover w-full aspect-square"
              />
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                alt="Student 1"
                width={200}
                height={260}
                className="rounded-full object-cover w-full aspect-[3/4]"
              />
            </div>
            <div className="mt-21 flex flex-col gap-4 flex-1 min-w-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                alt="Student 1"
                width={200}
                height={300}
                className="rounded-full object-cover w-full aspect-[2/3]"
              />
              <Image
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                alt="Student 2"
                width={200}
                height={220}
                className="rounded-full object-cover w-full aspect-[10/11]"
              />
              <Image
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=2823&auto=format&fit=crop"
                alt="Student 2"
                width={200}
                height={300}
                className="rounded-full object-cover w-full aspect-[2/3]"
              />
            </div>
                {/* <div className="z-10 absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
