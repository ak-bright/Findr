-- ============================================
-- Findr MVP — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. Profiles Table
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'company')),
  company_name TEXT,
  skills TEXT[] DEFAULT '{}',
  preferred_location TEXT,
  preferred_job_type TEXT CHECK (preferred_job_type IN ('internship', 'nss', 'entry-level')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. Jobs Table
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('internship', 'nss', 'entry-level')),
  deadline DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for jobs
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Companies can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'company'
    )
  );

CREATE POLICY "Companies can update own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (company_id = auth.uid());

CREATE POLICY "Companies can delete own jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (company_id = auth.uid());

-- ============================================
-- 3. Applications Table
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  cv_url TEXT,
  cv_text TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- RLS for applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.company_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Companies can update application status"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.company_id = auth.uid()
    )
  );

-- ============================================
-- 4. Storage Bucket for CVs
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT DO NOTHING;

CREATE POLICY "Authenticated users can upload CVs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Users can view own CVs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);
