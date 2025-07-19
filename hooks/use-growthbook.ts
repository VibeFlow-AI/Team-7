"use client";

import { GrowthBook } from "@growthbook/growthbook";
import { useEffect, useState } from "react";

export function useGrowthBook() {
  const [gb, setGb] = useState<GrowthBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize GrowthBook
    const growthbook = new GrowthBook({
      apiHost:
        process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST ||
        "https://cdn.growthbook.io",
      clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      enableDevMode: process.env.NODE_ENV === "development",
      subscribeToChanges: true,
      trackingCallback: (experiment, result) => {
        // Track experiment views
        console.log("GrowthBook Experiment:", {
          experimentId: experiment.key,
          variationId: result.key,
          variationName: result.name,
        });
      },
    });

    // Load features and set user attributes
    growthbook.loadFeatures().then(() => {
      // Set user attributes (you can customize this based on your user data)
      growthbook.setAttributes({
        id: "anonymous", // You would get this from your auth system
        deviceType: "desktop",
        browser: "chrome",
        // Add other attributes as needed
      });

      setGb(growthbook);
      setLoading(false);
    });

    // Cleanup
    return () => {
      growthbook.destroy();
    };
  }, []);

  return { gb, loading };
}

// Hook to get a specific feature flag value
export function useFeatureFlag<T = boolean>(key: string, defaultValue: T): T {
  const { gb, loading } = useGrowthBook();
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (!gb || loading) return;

    const updateValue = () => {
      const flagValue = gb.getFeatureValue(key, defaultValue);
      setValue(flagValue as T);
    };

    // Initial value
    updateValue();

    // Subscribe to changes
    const unsubscribe = gb.subscribe(updateValue);

    return unsubscribe;
  }, [gb, loading, key, defaultValue]);

  return loading ? defaultValue : value;
}
