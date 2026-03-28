import { NextRequest, NextResponse } from 'next/server';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

// GET /api/applications — List applications
export async function GET() {
  // In production: filter by user_id or company's job_ids from session
  return NextResponse.json({
    applications: MOCK_APPLICATIONS,
    total: MOCK_APPLICATIONS.length,
  });
}

// POST /api/applications — Submit an application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { job_id, applicant_name, cv_text } = body;

    if (!job_id || !applicant_name) {
      return NextResponse.json(
        { error: 'Missing required fields: job_id and applicant_name' },
        { status: 400 }
      );
    }

    // In production: insert into Supabase
    const newApplication = {
      id: `app-${Date.now()}`,
      job_id,
      user_id: 'user-1', // from auth session
      applicant_name,
      cv_url: null,
      cv_text: cv_text || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { application: newApplication },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
