import { NextResponse } from 'next/server';
import { MOCK_JOBS } from '@/lib/mock-data';
import { matchJobs } from '@/lib/matching';

// GET /api/match — Get matched jobs for the current user
export async function GET() {
  // In production: fetch user's skills from Supabase profile
  const userSkills = ['React', 'JavaScript', 'Python', 'SQL', 'Git'];

  const matched = matchJobs(userSkills, MOCK_JOBS, 5);

  return NextResponse.json({
    matched_jobs: matched,
    user_skills: userSkills,
    total: matched.length,
  });
}
