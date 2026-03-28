import { NextRequest, NextResponse } from 'next/server';
import { MOCK_JOBS } from '@/lib/mock-data';

// GET /api/jobs — List all jobs with optional filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const category = searchParams.get('category');
  const skills = searchParams.get('skills'); // comma-separated
  const search = searchParams.get('search');

  let jobs = [...MOCK_JOBS];

  if (location) {
    jobs = jobs.filter((j) => j.location === location);
  }

  if (category) {
    jobs = jobs.filter((j) => j.category === category);
  }

  if (skills) {
    const skillList = skills.split(',').map((s) => s.trim().toLowerCase());
    jobs = jobs.filter((j) =>
      j.skills.some((js) => skillList.includes(js.toLowerCase()))
    );
  }

  if (search) {
    const q = search.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ jobs, total: jobs.length });
}

// POST /api/jobs — Create a new job (company only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, skills, category, deadline } = body;

    if (!title || !description || !location || !category || !deadline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production: insert into Supabase
    const newJob = {
      id: `job-${Date.now()}`,
      company_id: 'company-1', // from auth session
      title,
      description,
      location,
      skills: skills || [],
      category,
      deadline,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ job: newJob }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
