"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useSessions } from "@/hooks/use-sessions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Search,
  Video,
  Star,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

export function StudentDashboard() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const { sessions, loading: sessionsLoading, error } = useSessions();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default";
      case "Pending":
        return "secondary";
      case "Completed":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

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

  const upcomingSessions = sessions.filter(
    (session) => session.status === "Booked" || session.status === "Confirmed"
  );

  const completedSessions = sessions.filter(
    (session) => session.status === "Completed"
  );

  // Don't show loading state if we already have user data
  if (loading && !userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Show loading state for sessions
  if (sessionsLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading sessions...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Sessions
                </p>
                <p className="text-2xl font-bold">{sessions.length}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming
                </p>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Subjects
                </p>
                <p className="text-2xl font-bold">
                  {userProfile?.studentProfile?.subjectsOfInterest?.length || 0}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booked Sessions */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Booked Sessions</h2>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/student/discover")}
            className="flex items-center gap-2 hidden sm:flex"
          >
            <Search className="h-4 w-4" />
            Book New Session
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/student/discover")}
            className="flex items-center gap-2 sm:hidden"
          >
            <Search className="h-4 w-4" />
            Book
          </Button>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No sessions booked yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start your learning journey by discovering and booking sessions
                with mentors.
              </p>
              <Button
                onClick={() => router.push("/dashboard/student/discover")}
              >
                Discover Mentors
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={session.mentor.profilePictureUrl || undefined}
                        />
                        <AvatarFallback
                          className={`${getInitialsColor(
                            session.mentor.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}`}
                        >
                          {session.mentor.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {session.mentor.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {session.mentor.professionalRole}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(session.status)}>
                      {session.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(session.sessionDate), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(session.sessionDate), "HH:mm")} (
                      {session.durationHours} hours)
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        // This would open session details modal
                        console.log("View session details:", session.id);
                      }}
                    >
                      View Session Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
            onClick={() => router.push("/dashboard/student/discover")}
          >
            <Search className="h-6 w-6" />
            <span>Find Mentors</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
            onClick={() => router.push("/dashboard/student/settings")}
          >
            <Users className="h-6 w-6" />
            <span>Profile Settings</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
            onClick={() => router.push("/dashboard/student/learning")}
          >
            <TrendingUp className="h-6 w-6" />
            <span>Learning Progress</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
