import { NextRequest, NextResponse } from 'next/server';
import { MOCK_JOBS } from '@/lib/mock-data';

// GET /api/jobs/[id] — Get single job details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = MOCK_JOBS.find((j) => j.id === id);

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ job });
}

// DELETE /api/jobs/[id] — Delete job (owner only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = MOCK_JOBS.find((j) => j.id === id);

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // In production: verify ownership via Supabase auth, then delete
  return NextResponse.json({ message: 'Job deleted successfully' });
}
