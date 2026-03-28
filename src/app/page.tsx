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
    color: 'var(--color-primary)',
  },
  {
    icon: FileText,
    title: 'AI CV Review',
    description: 'Get instant feedback on your CV with actionable suggestions to improve.',
    color: '#0344ec',
  },
  {
    icon: Zap,
    title: 'One-Click Apply',
    description: 'Apply to internships, NSS placements, and entry-level jobs effortlessly.',
    color: '#0032b5',
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
          background: 'var(--color-surface)',
        }}
      >
        {/* Background ambient orbs */}
        <div
          className="bg-ambient"
          style={{
            width: 400,
            height: 400,
            background: 'var(--color-primary)',
            top: '-10%',
            right: '-5%',
          }}
        />
        <div
          className="bg-ambient"
          style={{
            width: 300,
            height: 300,
            background: 'var(--color-secondary-container)',
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
              gap: '0.6rem',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-fixed)',
              color: 'var(--color-primary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '2rem',
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
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
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
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '650px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Connect with internships, NSS placements, and entry-level jobs.
            Get AI-powered CV feedback and smart job recommendations curated for you.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/jobs" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1rem' }}>
              <Briefcase size={18} />
              Browse Jobs
              <ArrowRight size={18} />
            </Link>
            <Link href="/signup" className="btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1rem' }}>
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
              gap: '4rem',
              marginTop: '5rem',
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.03em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--color-surface-container)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Everything You Need to{' '}
              <span className="gradient-text">Land Your Dream Role</span>
            </h2>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>
              Tools explicitly designed for students and recent graduates entering the modern workforce.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="surface-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  style={{ padding: '2.5rem', boxShadow: '0px 10px 20px rgba(25, 28, 30, 0.04)' }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--color-primary-fixed)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Icon size={28} color={feature.color} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'var(--font-manrope)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem', lineHeight: 1.6 }}>
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
          padding: '6rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          background: 'var(--color-surface)',
        }}
      >
        <div
          className="bg-ambient"
          style={{
            width: 350,
            height: 350,
            background: 'var(--color-secondary-container)',
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
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Ready to Get <span className="gradient-text">Started?</span>
          </h2>
          <p
            style={{
              color: 'var(--color-on-surface-variant)',
              marginBottom: '2.5rem',
              maxWidth: '550px',
              margin: '0 auto 2.5rem',
              fontSize: '1.15rem',
            }}
          >
            Join thousands of students who have found their perfect opportunity through Findr.
          </p>
          <Link
            href="/signup"
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-xl)' }}
          >
            Create Your Account
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
