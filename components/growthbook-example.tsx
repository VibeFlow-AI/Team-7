"use client";

import { useFeatureFlag, useGrowthBook } from "@/hooks/use-growthbook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GrowthBookExample() {
  const { gb, loading } = useGrowthBook();

  // Example feature flags
  const showNewFeature = useFeatureFlag("new-feature", false);
  const welcomeMessage = useFeatureFlag<string>("welcome-message", "Welcome!");
  const buttonColor = useFeatureFlag<string>("button-color", "blue");

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GrowthBook Features</CardTitle>
          <CardDescription>Loading feature flags...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GrowthBook Feature Flags</CardTitle>
        <CardDescription>
          Demonstrating feature flags with GrowthBook
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge variant={showNewFeature ? "default" : "secondary"}>
            New Feature: {showNewFeature ? "Enabled" : "Disabled"}
          </Badge>
        </div>

        {showNewFeature && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800">
              🎉 New Feature Unlocked!
            </h3>
            <p className="text-green-700">
              This feature is controlled by a GrowthBook flag.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p>
            <strong>Welcome Message:</strong> {welcomeMessage}
          </p>
          <p>
            <strong>Button Color:</strong>
            <span
              className={`ml-2 px-2 py-1 rounded text-white ${
                buttonColor === "red"
                  ? "bg-red-500"
                  : buttonColor === "green"
                    ? "bg-green-500"
                    : "bg-blue-500"
              }`}
            >
              {buttonColor}
            </span>
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <strong>GrowthBook Status:</strong>{" "}
            {gb ? "Connected" : "Not Connected"}
          </p>
          <p>
            <strong>Features Loaded:</strong>{" "}
            {gb ? Object.keys(gb.getFeatures()).length : 0}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
