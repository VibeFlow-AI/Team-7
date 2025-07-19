"use client";
import { useAuth } from "@/components/auth-provider";
import { redirect } from "next/navigation";
import React from "react";
import {
  DashboardClient,
  DashboardDataItem,
} from "@/components/ui/dashboard-client";

export default function DashboardPageClient() {
  const { user, loading } = useAuth();
  const [data, setData] = React.useState<DashboardDataItem[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!loading && !user) {
      redirect("/sign-in");
    }
  }, [user, loading]);

  // Load data on client side to avoid serialization issues
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData: DashboardDataItem[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to load data:", error);
        setData([]);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !user || dataLoading) return null;

  // Create a plain serializable user object to avoid serialization issues
  const sidebarUser = {
    name: String(user?.user_metadata?.name || user?.email || "User"),
    email: String(user?.email || ""),
    avatar: String(user?.user_metadata?.avatar_url || "/avatars/shadcn.jpg"),
  };

  // Ensure data is serializable by creating a plain copy
  const serializedData = data.map(item => ({
    id: Number(item.id),
    header: String(item.header),
    type: String(item.type),
    status: String(item.status),
    target: String(item.target),
    limit: String(item.limit),
    reviewer: String(item.reviewer),
  }));

  return <DashboardClient user={sidebarUser} data={serializedData} />;
}
