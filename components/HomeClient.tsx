"use client";
import { useAuth } from "@/components/auth-provider";
import { redirect } from "next/navigation";
import React from "react";

export default function HomeClient() {
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        redirect("/sign-in");
      } else {
        // This component is only used on the landing page, so we'll let the landing page handle the redirect
        redirect("/");
      }
    }
  }, [user, loading]);

  return null;
}
