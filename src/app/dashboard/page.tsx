'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bookmark,
  MessageSquare,
  Calendar,
  BarChart2,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: Bookmark, label: 'Saved Jobs', href: '/saved' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: Calendar, label: 'Interviews', href: '/interviews' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
];

const mockPostings = [
  { id: 1, title: 'Senior Product Designer', dept: 'Design', location: 'London, UK', status: 'live', applicants: 124, newApplicants: 12, engagement: 78 },
  { id: 2, title: 'Growth Marketing Lead', dept: 'Marketing', location: 'Remote', status: 'live', applicants: 86, newApplicants: 5, engagement: 54 },
  { id: 3, title: 'Full Stack Engineer', dept: 'Engineering', location: 'Berlin, DE', status: 'reviewing', applicants: 212, newApplicants: 0, engagement: 91 },
  { id: 4, title: 'Talent Operations Specialist', dept: 'People', location: 'New York, US', status: 'draft', applicants: 0, newApplicants: 0, engagement: 0 },
];

const chartData = [
  { day: 'MON', value: 35 },
  { day: 'TUE', value: 62 },
  { day: 'WED', value: 48 },
  { day: 'THU', value: 78 },
  { day: 'FRI', value: 71 },
  { day: 'TODAY', value: 95 },
];

const maxValue = Math.max(...chartData.map((d) => d.value));

type StatusType = 'live' | 'reviewing' | 'draft';

const statusConfig: Record<StatusType, { label: string; bg: string; color: string }> = {
  live: { label: 'LIVE', bg: '#e6f9f0', color: '#0d7a45' },
  reviewing: { label: 'REVIEWING', bg: '#fff3e0', color: '#e65c00' },
  draft: { label: 'DRAFT', bg: '#f1f3f5', color: '#6b7280' },
};

export default function DashboardPage() {
  const [filterTab, setFilterTab] = useState<'all' | 'drafts' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = mockPostings.filter((p) => {
    if (filterTab === 'drafts') return p.status === 'draft';
    if (filterTab === 'archived') return false;
    return p.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f9fb' }}>
      {/* ---- Sidebar ---- */}
      <aside style={{
        width: '220px',
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        borderRight: '1px solid #eceef0',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
      }}
      className="desktop-sidebar"
      >
        {/* User badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.95rem',
            flexShrink: 0,
          }}>A</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>The Atelier</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Premium Discovery</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {sidebarLinks.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                background: active ? 'var(--color-primary-fixed)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eceef0' }}>
          <Link href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
            <HelpCircle size={18} /> Help Center
          </Link>
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
            <LogOut size={18} /> Sign Out
          </Link>
        </div>

        {/* Post a Job CTA */}
        <Link
          href="/post-job"
          className="btn-primary"
          style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', marginTop: '1rem', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}
        >
          <Plus size={18} /> Post a Job
        </Link>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside style={{
            width: '280px',
            height: '100vh',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1rem',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1001,
          }}>
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <X size={24} />
            </button>

            {/* User badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.95rem',
                flexShrink: 0,
              }}>A</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>The Atelier</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Premium Discovery</div>
              </div>
            </div>

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              {sidebarLinks.map(({ icon: Icon, label, href, active }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.7rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                    background: active ? 'var(--color-primary-fixed)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Bottom actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eceef0' }}>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                <HelpCircle size={18} /> Help Center
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
                <LogOut size={18} /> Sign Out
              </Link>
            </div>

            {/* Post a Job CTA */}
            <Link
              href="/post-job"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', marginTop: '1rem', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}
            >
              <Plus size={18} /> Post a Job
            </Link>
          </aside>
        </div>
      )}

      {/* ---- Main content ---- */}
      <main style={{ flex: 1, padding: '2.5rem 2rem', overflowY: 'auto' }}>
        {/* Mobile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }} className="mobile-header">
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            className="mobile-menu-btn"
          >
            <Menu size={24} />
          </button>
        </div>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link href="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to Jobs
            </Link>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', fontFamily: 'var(--font-manrope)' }}>Recruiter Dashboard</h1>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>Manage your active listings and track candidate flow across the atelier.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['all', 'drafts', 'archived'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                style={{
                  padding: '0.45rem 1.1rem',
                  border: '1px solid',
                  borderColor: filterTab === tab ? 'var(--color-primary)' : '#d1d5db',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: filterTab === tab ? 'var(--color-primary)' : '#fff',
                  color: filterTab === tab ? '#fff' : 'var(--color-on-surface-variant)',
                  transition: 'all 0.15s',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('all', 'All Roles')}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}
          className="stats-grid"
        >
          {[
            { label: 'ACTIVE POSTINGS', value: '12', delta: '+2 this week', deltaColor: '#0d7a45' },
            { label: 'TOTAL APPLICANTS', value: '482', delta: '+48 new today', deltaColor: '#0d7a45' },
            { label: 'INTERVIEWS SCHEDULED', value: '18', delta: 'Next in 2 hours', deltaColor: 'var(--color-on-surface-variant)' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-on-surface-variant)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-manrope)', marginBottom: '0.25rem' }}>{stat.value}</p>
              <p style={{ fontSize: '0.8rem', color: stat.deltaColor, fontWeight: 600 }}>{stat.delta}</p>
            </div>
          ))}
          {/* Postings Health */}
          <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>POSTINGS HEALTH</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-manrope)', color: '#fff', marginBottom: '0.25rem' }}>94%</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Engagement is high</p>
          </div>
        </motion.div>

        {/* My Postings table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-manrope)' }}>My Postings</h2>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Filter positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', outline: 'none', width: '220px' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f3f5' }}>
                {['POSITION NAME', 'STATUS', 'APPLICANTS', 'ENGAGEMENT', 'ACTIONS'].map((col) => (
                  <th key={col} style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.07em' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cfg = statusConfig[p.status as StatusType];
                const barWidth = p.engagement;
                const barColor = p.status === 'reviewing' ? '#f59e0b' : 'var(--color-primary)';
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{p.title}</p>
                      <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{p.dept} • {p.location}</p>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{ background: cfg.bg, color: cfg.color, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>{cfg.label}</span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.applicants > 0 ? p.applicants : '—'}</span>
                      {p.newApplicants > 0 && (
                        <span style={{ marginLeft: '0.5rem', background: 'var(--color-primary-fixed)', color: 'var(--color-primary)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>+{p.newApplicants} new</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ height: '6px', background: '#f1f3f5', borderRadius: 'var(--radius-full)', width: '120px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${barWidth}%`, background: barColor, borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f3f5' }}>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Showing {filtered.length} of {mockPostings.length} postings</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-full)', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
                <ChevronLeft size={16} />
              </button>
              <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-full)', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom row: Chart + Tip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }} className="bottom-grid">
          {/* Application Velocity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <TrendingUp size={18} color="var(--color-primary)" />
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Application Velocity</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '160px' }}>
              {chartData.map((d) => (
                <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <div
                    style={{
                      width: '100%',
                      background: d.day === 'TODAY' ? 'var(--color-primary)' : `rgba(0, 50, 181, ${0.2 + (d.value / maxValue) * 0.4})`,
                      borderRadius: '6px 6px 0 0',
                      height: `${(d.value / maxValue) * 130}px`,
                      transition: 'height 0.5s ease',
                    }}
                  />
                  <span style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 600 }}>{d.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recruiter Tip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: '4px solid var(--color-primary)' }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>RECRUITER TIP</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1rem' }}>
              &ldquo;Positions with salary transparency receive 40% more qualified applicants in their first 48 hours.&rdquo;
            </p>
            <Link href="/post-job" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Update Job Details →
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
