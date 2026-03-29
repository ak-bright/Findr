'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Upload, MapPin, Zap } from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mock-data';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const job = MOCK_JOBS.find((j) => j.id === jobId);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', portfolio: '', cvFile: null as File | null });
  const [dragOver, setDragOver] = useState(false);

  if (!job) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Job not found</h2>
        <button onClick={() => router.push('/jobs')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Jobs
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setForm({ ...form, cvFile: file });
  };

  const typeTag =
    job.category === 'nss' ? 'NSS PLACEMENT' :
    job.category === 'entry-level' ? 'ENTRY LEVEL' : 'INTERNSHIP';

  const requirements = [
    { icon: '🎓', title: 'Education', desc: 'Final year or Master\'s student in a relevant field.' },
    { icon: '🛠', title: 'Tooling', desc: `Proficiency in ${job.skills.slice(0, 2).join(', ')}, and related tools.` },
  ];

  const whatYouDo = [
    `Collaborate directly with senior leads on core ${job.company?.company_name} projects.`,
    'Participate in team sessions with key stakeholders to identify improvements.',
    `Apply your skills in ${job.skills[0]} to solve real-world problems.`,
  ];

  return (
    <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        {/* Back link */}
        <Link
          href="/jobs"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem' }}
        >
          <ArrowLeft size={16} /> Back to Job Discovery
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }} className="job-detail-grid">
          {/* Left column */}
          <div>
            {/* Job Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                  background: '#e8f0ff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0
                }}>🏢</div>
                <div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-manrope)', marginBottom: '0.25rem' }}>{job.title}</h1>
                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem' }}>
                    {job.company?.company_name} • {job.company?.full_name}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['FULL-TIME', job.location.toUpperCase(), typeTag].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
                    border: '1px solid #e5e7eb', fontSize: '0.75rem', fontWeight: 700,
                    color: 'var(--color-on-surface-variant)', background: '#f9fafb'
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* The Opportunity */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-manrope)' }}>The Opportunity</h2>
              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.8, fontSize: '0.95rem' }}>{job.description}</p>
            </motion.div>

            {/* What You'll Do */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-manrope)' }}>What You&apos;ll Do</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {whatYouDo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-manrope)' }}>Requirements</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {requirements.map((req) => (
                  <div key={req.title} style={{ background: '#f9fafb', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{req.icon}</div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{req.title}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>{req.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div style={{ position: 'sticky', top: '80px' }}>
            {/* Apply form */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle size={48} color="#0d7a45" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-manrope)' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>Your application has been received. Good luck!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem', fontFamily: 'var(--font-manrope)' }}>Apply for this role</h3>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.4rem', display: 'block' }}>Full Name</label>
                    <input
                      type="text" placeholder="Alex Rivera" required
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                    <input
                      type="email" placeholder="alex@example.com" required
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.4rem', display: 'block' }}>Portfolio Link <span style={{ color: '#9ca3af', fontWeight: 500 }}>(Optional)</span></label>
                    <input
                      type="url" placeholder="https://portfolio.design"
                      value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '0.4rem', display: 'block' }}>Upload CV / Resume</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      style={{
                        border: `2px dashed ${dragOver ? 'var(--color-primary)' : '#d1d5db'}`,
                        borderRadius: 'var(--radius-md)', padding: '1.5rem',
                        textAlign: 'center', cursor: 'pointer',
                        background: dragOver ? 'var(--color-primary-fixed)' : '#f9fafb',
                        transition: 'all 0.15s',
                      }}
                      onClick={() => document.getElementById('cv-upload')?.click()}
                    >
                      <Upload size={22} color={dragOver ? 'var(--color-primary)' : '#9ca3af'} style={{ marginBottom: '0.5rem' }} />
                      {form.cvFile ? (
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600 }}>{form.cvFile.name}</p>
                      ) : (
                        <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                          Drop your PDF here or <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>browse</span>
                          <br /><span style={{ fontSize: '0.75rem' }}>Max file size 5MB</span>
                        </p>
                      )}
                      <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && setForm({ ...form, cvFile: e.target.files[0] })} />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', gap: '0.5rem' }}>
                    Submit Application →
                  </button>
                  <p style={{ fontSize: '0.72rem', color: '#9ca3af', textAlign: 'center', lineHeight: 1.5 }}>
                    By clicking submit, you agree to our Terms of Service and Privacy Policy regarding applicant data handling.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Company Insight */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} style={{ background: 'linear-gradient(135deg, #e8f0ff 0%, #ede9fe 100%)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <Zap size={14} color="var(--color-primary)" />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Company Insight</span>
              </div>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Why {job.company?.company_name}?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                {job.company?.company_name} has been ranked among the top employers in Ghana. Our interns have a 92% conversion rate to full-time roles.
              </p>
            </motion.div>

            {/* Map placeholder */}
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ background: '#e5e7eb', borderRadius: 'var(--radius-xl)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', color: '#9ca3af' }}>
                <MapPin size={24} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{job.location} HQ</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#fff', padding: '2rem', marginTop: '3rem', borderTop: '1px solid #eceef0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Findr</p>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', fontStyle: 'italic' }}>Elevating the career discovery experience for the next generation of talent.</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Help Center', 'Privacy Policy', 'Terms of Service'].map((link) => (
            <a key={link} href="#" style={{ fontSize: '0.85rem', color: '#9ca3af', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        @media (max-width: 768px) {
          .job-detail-grid { grid-template-columns: 1fr !important; }
          div[style*="maxWidth: '1100px'"] { padding: 1.5rem 1rem !important; }
          footer { padding: 1.5rem 1rem !important; margin-top: 2rem !important; }
        }
        @media (max-width: 640px) {
          div[style*="maxWidth: '1100px'"] { padding: 1rem 0.75rem !important; }
          footer { padding: 1rem 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
