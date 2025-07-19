import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const features = [
  {
    title: "Personalized Learning",
    description:
      "We tailor the mentorship experience to fit each student's unique goals, learning style, and pace.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Real Mentors, Real Guidance",
    description:
      "Connect with students with mentors who offer guidance, support, and practical industry insights.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Growth & Career Readiness",
    description:
      "Gain the skills and confidence needed to excel academically and prepare for your future career.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2835&auto=format&fit=crop",
  },
  {
    title: "Insights-Driven Support",
    description:
      "Our platform provides valuable feedback and tracking to make every session impactful.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
  },
];

export function StudentFeatures() {
  return (
    <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What's in it for Students?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            EduVibe is a student-mentor platform designed to personalize
            learning journeys.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden group">
              <div className="relative h-60">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
