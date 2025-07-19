"use client";

import { createContext, useContext } from "react";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useSupabaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
