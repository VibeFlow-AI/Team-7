"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { RouteGuard } from "@/components/route-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/theme-toggle";
import {
  BookOpen,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  BarChart3,
  MessageSquare,
  Bell,
} from "lucide-react";

interface MentorLayoutProps {
  children: React.ReactNode;
}

const mentorNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard/mentor",
    icon: BarChart3,
  },
  {
    title: "Sessions",
    href: "/dashboard/mentor/sessions",
    icon: Calendar,
  },
  {
    title: "Students",
    href: "/dashboard/mentor/students",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/dashboard/mentor/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/mentor/settings",
    icon: Settings,
  },
];

export default function MentorLayout({ children }: MentorLayoutProps) {
  const { userProfile, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Memoize navigation items to prevent re-renders
  const navigationItems = useMemo(() => {
    return mentorNavItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;
      return {
        ...item,
        Icon,
        isActive,
      };
    });
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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

  return (
    <RouteGuard
      requireAuth={true}
      requireRole="MENTOR"
      redirectTo="/dashboard/mentor"
    >
      <div className="min-h-screen bg-background flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">EduVibe</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={
                      userProfile?.mentorProfile?.profilePictureUrl || undefined
                    }
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userProfile?.mentorProfile?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "M"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.mentorProfile?.fullName || "Mentor"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile?.mentorProfile?.professionalRole || "Mentor"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  Mentor
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="ml-auto text-muted-foreground hover:text-foreground flex-shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${
                      item.isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.Icon
                    className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${item.isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}
                  `}
                  />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold hidden sm:block">
                  Mentor Dashboard
                </h1>
                <h1 className="text-lg font-semibold sm:hidden">Dashboard</h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Bell className="h-5 w-5" />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
        </div>
      </div>
    </RouteGuard>
  );
}
