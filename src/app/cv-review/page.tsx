'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Sparkles, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { mockCVReview } from '@/lib/mock-cv-review';
import { CVReviewResult } from '@/lib/types';

export default function CVReviewPage() {
  const [cvText, setCvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVReviewResult | null>(null);

  const handleReview = async () => {
    if (!cvText.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1500));

    const review = mockCVReview(cvText);
    setResult(review);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 45;

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          AI <span className="gradient-text">CV Review</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Get instant feedback on your CV with actionable suggestions to improve.
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="cv-layout"
      >
        {/* Input Section */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '2rem' }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} />
            Your CV
          </h2>

          {/* File upload area */}
          <div
            style={{
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <Upload size={28} style={{ marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.9rem' }}>Upload your CV (PDF, DOC)</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>or paste text below</p>
          </div>

          <textarea
            className="input-field"
            rows={12}
            placeholder="Paste your CV text here...&#10;&#10;Example:&#10;John Doe&#10;Email: john@example.com | LinkedIn: linkedin.com/in/johndoe&#10;&#10;EDUCATION&#10;BSc Computer Science — University of Ghana (2024)&#10;&#10;EXPERIENCE&#10;Frontend Developer Intern — TechCorp (Jun–Aug 2023)&#10;- Built responsive web applications using React&#10;- Improved page load time by 30%&#10;&#10;SKILLS&#10;JavaScript, React, Python, SQL, Git"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '0.85rem' }}
          />

          <button
            onClick={handleReview}
            className="btn-primary"
            disabled={loading || !cvText.trim()}
            style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
          >
            {loading ? (
              <>
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
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Review My CV
              </>
            )}
          </button>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Score Circle */}
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                  CV Score
                </h3>
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke={getScoreColor(result.score)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{
                        strokeDashoffset:
                          circumference - (result.score / 100) * circumference,
                      }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: getScoreColor(result.score),
                      }}
                    >
                      {result.score}
                    </motion.span>
                  </div>
                </div>
                <p
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {result.score >= 75
                    ? 'Great CV! A few tweaks could make it perfect.'
                    : result.score >= 50
                    ? 'Good start. Follow the suggestions below to improve.'
                    : 'Needs improvement. See suggestions below.'}
                </p>
              </div>

              {/* Strengths */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#34d399',
                  }}
                >
                  <CheckCircle size={18} />
                  Strengths
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.strengths.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(16, 185, 129, 0.05)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: '3px solid #34d399',
                      }}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#f87171',
                  }}
                >
                  <XCircle size={18} />
                  Areas for Improvement
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.weaknesses.map((w, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + i * 0.1 }}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(239, 68, 68, 0.05)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: '3px solid #f87171',
                      }}
                    >
                      {w}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#fbbf24',
                  }}
                >
                  <Lightbulb size={18} />
                  Suggestions
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {result.suggestions.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(245, 158, 11, 0.05)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: '3px solid #fbbf24',
                      }}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .cv-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
