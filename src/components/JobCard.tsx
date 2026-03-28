'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building2, ArrowRight } from 'lucide-react';
import SkillTag from './SkillTag';
import { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
  index?: number;
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
  const categoryClass = `badge badge-${job.category}`;
  const deadlineDate = new Date(job.deadline).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const categoryLabel =
    job.category === 'nss'
      ? 'NSS'
      : job.category === 'entry-level'
      ? 'Entry-Level'
      : 'Internship';

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.35rem' }}>
            {job.title}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-text-secondary)',
              fontSize: '0.85rem',
            }}
          >
            <Building2 size={14} />
            {job.company?.company_name || 'Company'}
          </div>
        </div>
        <span className={categoryClass}>{categoryLabel}</span>
      </div>

      {/* Description */}
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {job.description}
      </p>

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {job.skills.slice(0, 4).map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
        {job.skills.length > 4 && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              padding: '0.2rem 0.5rem',
              alignSelf: 'center',
            }}
          >
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={13} />
            {job.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} />
            {deadlineDate}
          </span>
        </div>
        <Link
          href={`/jobs/${job.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--color-primary-light)',
            fontSize: '0.85rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
          }}
        >
          View
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
