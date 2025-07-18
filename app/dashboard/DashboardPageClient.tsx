"use client";
import { useAuth } from "@/components/auth-provider";
import { redirect } from "next/navigation";
import data from "@/public/data.json";
import { DashboardClient } from "@/components/dashboard-client";
import React from "react";

export default function DashboardPageClient() {
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      redirect("/sign-in");
    }
  }, [user, loading]);

  if (loading || !user) return null;

  const sidebarUser = {
    name: user.user_metadata?.name || user.email || "User",
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || "/avatars/shadcn.jpg",
  };
  return <DashboardClient user={sidebarUser} data={data} />;
}
