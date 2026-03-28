import { Job, MatchedJob } from './types';

/**
 * Smart Job Matching Algorithm
 * Matches users to jobs based on skill overlap.
 * Returns top N recommended jobs sorted by match score.
 */
export function matchJobs(
  userSkills: string[],
  jobs: Job[],
  topN: number = 5
): MatchedJob[] {
  if (!userSkills || userSkills.length === 0) return [];

  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase().trim());

  const scored: MatchedJob[] = jobs.map((job) => {
    const jobSkills = (job.skills || []).map((s) => s.toLowerCase().trim());
    const matched = normalizedUserSkills.filter((skill) =>
      jobSkills.includes(skill)
    );

    const totalUniqueSkills = new Set([...normalizedUserSkills, ...jobSkills]).size;
    const matchScore =
      totalUniqueSkills > 0
        ? Math.round((matched.length / totalUniqueSkills) * 100)
        : 0;

    return {
      ...job,
      match_score: matchScore,
      matched_skills: matched,
    };
  });

  return scored
    .filter((j) => j.match_score > 0)
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, topN);
}
