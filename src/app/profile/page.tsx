'use client';

import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Mail, Edit2, Share2, ExternalLink, FileText, Download, Eye, Zap, Code2, Users2, Globe } from 'lucide-react';
import Link from 'next/link';

const SKILLS = ['Python', 'SQL', 'Web Dev', 'JavaScript', 'React', 'Git', 'Tailwind CSS', 'FastAPI'];

const PROJECTS = [
  {
    id: 1,
    title: 'UG Student Portal Redesign',
    desc: 'A UX/UI case study and frontend prototype aimed at simplifying student registration workflows.',
    tags: ['UI/UX', 'React'],
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 2,
    title: 'Inventory Management API',
    desc: 'High-performance REST API built with FastAPI and PostgreSQL for small retail businesses.',
    tags: ['Backend', 'FastAPI'],
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  },
];

const DIGITAL_PRESENCE = [
  { icon: Users2, label: 'LinkedIn', href: '#' },
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: Globe, label: 'Portfolio', href: '#' },
];

export default function ProfilePage() {
  return (
    <div style={{ background: '#f7f9fb', minHeight: 'calc(100vh - 64px)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }} className="profile-grid">

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative circle */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'var(--color-primary-fixed)', borderRadius: '50%', opacity: 0.5 }} />

              {/* Avatar */}
              <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #1a1a2e, #203a43)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', overflow: 'hidden', position: 'relative' }}>
                KM
              </div>

              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.15rem', fontFamily: 'var(--font-manrope)' }}>Kofi Mensah</h1>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>Computer Science Student</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  { icon: GraduationCap, text: 'University of Ghana' },
                  { icon: MapPin, text: 'Accra, Ghana' },
                  { icon: Mail, text: 'k.mensah@st.ug.edu.gh' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-on-surface-variant)' }}>
                    <Icon size={14} style={{ flexShrink: 0 }} />
                    {text}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', gap: '0.4rem' }}>
                  <Edit2 size={14} /> Edit Profile
                </button>
                <button style={{ width: '38px', height: '38px', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-on-surface-variant)', flexShrink: 0 }}>
                  <Share2 size={16} />
                </button>
              </div>
            </motion.div>

            {/* Digital Presence */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <h2 style={{ fontSize: '0.975rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-manrope)' }}>Digital Presence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {DIGITAL_PRESENCE.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                      border: '1px solid #f1f3f5', textDecoration: 'none',
                      color: 'var(--color-on-surface)', fontSize: '0.9rem',
                      transition: 'all 0.15s', background: '#fafafa',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Icon size={16} color="var(--color-primary)" />
                      {label}
                    </div>
                    <ExternalLink size={14} color="#9ca3af" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: '4px solid var(--color-primary)' }}
            >
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'var(--font-manrope)' }}>Professional Summary</h2>
              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                Final year Computer Science student at the University of Ghana with a passion for building scalable web applications. Focused on backend systems and data-driven solutions. Actively seeking National Service (NSS) opportunities in software engineering or data analysis starting September 2024.
              </p>
            </motion.div>

            {/* Skills + Documents row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Core Skills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-manrope)' }}>Core Skills</h2>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'flex' }}>
                    <Edit2 size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {SKILLS.map((skill) => (
                    <span key={skill} style={{
                      padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                      background: 'var(--color-primary-fixed)', color: 'var(--color-primary)',
                      fontSize: '0.8rem', fontWeight: 600
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Documents */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-manrope)' }}>Documents</h2>
                  <FileText size={16} color="var(--color-primary)" />
                </div>
                <div style={{ background: '#f9fafb', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>📄</div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>K_Mensah_CV_2024.pdf</p>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem' }}>Updated 2 days ago</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ flex: 1, padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-fixed)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                      <Eye size={13} /> Preview
                    </button>
                    <button style={{ flex: 1, padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', background: '#fff', color: 'var(--color-on-surface-variant)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                      <Download size={13} /> Download
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-manrope)' }}>Recent Projects</h2>
                <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View All <ExternalLink size={14} />
                </a>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1.25rem' }}>Academic & personal ventures</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {PROJECTS.map((p) => (
                  <div key={p.id} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid #f1f3f5' }}>
                    <div style={{ height: '120px', background: p.gradient }} />
                    <div style={{ padding: '1rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{p.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{p.desc}</p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {p.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', background: '#f1f3f5', color: '#6b7280' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Career Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', gap: '1rem', borderLeft: '4px solid var(--color-primary)' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-fixed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={18} color="var(--color-primary)" />
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.95rem', fontFamily: 'var(--font-manrope)' }}>Career Recommendation</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                  Based on your Python and SQL skills, you have a 92% match for{' '}
                  <Link href="/jobs" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Junior Data Engineer</Link>
                  {' '}roles at top financial institutions.{' '}
                  <Link href="/jobs" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Explore matching jobs</Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
