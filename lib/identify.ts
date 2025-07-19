import { growthbookAdapter } from "@flags-sdk/growthbook";
import { after } from "next/server";
import { headers, cookies } from "next/headers";
import type { Attributes } from "@flags-sdk/growthbook";
import type { Identify } from "flags";
import { dedupe } from "flags/next";

// Set up tracking callback for GrowthBook
growthbookAdapter.setTrackingCallback((experiment, result) => {
  // Safely fire and forget async calls (Next.js)
  after(async () => {
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  });
});

// Helper function to get user information
async function getUser(headers: any, cookies: any) {
  // This is a placeholder - implement your own user identification logic
  // You might want to integrate with Supabase auth here
  return {
    id: "anonymous",
    // Add other user properties as needed
  };
}

export const identify = dedupe(async () => {
  // Your own logic to identify the user
  const headersList = await headers();
  const cookieStore = await cookies();
  const user = await getUser(headersList, cookieStore);

  // Get request information
  const userAgent = headersList.get("user-agent") || "";
  const host = headersList.get("host") || "";
  const url = headersList.get("x-url") || "";

  // Parse user agent for device and browser info
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
  const deviceType = isMobile ? "mobile" : "desktop";

  let browser = "unknown";
  if (userAgent.includes("Chrome")) browser = "chrome";
  else if (userAgent.includes("Firefox")) browser = "firefox";
  else if (userAgent.includes("Safari")) browser = "safari";
  else if (userAgent.includes("Edge")) browser = "edge";

  return {
    id: user.id || "anonymous",
    url: url,
    path: headersList.get("x-pathname") || "",
    host: host,
    query: headersList.get("x-search") || "",
    deviceType: deviceType,
    browser: browser,
    utmSource: cookieStore.get("utm_source")?.value || "",
    utmMedium: cookieStore.get("utm_medium")?.value || "",
    utmCampaign: cookieStore.get("utm_campaign")?.value || "",
    utmTerm: cookieStore.get("utm_term")?.value || "",
    utmContent: cookieStore.get("utm_content")?.value || "",
  };
}) satisfies Identify<Attributes>;
