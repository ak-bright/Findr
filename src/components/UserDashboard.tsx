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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Your Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Briefcase size={20} />
          Your Applications
        </h2>

        {applications.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                className="glass-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {app.job?.title || 'Job Title'}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    {app.job?.company?.company_name} · {app.job?.location}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge status-${app.status}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <Link
                    href={`/jobs/${app.job_id}`}
                    style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}
                  >
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
            }}
          >
            <p>You haven&apos;t applied to any jobs yet.</p>
            <Link
              href="/jobs"
              className="btn-primary"
              style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-flex' }}
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
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Target size={20} />
          Recommended for You
        </h2>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Based on your skills: {userSkills.join(', ')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {recommendedJobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{job.title}</h3>
                  <span className={`badge badge-${job.category}`} style={{ fontSize: '0.65rem' }}>
                    {job.category === 'nss' ? 'NSS' : job.category === 'entry-level' ? 'Entry' : 'Intern'}
                  </span>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {job.company?.company_name} · {job.location}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {job.matched_skills.map((s) => (
                    <SkillTag key={s} skill={s} selected />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    className="gradient-text"
                    style={{ fontSize: '1.25rem', fontWeight: 700 }}
                  >
                    {job.match_score}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Match
                  </div>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn-primary"
                  style={{
                    textDecoration: 'none',
                    padding: '0.4rem 1rem',
                    fontSize: '0.85rem',
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
