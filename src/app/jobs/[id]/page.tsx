'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Building2,
  ArrowLeft,
  Send,
  CheckCircle,
  Upload,
} from 'lucide-react';
import SkillTag from '@/components/SkillTag';
import { MOCK_JOBS } from '@/lib/mock-data';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const job = MOCK_JOBS.find((j) => j.id === jobId);

  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', cvText: '' });

  if (!job) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Job not found</h2>
        <button onClick={() => router.push('/jobs')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Jobs
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to /api/applications
    setSubmitted(true);
    setApplying(false);
  };

  const deadlineDate = new Date(job.deadline).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const categoryLabel =
    job.category === 'nss'
      ? 'NSS Placement'
      : job.category === 'entry-level'
      ? 'Entry-Level'
      : 'Internship';

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/jobs')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
        }}
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </motion.button>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '2rem' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{job.title}</h1>
            <span className={`badge badge-${job.category}`}>{categoryLabel}</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginTop: '0.75rem',
              color: 'var(--color-text-secondary)',
              fontSize: '0.9rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={16} />
              {job.company?.company_name || 'Company'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} />
              {job.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} />
              Deadline: {deadlineDate}
            </span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            About this role
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            {job.description}
          </p>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Required Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {job.skills.map((skill) => (
              <SkillTag key={skill} skill={skill} size="md" />
            ))}
          </div>
        </div>

        {/* Apply */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <CheckCircle size={48} color="#10b981" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Application Submitted!
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Your application has been sent. Good luck!
            </p>
          </motion.div>
        ) : applying ? (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.5rem',
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Apply Now</h3>

            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">CV / Resume</label>
              <div
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.85rem' }}>
                  Drag & drop a file, or click to upload
                </p>
                <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                Or paste your CV text below:
              </p>
              <textarea
                className="input-field"
                rows={6}
                placeholder="Paste your CV text here..."
                value={form.cvText}
                onChange={(e) => setForm({ ...form, cvText: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn-primary" disabled={!form.name}>
                <Send size={16} />
                Submit Application
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setApplying(false)}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        ) : (
          <button onClick={() => setApplying(true)} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
            <Send size={18} />
            Apply for this Position
          </button>
        )}
      </motion.div>
    </div>
  );
}
