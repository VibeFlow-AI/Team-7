import { growthbookAdapter } from "@flags-sdk/growthbook";
import { after } from "next/server";

// Set up the tracking callback for all GrowthBook experiments
growthbookAdapter.setTrackingCallback((experiment, result) => {
  // Safely fire and forget async calls (Next.js)
  after(async () => {
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  });
});

// Export the adapter for use in other parts of the application
export { growthbookAdapter };
