'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2 } from 'lucide-react';
import UserDashboard from '@/components/UserDashboard';
import CompanyDashboard from '@/components/CompanyDashboard';

export default function DashboardPage() {
  // In production, detect role from Supabase profile
  const [viewRole, setViewRole] = useState<'user' | 'company'>('user');

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            {viewRole === 'user'
              ? 'Track your applications and discover recommended jobs.'
              : 'Manage your job postings and review applicants.'}
          </p>
        </div>

        {/* Role switcher (demo purposes) */}
        <div
          style={{
            display: 'flex',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => setViewRole('user')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background:
                viewRole === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color:
                viewRole === 'user' ? '#a5b4fc' : 'var(--color-text-muted)',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.2s',
            }}
          >
            <User size={14} />
            User View
          </button>
          <button
            onClick={() => setViewRole('company')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background:
                viewRole === 'company' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color:
                viewRole === 'company' ? '#a5b4fc' : 'var(--color-text-muted)',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 0.2s',
            }}
          >
            <Building2 size={14} />
            Company View
          </button>
        </div>
      </motion.div>

      {viewRole === 'user' ? <UserDashboard /> : <CompanyDashboard />}
    </div>
  );
}
