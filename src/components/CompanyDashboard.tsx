'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  MapPin,
  Calendar,
  User,
  FileText,
} from 'lucide-react';
import SkillTag from './SkillTag';
import { MOCK_JOBS, MOCK_APPLICATIONS } from '@/lib/mock-data';

export default function CompanyDashboard() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Filter jobs for "this company" (using company-1 as the mock logged-in company)
  const companyJobs = MOCK_JOBS.filter((j) => j.company_id === 'company-1');

  // Get applicants for a specific job
  const getApplicants = (jobId: string) =>
    MOCK_APPLICATIONS.filter((a) => a.job_id === jobId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {[
          {
            label: 'Active Postings',
            value: companyJobs.length,
            icon: Briefcase,
            color: '#6366f1',
          },
          {
            label: 'Total Applicants',
            value: MOCK_APPLICATIONS.length,
            icon: Users,
            color: '#10b981',
          },
          {
            label: 'Pending Review',
            value: MOCK_APPLICATIONS.filter((a) => a.status === 'pending').length,
            icon: FileText,
            color: '#f59e0b',
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 700, color: card.color }}>
                    {card.value}
                  </p>
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: `${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={22} color={card.color} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Job Postings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Briefcase size={20} />
            Your Job Postings
          </h2>
          <Link
            href="/post-job"
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} />
            Post New
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {companyJobs.map((job, i) => {
            const applicants = getApplicants(job.id);
            const isExpanded = expandedJobId === job.id;

            return (
              <motion.div
                key={job.id}
                className="glass-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ overflow: 'hidden' }}
              >
                {/* Job Header */}
                <button
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--color-text)',
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      {job.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} /> {new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={12} /> {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`badge badge-${job.category}`}>
                      {job.category === 'nss' ? 'NSS' : job.category === 'entry-level' ? 'Entry' : 'Intern'}
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Applicants Dropdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 1.5rem 1.5rem',
                          borderTop: '1px solid var(--color-border)',
                          paddingTop: '1rem',
                        }}
                      >
                        {/* Skills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                          {job.skills.map((s) => (
                            <SkillTag key={s} skill={s} />
                          ))}
                        </div>

                        {applicants.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                              Applicants
                            </h4>
                            {applicants.map((app) => (
                              <div
                                key={app.id}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.75rem 1rem',
                                  background: 'var(--color-bg-secondary)',
                                  borderRadius: 'var(--radius-md)',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: '50%',
                                      background: 'var(--gradient-primary)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#fff',
                                      fontSize: '0.8rem',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {app.applicant_name.charAt(0)}
                                  </div>
                                  <div>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                      {app.applicant_name}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                      Applied {new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                    </p>
                                  </div>
                                </div>
                                <span className={`badge status-${app.status}`}>
                                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                            No applicants yet.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
