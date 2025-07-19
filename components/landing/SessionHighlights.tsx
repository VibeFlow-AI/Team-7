import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";

const mockMentors = [
  {
    name: "Rahul Lavan",
    location: "Colombo",
    avatarFallback: "RL",
    subjects: ["Science", "Physics", "Biology"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    duration: "30 mins - 1 hour",
    language: "English, Tamil",
  },
  {
    name: "Chathum Rahal",
    location: "Galle",
    avatarFallback: "CR",
    subjects: ["Mathematics", "History", "English"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    duration: "1 hour",
    language: "English",
  },
  {
    name: "Malsha Fernando",
    location: "Colombo",
    avatarFallback: "MF",
    subjects: ["Chemistry", "Art", "Commerce"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    duration: "1 hour",
    language: "Sinhala",
  },
];

export function SessionHighlights() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Session Highlights – Trending Now
          </h2>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed mt-4">
            Join the sessions students are raving about. These expert-led,
            high-impact sessions are designed to help you unlock your full
            potential.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {mockMentors.map((mentor) => (
            <Card
              key={mentor.name}
              className="flex flex-col rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <CardHeader className="flex flex-row items-start gap-4 p-0">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-xl bg-muted">
                    {mentor.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {mentor.location}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-0 pt-4">
                <div className="flex flex-wrap gap-2">
                  {mentor.subjects.map((subject) => (
                    <Badge key={subject} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {mentor.description}
                </p>
                <div>
                  <p className="text-xs font-semibold">
                    Duration:{" "}
                    <span className="font-normal text-muted-foreground">
                      {mentor.duration}
                    </span>
                  </p>
                  <p className="text-xs font-semibold">
                    Preferred Language:{" "}
                    <span className="font-normal text-muted-foreground">
                      {mentor.language}
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-0 pt-6 flex justify-between items-center">
                <Button className="flex-grow">Book a session</Button>
                <Button variant="outline" size="icon" className="ml-4">
                  <BookmarkIcon className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
