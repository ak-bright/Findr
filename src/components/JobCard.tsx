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
      className="surface-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 10px 20px rgba(25, 28, 30, 0.04)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem', fontFamily: 'var(--font-manrope)', color: 'var(--color-on-background)' }}>
            {job.title}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-on-surface-variant)',
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
          color: 'var(--color-on-surface-variant)',
          fontSize: '0.95rem',
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
              color: 'var(--color-on-surface-variant)',
              padding: '0.2rem 0.5rem',
              alignSelf: 'center',
              opacity: 0.8,
            }}
          >
            +{job.skills.length - 4} more
          </span>
        )}
      </div>
      </div>

      {/* Footer using background shift instead of border */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'var(--color-surface-container-low)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={14} opacity={0.7} />
            {job.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} opacity={0.7} />
            {deadlineDate}
          </span>
        </div>
        <Link
          href={`/jobs/${job.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
          }}
        >
          View
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
