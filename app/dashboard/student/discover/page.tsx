"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  mockMentors,
  sessionDurationOptions,
  subjectOptions,
  languageOptions,
  studentLevelOptions,
} from "@/lib/mock-data";
import {
  getFilteredRecommendations,
  FilterOptions,
} from "@/lib/matching-algorithm";
import { MentorCard } from "@/components/mentor-card";
import { FilterPanel } from "@/components/filter-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Search, X, Filter, Sparkles } from "lucide-react";
import StudentLayout from "../../student-layout";

export default function StudentDiscoverPage() {
  const { userProfile, loading } = useAuth();
  const [filteredMentors, setFilteredMentors] = useState(mockMentors);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and get personalized recommendations
  useEffect(() => {
    if (!userProfile || !userProfile.studentProfile) return;

    setIsFiltering(true);

    // Use setTimeout to simulate processing time for better UX
    const timer = setTimeout(() => {
      const recommendations = getFilteredRecommendations(
        userProfile,
        mockMentors,
        filters,
        12
      );
      setFilteredMentors(recommendations);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [userProfile, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof FilterOptions];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex min-h-screen items-center justify-center">
          <Card className="p-8">
            <CardContent className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg">Loading mentors...</span>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
                <p className="text-muted-foreground">
                  Find the perfect mentor for your learning journey
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Panel */}
          {showFilters && (
            <div className="w-80 shrink-0">
              <Card className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  sessionDurationOptions={sessionDurationOptions}
                  subjectOptions={subjectOptions}
                  languageOptions={languageOptions}
                  studentLevelOptions={studentLevelOptions}
                />
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    {isFiltering ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finding mentors...
                      </div>
                    ) : (
                      `${filteredMentors.length} mentors found`
                    )}
                  </h2>

                  {hasActiveFilters && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      Personalized
                    </Badge>
                  )}
                </div>

                {hasActiveFilters && (
                  <div className="text-sm text-muted-foreground">
                    Based on your preferences
                  </div>
                )}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Mentor Grid */}
            {filteredMentors.length === 0 ? (
              <Card className="p-12">
                <CardContent className="text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">
                    No mentors found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your filters or broadening your search
                    criteria to find more mentors.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
