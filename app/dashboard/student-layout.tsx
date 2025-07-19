"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { RouteGuard } from "@/components/route-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Search,
} from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    name: "Discover",
    href: "/dashboard/student/discover",
    icon: Search,
  },
  {
    name: "My Sessions",
    href: "/dashboard/student/sessions",
    icon: Calendar,
  },
  {
    name: "Learning Path",
    href: "/dashboard/student/learning",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/dashboard/student/settings",
    icon: Settings,
  },
];

export default function StudentLayout({ children }: StudentLayoutProps) {
  const { userProfile, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
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
      requireRole="STUDENT"
      redirectTo="/dashboard/student"
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

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}
                    `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={userProfile?.avatarUrl} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userProfile?.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userProfile?.fullName || "Student"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  Student
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
                  Student Dashboard
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
