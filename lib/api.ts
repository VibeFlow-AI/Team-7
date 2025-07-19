import axios from "axios";
import { getSupabaseClient } from "@/lib/supabase/client"; // For auth tokens

// Base Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // Or your Vercel URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Supabase auth token
api.interceptors.request.use(async (config) => {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Error interceptor (optional: log/toast errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    // Optionally integrate with Sentry here
    return Promise.reject(error);
  }
);
