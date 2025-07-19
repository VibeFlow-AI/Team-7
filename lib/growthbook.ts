import { GrowthBook } from "@growthbook/growthbook";
import { growthbookAdapter } from "@flags-sdk/growthbook";

// Initialize GrowthBook instance
export function createGrowthBookInstance() {
  const gb = new GrowthBook({
    apiHost: process.env.GROWTHBOOK_API_HOST || "https://cdn.growthbook.io",
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
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

  return gb;
}

// Configure the GrowthBook adapter
export function configureGrowthBook() {
  const gb = createGrowthBookInstance();

  // Load feature definitions
  gb.loadFeatures();

  return gb;
}

// Export a singleton instance
export const growthbook = configureGrowthBook();
