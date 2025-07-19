import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard | EduVibe",
  description: "Student dashboard for managing learning sessions and progress",
};

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
