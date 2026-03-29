import { NextRequest, NextResponse } from 'next/server';
import { mockCVReview } from '@/lib/mock-cv-review';

export const dynamic = 'force-dynamic';

// POST /api/cv-review — Analyze CV and return feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cv_text } = body;

    if (!cv_text || cv_text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide CV text with at least 20 characters.' },
        { status: 400 }
      );
    }

    // Using mock CV review (in production, this would call Claude API)
    const result = mockCVReview(cv_text);

    return NextResponse.json({ review: result });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process CV review.' },
      { status: 500 }
    );
  }
}
