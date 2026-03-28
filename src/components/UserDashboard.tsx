'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Target, ArrowRight, ExternalLink } from 'lucide-react';
import SkillTag from './SkillTag';
import { MOCK_APPLICATIONS, MOCK_JOBS } from '@/lib/mock-data';
import { matchJobs } from '@/lib/matching';

export default function UserDashboard() {
  const userSkills = ['React', 'JavaScript', 'Python', 'SQL', 'Git'];
  const applications = MOCK_APPLICATIONS;

  const recommendedJobs = useMemo(
    () => matchJobs(userSkills, MOCK_JOBS, 5),
    []
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Your Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-manrope)'
          }}
        >
          <Briefcase size={22} color="var(--color-primary)" />
          Your Applications
        </h2>

        {applications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                className="surface-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  boxShadow: '0px 8px 16px rgba(25, 28, 30, 0.04)'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', fontFamily: 'var(--font-manrope)' }}>
                    {app.job?.title || 'Job Title'}
                  </h3>
                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                    {app.job?.company?.company_name} · {app.job?.location}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`badge status-${app.status}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <Link
                    href={`/jobs/${app.job_id}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="surface-card"
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>You haven&apos;t applied to any jobs yet.</p>
            <Link
              href="/jobs"
              className="btn-primary"
              style={{ textDecoration: 'none', marginTop: '1.25rem', display: 'inline-flex' }}
            >
              Browse Jobs <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </motion.div>

      {/* Recommended Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-manrope)'
          }}
        >
          <Target size={22} color="var(--color-primary)" />
          Recommended for You
        </h2>

        <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Based on your skills: <span style={{ fontWeight: 600 }}>{userSkills.join(', ')}</span>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recommendedJobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="surface-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                borderLeft: '4px solid var(--color-primary)',
                boxShadow: '0px 10px 20px rgba(25, 28, 30, 0.05)'
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-manrope)' }}>{job.title}</h3>
                  <span className={`badge badge-${job.category}`} style={{ fontSize: '0.7rem' }}>
                    {job.category === 'nss' ? 'NSS' : job.category === 'entry-level' ? 'Entry' : 'Intern'}
                  </span>
                </div>
                <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {job.company?.company_name} · {job.location}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {job.matched_skills.map((s) => (
                    <SkillTag key={s} skill={s} selected />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    className="gradient-text"
                    style={{ fontSize: '1.5rem', fontWeight: 800 }}
                  >
                    {job.match_score}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                    Match
                  </div>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn-primary"
                  style={{
                    textDecoration: 'none',
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  Apply
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
