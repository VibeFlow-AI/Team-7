export interface BookedSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorInitials: string;
  subjects: string[];
  sessionDate: string;
  sessionTime: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  bankSlipUrl?: string;
  createdAt: string;
}

export const mockBookedSessions: BookedSession[] = [
  {
    id: "1",
    mentorId: "1",
    mentorName: "Rahul Lavan",
    mentorInitials: "RL",
    subjects: ["Physics", "Biology"],
    sessionDate: "2025-01-15",
    sessionTime: "10:00",
    duration: "2 hours",
    status: "Confirmed",
    bankSlipUrl: "/bank-slips/slip1.jpg",
    createdAt: "2025-01-10T09:30:00Z",
  },
  {
    id: "2",
    mentorId: "4",
    mentorName: "Priya Sharma",
    mentorInitials: "PS",
    subjects: ["Mathematics", "Computer Science"],
    sessionDate: "2025-01-18",
    sessionTime: "14:00",
    duration: "2 hours",
    status: "Pending",
    bankSlipUrl: "/bank-slips/slip2.jpg",
    createdAt: "2025-01-12T11:15:00Z",
  },
  {
    id: "3",
    mentorId: "10",
    mentorName: "Samantha Jayasuriya",
    mentorInitials: "SJ",
    subjects: ["Programming", "Web Development"],
    sessionDate: "2025-01-20",
    sessionTime: "16:00",
    duration: "2 hours",
    status: "Confirmed",
    bankSlipUrl: "/bank-slips/slip3.jpg",
    createdAt: "2025-01-14T15:45:00Z",
  },
  {
    id: "4",
    mentorId: "6",
    mentorName: "Anjali Patel",
    mentorInitials: "AP",
    subjects: ["English Literature", "Creative Writing"],
    sessionDate: "2025-01-22",
    sessionTime: "09:00",
    duration: "2 hours",
    status: "Completed",
    bankSlipUrl: "/bank-slips/slip4.jpg",
    createdAt: "2025-01-16T10:20:00Z",
  },
];
