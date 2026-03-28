// Findr — Core TypeScript Types

export type UserRole = 'user' | 'company';
export type JobCategory = 'internship' | 'nss' | 'entry-level';
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  company_name?: string | null;
  skills?: string[] | null;
  preferred_location?: string | null;
  preferred_job_type?: JobCategory | null;
  avatar_url?: string | null;
  created_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  location: string;
  skills: string[];
  category: JobCategory;
  deadline: string;
  created_at: string;
  // Joined fields
  company?: Profile;
}

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  applicant_name: string;
  cv_url?: string | null;
  cv_text?: string | null;
  status: ApplicationStatus;
  created_at: string;
  // Joined fields
  job?: Job;
  user?: Profile;
}

export interface CVReviewResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface MatchedJob extends Job {
  match_score: number;
  matched_skills: string[];
}

// Predefined skills list
export const SKILLS_LIST = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'SQL', 'PostgreSQL', 'MongoDB', 'Java', 'C++', 'C#', 'Go', 'Rust',
  'HTML', 'CSS', 'Tailwind CSS', 'Flutter', 'Dart', 'Swift',
  'Machine Learning', 'Data Analysis', 'Excel', 'Power BI', 'Tableau',
  'AWS', 'Azure', 'Docker', 'Git', 'Linux',
  'Communication', 'Leadership', 'Project Management', 'Problem Solving',
  'Graphic Design', 'Figma', 'Adobe Photoshop', 'UI/UX Design',
  'Marketing', 'SEO', 'Content Writing', 'Social Media',
  'Accounting', 'Finance', 'Research', 'Teaching',
] as const;

export const LOCATIONS = [
  'Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast',
  'Ho', 'Sunyani', 'Koforidua', 'Wa', 'Bolgatanga',
  'Remote', 'Hybrid',
] as const;

export const JOB_CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: 'internship', label: 'Internship' },
  { value: 'nss', label: 'NSS Placement' },
  { value: 'entry-level', label: 'Entry-Level' },
];
