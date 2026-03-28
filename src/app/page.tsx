'use client';

import Link from 'next/link';
import { motion, type Easing } from 'framer-motion';
import { Briefcase, FileText, Sparkles, ArrowRight, Zap, Target, Shield } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as Easing },
  }),
};

const features = [
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Get personalized job recommendations based on your skills and preferences.',
    color: '#6366f1',
  },
  {
    icon: FileText,
    title: 'AI CV Review',
    description: 'Get instant feedback on your CV with actionable suggestions to improve.',
    color: '#10b981',
  },
  {
    icon: Zap,
    title: 'One-Click Apply',
    description: 'Apply to internships, NSS placements, and entry-level jobs effortlessly.',
    color: '#f59e0b',
  },
];

const stats = [
  { value: '500+', label: 'Job Opportunities' },
  { value: '200+', label: 'Companies' },
  { value: '10K+', label: 'Students Matched' },
];

export default function HomePage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--gradient-hero)',
        }}
      >
        {/* Background orbs */}
        <div
          className="bg-orb"
          style={{
            width: 400,
            height: 400,
            background: '#6366f1',
            top: '-10%',
            right: '-5%',
          }}
        />
        <div
          className="bg-orb"
          style={{
            width: 300,
            height: 300,
            background: '#8b5cf6',
            bottom: '10%',
            left: '-5%',
          }}
        />

        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: 'var(--color-primary-light)',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={16} />
            Your career journey starts here
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            Find Your Next{' '}
            <span className="gradient-text">Opportunity</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Connect with internships, NSS placements, and entry-level jobs.
            Get AI-powered CV feedback and smart job recommendations tailored just for you.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/jobs" className="btn-primary" style={{ textDecoration: 'none', padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <Briefcase size={18} />
              Browse Jobs
              <ArrowRight size={18} />
            </Link>
            <Link href="/signup" className="btn-secondary" style={{ textDecoration: 'none', padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <Shield size={18} />
              Create Account
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginTop: '4rem',
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--color-bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Everything You Need to{' '}
              <span className="gradient-text">Land Your Dream Role</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Tools designed specifically for students and recent graduates entering the workforce.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  style={{ padding: '2rem' }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-md)',
                      background: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={24} color={feature.color} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: '5rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          className="bg-orb"
          style={{
            width: 300,
            height: 300,
            background: '#a855f7',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Get <span className="gradient-text">Started?</span>
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
              fontSize: '1.05rem',
            }}
          >
            Join thousands of students who have found their perfect opportunity through Findr.
          </p>
          <Link
            href="/signup"
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}
          >
            Create Your Account
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
