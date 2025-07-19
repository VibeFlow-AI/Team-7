"use client";

import DashboardPageClient from "./DashboardPageClient";
import { RouteGuard } from "@/components/route-guard";

export default function Page() {
  return (
    <RouteGuard requireAuth={true}>
      <DashboardPageClient />
    </RouteGuard>
  );
}
