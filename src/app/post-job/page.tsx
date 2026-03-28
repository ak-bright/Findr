'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlusCircle, X, Calendar } from 'lucide-react';
import SkillTag from '@/components/SkillTag';
import { SKILLS_LIST, LOCATIONS, JOB_CATEGORIES } from '@/lib/types';

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    deadline: '',
    skills: [] as string[],
  });

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm({ ...form, skills: [...form.skills, trimmed] });
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="page-container" style={{ maxWidth: '600px' }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <PlusCircle size={40} color="#10b981" />
          </motion.div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Job Posted Successfully!
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Your job listing &ldquo;{form.title}&rdquo; is now live and visible to candidates.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => router.push('/jobs')} className="btn-primary">
              View Jobs
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ title: '', description: '', location: '', category: '', deadline: '', skills: [] });
              }}
              className="btn-secondary"
            >
              Post Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Filter suggestions based on input
  const suggestions = skillInput
    ? SKILLS_LIST.filter(
        (s) =>
          s.toLowerCase().includes(skillInput.toLowerCase()) &&
          !form.skills.includes(s)
      ).slice(0, 6)
    : [];

  return (
    <div className="page-container" style={{ maxWidth: '700px' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Post a <span className="gradient-text">Job</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Find the best candidates for your position.
        </p>
      </motion.div>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ padding: '2rem' }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div>
            <label className="label">Job Title *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Frontend Developer Intern"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Description *</label>
            <textarea
              className="input-field"
              rows={5}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="label">Location *</label>
              <select
                className="input-field"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              >
                <option value="">Select location</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Category *</label>
              <select
                className="input-field"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select type</option>
                {JOB_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              <Calendar size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Application Deadline *
            </label>
            <input
              type="date"
              className="input-field"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Required Skills</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Type a skill and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
              />
              {suggestions.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: '0.25rem',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'none')
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {form.skills.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginTop: '0.75rem',
                }}
              >
                {form.skills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    selected
                    removable
                    onClick={() => removeSkill(skill)}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ padding: '0.85rem', marginTop: '0.75rem' }}
          >
            {loading ? (
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
            ) : (
              <>
                <PlusCircle size={18} />
                Post Job
              </>
            )}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
