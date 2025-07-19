export interface MockMentor {
  id: string;
  fullName: string;
  initials: string;
  location: string;
  subjects: string[];
  shortBio: string;
  sessionDuration: string;
  preferredLanguage: string[];
  teachingExperience: string;
  preferredStudentLevels: string[];
  professionalRole: string;
  linkedInProfile: string;
  githubOrPortfolio?: string;
  profilePictureUrl?: string;
  rating?: number;
  totalSessions?: number;
}

export const mockMentors: MockMentor[] = [
  {
    id: "1",
    fullName: "Rahul Lavan",
    initials: "RL",
    location: "Colombo",
    subjects: ["Science", "Physics", "Biology"],
    shortBio:
      "Experienced physics teacher with 8+ years of teaching experience. Specialized in making complex concepts simple and engaging for students.",
    sessionDuration: "30 mins - 1 hour",
    preferredLanguage: ["English", "Tamil"],
    teachingExperience: "5+ years",
    preferredStudentLevels: ["Grade 10", "Grade 11", "Advanced Level"],
    professionalRole: "Senior Physics Teacher",
    linkedInProfile: "https://linkedin.com/in/rahul-lavan",
    rating: 4.8,
    totalSessions: 156,
  },
  {
    id: "2",
    fullName: "Chathum Rahal",
    initials: "CR",
    location: "Galle",
    subjects: ["Mathematics", "History", "English"],
    shortBio:
      "Passionate educator with expertise in mathematics and history. Focus on building strong foundational skills and critical thinking.",
    sessionDuration: "1 hour",
    preferredLanguage: ["English"],
    teachingExperience: "3-5 years",
    preferredStudentLevels: ["Grade 9", "Grade 10", "Ordinary Level"],
    professionalRole: "Mathematics Teacher",
    linkedInProfile: "https://linkedin.com/in/chathum-rahal",
    rating: 4.6,
    totalSessions: 89,
  },
  {
    id: "3",
    fullName: "Malsha Fernando",
    initials: "MF",
    location: "Colombo",
    subjects: ["Chemistry", "Art", "Commerce"],
    shortBio:
      "Creative chemistry teacher who combines scientific rigor with artistic approaches. Specialized in organic chemistry and laboratory techniques.",
    sessionDuration: "1 hour",
    preferredLanguage: ["Sinhala"],
    teachingExperience: "1-3 years",
    preferredStudentLevels: ["Grade 10", "Grade 11", "Advanced Level"],
    professionalRole: "Chemistry Lecturer",
    linkedInProfile: "https://linkedin.com/in/malsha-fernando",
    rating: 4.7,
    totalSessions: 67,
  },
  {
    id: "4",
    fullName: "Priya Sharma",
    initials: "PS",
    location: "Kandy",
    subjects: ["Mathematics", "Physics", "Computer Science"],
    shortBio:
      "Tech-savvy mathematics teacher with strong background in computer science. Expert in calculus, algebra, and programming fundamentals.",
    sessionDuration: "1-2 hours",
    preferredLanguage: ["English", "Tamil"],
    teachingExperience: "5+ years",
    preferredStudentLevels: ["Grade 11", "Advanced Level"],
    professionalRole: "Senior Mathematics Lecturer",
    linkedInProfile: "https://linkedin.com/in/priya-sharma",
    githubOrPortfolio: "https://github.com/priyasharma",
    rating: 4.9,
    totalSessions: 234,
  },
  {
    id: "5",
    fullName: "Dilshan Perera",
    initials: "DP",
    location: "Jaffna",
    subjects: ["Biology", "Chemistry", "Environmental Science"],
    shortBio:
      "Environmental scientist and biology teacher with research experience. Passionate about sustainable education and practical learning.",
    sessionDuration: "1 hour",
    preferredLanguage: ["English", "Tamil", "Sinhala"],
    teachingExperience: "3-5 years",
    preferredStudentLevels: ["Grade 10", "Grade 11", "Advanced Level"],
    professionalRole: "Biology Research Fellow",
    linkedInProfile: "https://linkedin.com/in/dilshan-perera",
    rating: 4.5,
    totalSessions: 123,
  },
  {
    id: "6",
    fullName: "Anjali Patel",
    initials: "AP",
    location: "Colombo",
    subjects: ["English Literature", "Creative Writing", "Drama"],
    shortBio:
      "Published author and English literature teacher. Specialized in Shakespeare, modern literature, and creative writing techniques.",
    sessionDuration: "45 mins - 1 hour",
    preferredLanguage: ["English"],
    teachingExperience: "5+ years",
    preferredStudentLevels: [
      "Grade 9",
      "Grade 10",
      "Ordinary Level",
      "Advanced Level",
    ],
    professionalRole: "English Literature Professor",
    linkedInProfile: "https://linkedin.com/in/anjali-patel",
    rating: 4.8,
    totalSessions: 189,
  },
  {
    id: "7",
    fullName: "Kumar Silva",
    initials: "KS",
    location: "Matara",
    subjects: ["Economics", "Business Studies", "Accounting"],
    shortBio:
      "Former business consultant turned educator. Real-world experience in economics and business management with practical case studies.",
    sessionDuration: "1-2 hours",
    preferredLanguage: ["English", "Sinhala"],
    teachingExperience: "5+ years",
    preferredStudentLevels: ["Grade 11", "Advanced Level"],
    professionalRole: "Business Consultant & Educator",
    linkedInProfile: "https://linkedin.com/in/kumar-silva",
    rating: 4.7,
    totalSessions: 145,
  },
  {
    id: "8",
    fullName: "Nisha Fernando",
    initials: "NF",
    location: "Colombo",
    subjects: ["Psychology", "Sociology", "Philosophy"],
    shortBio:
      "Clinical psychologist with teaching experience. Specialized in cognitive psychology and social sciences for advanced level students.",
    sessionDuration: "1 hour",
    preferredLanguage: ["English", "Sinhala"],
    teachingExperience: "3-5 years",
    preferredStudentLevels: ["Advanced Level"],
    professionalRole: "Clinical Psychologist",
    linkedInProfile: "https://linkedin.com/in/nisha-fernando",
    rating: 4.6,
    totalSessions: 78,
  },
  {
    id: "9",
    fullName: "Rajith Bandara",
    initials: "RB",
    location: "Kurunegala",
    subjects: ["Geography", "History", "Political Science"],
    shortBio:
      "Geography expert with extensive field research experience. Specialized in physical geography, climate studies, and political geography.",
    sessionDuration: "1 hour",
    preferredLanguage: ["Sinhala", "English"],
    teachingExperience: "1-3 years",
    preferredStudentLevels: ["Grade 10", "Grade 11", "Advanced Level"],
    professionalRole: "Geography Research Assistant",
    linkedInProfile: "https://linkedin.com/in/rajith-bandara",
    rating: 4.4,
    totalSessions: 56,
  },
  {
    id: "10",
    fullName: "Samantha Jayasuriya",
    initials: "SJ",
    location: "Colombo",
    subjects: ["Computer Science", "Programming", "Web Development"],
    shortBio:
      "Software engineer and coding instructor. Expert in Python, JavaScript, and web development. Passionate about teaching programming to beginners.",
    sessionDuration: "1-2 hours",
    preferredLanguage: ["English"],
    teachingExperience: "3-5 years",
    preferredStudentLevels: [
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Advanced Level",
    ],
    professionalRole: "Senior Software Engineer",
    linkedInProfile: "https://linkedin.com/in/samantha-jayasuriya",
    githubOrPortfolio: "https://github.com/samanthaj",
    rating: 4.9,
    totalSessions: 201,
  },
  {
    id: "11",
    fullName: "Tharindu Weerasinghe",
    initials: "TW",
    location: "Galle",
    subjects: ["Sinhala Literature", "Buddhism", "Cultural Studies"],
    shortBio:
      "Sinhala literature expert and cultural studies teacher. Specialized in classical Sinhala poetry and Buddhist philosophy.",
    sessionDuration: "45 mins - 1 hour",
    preferredLanguage: ["Sinhala"],
    teachingExperience: "5+ years",
    preferredStudentLevels: ["Grade 10", "Grade 11", "Advanced Level"],
    professionalRole: "Sinhala Literature Lecturer",
    linkedInProfile: "https://linkedin.com/in/tharindu-weerasinghe",
    rating: 4.5,
    totalSessions: 92,
  },
  {
    id: "12",
    fullName: "Aisha Khan",
    initials: "AK",
    location: "Colombo",
    subjects: ["Physics", "Mathematics", "Engineering"],
    shortBio:
      "Mechanical engineer with teaching experience. Expert in applied physics and mathematics for engineering students.",
    sessionDuration: "1-2 hours",
    preferredLanguage: ["English", "Tamil"],
    teachingExperience: "3-5 years",
    preferredStudentLevels: ["Grade 11", "Advanced Level"],
    professionalRole: "Mechanical Engineer",
    linkedInProfile: "https://linkedin.com/in/aisha-khan",
    githubOrPortfolio: "https://github.com/aishakhan",
    rating: 4.8,
    totalSessions: 167,
  },
];

// Session duration options for filtering
export const sessionDurationOptions = [
  "30 mins - 1 hour",
  "1 hour",
  "1-2 hours",
  "2+ hours",
];

// Subject options for filtering
export const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Economics",
  "Business Studies",
  "Art",
  "Commerce",
  "Science",
  "Literature",
  "Programming",
];

// Language options for filtering
export const languageOptions = ["English", "Sinhala", "Tamil", "Other"];

// Student level options for filtering
export const studentLevelOptions = [
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Ordinary Level",
  "Advanced Level",
];
