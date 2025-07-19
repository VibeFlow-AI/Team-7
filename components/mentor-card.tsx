"use client";

import { useState } from "react";
import { Mentor } from "@/hooks/use-mentors";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  Star,
  MapPin,
  Clock,
  Languages,
  Users,
  Sparkles,
} from "lucide-react";
import { BookingModal } from "@/components/booking-modal";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const { userProfile } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Generate matching reasons based on student profile
  const getMatchingReasons = () => {
    if (!userProfile?.studentProfile) return [];

    const reasons: string[] = [];
    const studentSubjects = userProfile.studentProfile.subjectsOfInterest || [];
    const studentLevel = userProfile.studentProfile.currentEducationLevel;

    // Check subject matches
    const subjectMatches = studentSubjects.filter((subject) =>
      mentor.subjectsToTeach.some((mentorSubject) =>
        mentorSubject.toLowerCase().includes(subject.toLowerCase())
      )
    );

    if (subjectMatches.length > 0) {
      reasons.push(`Teaches ${subjectMatches.join(", ")}`);
    }

    // Check education level
    if (mentor.preferredStudentLevels.includes(studentLevel)) {
      reasons.push(`Teaches your level: ${studentLevel}`);
    }

    // Check experience
    if (
      mentor.teachingExperience.includes("5+") ||
      mentor.teachingExperience.includes("10+")
    ) {
      reasons.push("Highly experienced educator");
    }

    return reasons;
  };

  const matchingReasons = getMatchingReasons();

  const handleBookSession = () => {
    setShowBookingModal(true);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Generate color based on initials
  const getInitialsColor = (initials: string) => {
    const colors = [
      "bg-blue-500",
      "bg-orange-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-yellow-500",
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
        <CardContent className="p-6 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mentor.profilePictureUrl || undefined} />
                <AvatarFallback
                  className={`${getInitialsColor(
                    mentor.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  )}`}
                >
                  {mentor.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {mentor.fullName}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {mentor.currentLocation || "Location not specified"}
                </div>
              </div>
            </div>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full hover:bg-accent transition-colors ${
                isBookmarked ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Subjects */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {mentor.subjectsToTeach.slice(0, 3).map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {subject}
                </Badge>
              ))}
              {mentor.subjectsToTeach.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mentor.subjectsToTeach.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {mentor.shortBio}
          </p>

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Duration: 2 hours (standard)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Languages className="h-4 w-4" />
              <span>Languages: {mentor.preferredLanguage.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Teaches: {mentor.preferredStudentLevels.join(", ")}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">5.0</span>
              <span className="text-sm text-muted-foreground">
                (Experienced)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {mentor.teachingExperience}
            </div>
          </div>

          {/* Matching Reasons */}
          {matchingReasons.length > 0 && (
            <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="text-xs font-medium text-primary mb-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Why this mentor matches you:
              </h4>
              <ul className="text-xs text-primary/80 space-y-1">
                {matchingReasons.slice(0, 2).map((reason, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-primary mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            onClick={handleBookSession}
            className="w-full group-hover:scale-105 transition-transform"
            size="sm"
          >
            Book a session
          </Button>
        </CardFooter>
      </Card>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          mentor={mentor}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}
