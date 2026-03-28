import { CVReviewResult } from './types';

/**
 * Mock CV Review — simulates AI-powered CV analysis.
 * Returns a structured review based on simple text analysis.
 */
export function mockCVReview(cvText: string): CVReviewResult {
  const text = cvText.toLowerCase();
  const wordCount = cvText.split(/\s+/).length;

  let score = 50; // Base score
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // Check for key sections
  const sections = {
    education: /education|university|degree|bachelor|master|diploma/i,
    experience: /experience|work|internship|worked|developed/i,
    skills: /skills|proficient|competent|expertise|technologies/i,
    projects: /projects|built|created|developed|implemented/i,
    contact: /email|phone|linkedin|github|portfolio/i,
    summary: /summary|objective|about me|profile/i,
  };

  if (sections.education.test(text)) {
    score += 8;
    strengths.push('Education section is present and documented');
  } else {
    weaknesses.push('Missing education section');
    suggestions.push('Add your educational background including institution, degree, and graduation date');
  }

  if (sections.experience.test(text)) {
    score += 10;
    strengths.push('Work experience or internship experience is highlighted');
  } else {
    weaknesses.push('No work experience section found');
    suggestions.push('Include any internships, part-time jobs, or volunteer experience');
  }

  if (sections.skills.test(text)) {
    score += 8;
    strengths.push('Technical skills are listed');
  } else {
    weaknesses.push('Skills section is missing');
    suggestions.push('Add a dedicated skills section listing your technical and soft skills');
  }

  if (sections.projects.test(text)) {
    score += 10;
    strengths.push('Project work is documented — great for entry-level candidates');
  } else {
    suggestions.push('Include personal or academic projects to showcase practical skills');
  }

  if (sections.contact.test(text)) {
    score += 5;
    strengths.push('Contact information is provided');
  } else {
    weaknesses.push('Contact information is incomplete');
    suggestions.push('Include email, phone number, and LinkedIn profile link');
  }

  if (sections.summary.test(text)) {
    score += 5;
    strengths.push('Professional summary provides a strong introduction');
  } else {
    suggestions.push('Add a brief professional summary or career objective at the top');
  }

  // Check length
  if (wordCount > 200) {
    score += 4;
    strengths.push('CV has sufficient detail and content');
  } else if (wordCount < 50) {
    score -= 10;
    weaknesses.push('CV is too short and lacks detail');
    suggestions.push('Expand each section with more specific details and achievements');
  }

  // Check for action verbs
  const actionVerbs = /led|managed|developed|created|designed|implemented|achieved|improved|increased|organized/i;
  if (actionVerbs.test(text)) {
    score += 5;
    strengths.push('Good use of action verbs to describe achievements');
  } else {
    suggestions.push('Use strong action verbs like "developed", "led", "achieved" to describe your experiences');
  }

  // Check for metrics/numbers
  const hasMetrics = /\d+%|\d+ (users|clients|projects|team)/i.test(text);
  if (hasMetrics) {
    score += 5;
    strengths.push('Quantifiable achievements are included');
  } else {
    suggestions.push('Add measurable outcomes (e.g., "increased efficiency by 20%") where possible');
  }

  // Clamp score
  score = Math.min(100, Math.max(0, score));

  // Ensure at least one item in each array
  if (strengths.length === 0) {
    strengths.push('CV provides a basic overview of qualifications');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Consider adding more specific achievements');
  }
  if (suggestions.length === 0) {
    suggestions.push('Keep your CV updated as you gain more experience');
  }

  return { score, strengths, weaknesses, suggestions };
}
