'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';
import SkillTag from '@/components/SkillTag';
import { SKILLS_LIST, LOCATIONS, JOB_CATEGORIES, UserRole } from '@/lib/types';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('user');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    skills: [] as string[],
    preferredLocation: '',
    preferredJobType: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise((r) => setTimeout(r, 1000));

      if (form.email && form.password.length >= 6 && form.name) {
        router.push('/dashboard');
      } else {
        setError('Please fill all required fields. Password must be at least 6 characters.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 140px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
      }}
    >
      <div
        className="bg-orb"
        style={{ width: 350, height: 350, background: '#8b5cf6', top: '5%', left: '5%' }}
      />
      <div
        className="bg-orb"
        style={{ width: 250, height: 250, background: '#6366f1', bottom: '10%', right: '10%' }}
      />

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Create <span className="gradient-text">Account</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Join Findr to find your next opportunity
          </p>
        </div>

        {/* Role Toggle */}
        <div
          style={{
            display: 'flex',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            marginBottom: '1.5rem',
          }}
        >
          {(['user', 'company'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: '0.65rem',
                border: 'none',
                background: role === r ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: role === r ? '#a5b4fc' : 'var(--color-text-muted)',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              {r === 'user' ? <User size={16} /> : <Building2 size={16} />}
              {r === 'user' ? 'Job Seeker' : 'Company'}
            </button>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSignup}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <label className="label">{role === 'company' ? 'Contact Name' : 'Full Name'} *</label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {role === 'company' && (
            <div>
              <label className="label">Company Name *</label>
              <div style={{ position: 'relative' }}>
                <Building2
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                  }}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="label">Email *</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div>
            <label className="label">Password *</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type={showPw ? 'text' : 'password'}
                className="input-field"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* User-specific onboarding fields */}
          {role === 'user' && (
            <>
              <div>
                <label className="label">Your Skills</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto', padding: '0.25rem 0' }}>
                  {SKILLS_LIST.slice(0, 20).map((skill) => (
                    <SkillTag
                      key={skill}
                      skill={skill}
                      selected={form.skills.includes(skill)}
                      onClick={() => toggleSkill(skill)}
                    />
                  ))}
                </div>
                {form.skills.length > 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {form.skills.length} selected
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="label">Preferred Location</label>
                  <select
                    className="input-field"
                    value={form.preferredLocation}
                    onChange={(e) => setForm({ ...form, preferredLocation: e.target.value })}
                  >
                    <option value="">Select</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Job Type</label>
                  <select
                    className="input-field"
                    value={form.preferredJobType}
                    onChange={(e) => setForm({ ...form, preferredJobType: e.target.value })}
                  >
                    <option value="">Select</option>
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ padding: '0.85rem', marginTop: '0.5rem' }}
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
                <UserPlus size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            style={{ color: 'var(--color-primary-light)', textDecoration: 'none', fontWeight: 500 }}
          >
            Sign In
          </Link>
        </p>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
