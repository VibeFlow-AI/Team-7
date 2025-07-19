"use client";

import { useState } from "react";
import { FilterOptions } from "@/lib/matching-algorithm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Filter,
  MapPin,
  Clock,
  Languages,
  BookOpen,
  Users,
} from "lucide-react";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  sessionDurationOptions: string[];
  subjectOptions: string[];
  languageOptions: string[];
  studentLevelOptions: string[];
}

export function FilterPanel({
  filters,
  onFilterChange,
  sessionDurationOptions,
  subjectOptions,
  languageOptions,
  studentLevelOptions,
}: FilterPanelProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    filters.subjects || []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    filters.languages || []
  );
  const [selectedStudentLevels, setSelectedStudentLevels] = useState<string[]>(
    filters.studentLevels || []
  );

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    onFilterChange({ ...filters, ...newFilters });
  };

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(newSubjects);
    updateFilters({
      subjects: newSubjects.length > 0 ? newSubjects : undefined,
    });
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];

    setSelectedLanguages(newLanguages);
    updateFilters({
      languages: newLanguages.length > 0 ? newLanguages : undefined,
    });
  };

  const handleStudentLevelToggle = (level: string) => {
    const newLevels = selectedStudentLevels.includes(level)
      ? selectedStudentLevels.filter((l) => l !== level)
      : [...selectedStudentLevels, level];

    setSelectedStudentLevels(newLevels);
    updateFilters({
      studentLevels: newLevels.length > 0 ? newLevels : undefined,
    });
  };

  const clearAllFilters = () => {
    setSelectedSubjects([]);
    setSelectedLanguages([]);
    setSelectedStudentLevels([]);
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof FilterOptions];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Session Duration */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              Session Duration
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Select
            value={filters.sessionDuration || ""}
            onValueChange={(value) =>
              updateFilters({ sessionDuration: value || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any duration</SelectItem>
              {sessionDurationOptions.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">Location</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Input
            placeholder="Enter city or location"
            value={filters.location || ""}
            onChange={(e) =>
              updateFilters({ location: e.target.value || undefined })
            }
          />
        </CardContent>
      </Card>

      {/* Subjects */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {subjectOptions.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={() => handleSubjectToggle(subject)}
                />
                <Label
                  htmlFor={`subject-${subject}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {languageOptions.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`language-${language}`}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
                />
                <Label
                  htmlFor={`language-${language}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Levels */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              Student Levels
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {studentLevelOptions.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={selectedStudentLevels.includes(level)}
                  onCheckedChange={() => handleStudentLevelToggle(level)}
                />
                <Label
                  htmlFor={`level-${level}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-primary">Active Filters</h4>
            <div className="space-y-2">
              {filters.sessionDuration && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {filters.sessionDuration}
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {filters.location}
                </Badge>
              )}
              {filters.subjects && filters.subjects.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.subjects.map((subject) => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              )}
              {filters.languages && filters.languages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.languages.map((language) => (
                    <Badge key={language} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              )}
              {filters.studentLevels && filters.studentLevels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {filters.studentLevels.map((level) => (
                    <Badge key={level} variant="outline" className="text-xs">
                      {level}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
