'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Bookmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_JOBS } from '@/lib/mock-data';

const LOCATIONS = ['Accra', 'Kumasi', 'Remote'];
const FIELDS = ['Tech', 'Finance', 'Engineering'];
const OPP_TYPES = ['Internship', 'NSS (National Service)'];

const fieldCategoryMap: Record<string, string[]> = {
  Tech: ['internship', 'nss', 'entry-level'],
  Finance: ['internship'],
  Engineering: ['internship', 'entry-level'],
};

const fieldIconMap: Record<string, string> = {
  Tech: '< >',
  Finance: '⚖',
  Engineering: '⚙',
};

function JobIcon({ category }: { category: string }) {
  const icon = fieldIconMap[category] || '🏢';
  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
      background: '#f1f3f5', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700,
      color: 'var(--color-primary)', flexShrink: 0, fontFamily: 'monospace',
    }}>
      {icon}
    </div>
  );
}

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleLocation = (loc: string) =>
    setSelectedLocations((prev) => prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]);

  const toggleField = (field: string) =>
    setSelectedFields((prev) => prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]);

  const toggleSave = (id: string) =>
    setSavedJobs((prev) => prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      if (search) {
        const q = search.toLowerCase();
        if (!job.title.toLowerCase().includes(q) && !job.company?.company_name?.toLowerCase().includes(q) && !job.description.toLowerCase().includes(q)) return false;
      }
      if (selectedLocations.length > 0 && !selectedLocations.includes(job.location)) return false;
      if (selectedType) {
        const typeMap: Record<string, string> = { 'Internship': 'internship', 'NSS (National Service)': 'nss' };
        if (job.category !== typeMap[selectedType]) return false;
      }
      if (selectedFields.length > 0) {
        const allowedCategories = selectedFields.flatMap((f) => fieldCategoryMap[f] || []);
        if (!allowedCategories.includes(job.category)) return false;
      }
      return true;
    });
  }, [search, selectedLocations, selectedFields, selectedType]);

  const resetFilters = () => {
    setSelectedLocations([]);
    setSelectedFields([]);
    setSelectedType('');
    setSearch('');
  };

  const getCategoryTags = (job: typeof MOCK_JOBS[0]) => {
    const field = job.skills.some((s) => ['React', 'JavaScript', 'Python', 'Node.js', 'Flutter', 'TypeScript'].includes(s))
      ? 'TECH'
      : job.skills.some((s) => ['Excel', 'Accounting', 'Finance'].includes(s))
      ? 'FINANCE'
      : 'ENGINEERING';
    const typeLabel = job.category === 'nss' ? 'NSS' : job.category === 'entry-level' ? 'ENTRY LEVEL' : 'INTERNSHIP';
    return { field, typeLabel };
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', background: '#f7f9fb' }}>
      {/* Filter Sidebar */}
      <aside style={{
        width: '220px',
        padding: '2rem 1.25rem',
        background: '#ffffff',
        borderRight: '1px solid #eceef0',
        flexShrink: 0,
        position: 'sticky',
        top: '64px',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'var(--font-manrope)' }}>Discovery Filters</h2>

        {/* Location */}
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>LOCATION</p>
          {LOCATIONS.map((loc) => (
            <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleLocation(loc)}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
              />
              {loc}
            </label>
          ))}
        </div>

        {/* Field */}
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>FIELD</p>
          {FIELDS.map((f) => (
            <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={selectedFields.includes(f)}
                onChange={() => toggleField(f)}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
              />
              {f}
            </label>
          ))}
        </div>

        {/* Opportunity Type */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>OPPORTUNITY TYPE</p>
          {OPP_TYPES.map((type) => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="radio"
                name="opp-type"
                checked={selectedType === type}
                onChange={() => setSelectedType(type)}
                style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
              />
              {type}
            </label>
          ))}
        </div>

        <button
          onClick={resetFilters}
          style={{
            width: '100%', padding: '0.6rem 1rem', background: '#f1f3f5',
            border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-on-surface-variant)',
          }}
        >
          Reset All Filters
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2.5rem 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.4rem', fontFamily: 'var(--font-manrope)' }}>Find your next move</h1>
          <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Curated opportunities for high-potential talent in Ghana.</p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search by role, company or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%', paddingLeft: '2.75rem', paddingRight: '1rem',
                  paddingTop: '0.75rem', paddingBottom: '0.75rem',
                  border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem', outline: 'none', background: '#fff',
                }}
              />
            </div>
            <button className="btn-primary" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', borderRadius: 'var(--radius-md)' }}>
              Search
            </button>
          </div>

          {/* Job cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No jobs match your filters.</p>
                <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Clear all filters</button>
              </div>
            ) : (
              filteredJobs.map((job, i) => {
                const { field, typeLabel } = getCategoryTags(job);
                const isSaved = savedJobs.includes(job.id);
                const tagColors: Record<string, { bg: string; color: string }> = {
                  TECH: { bg: '#e8f0ff', color: '#0032b5' },
                  FINANCE: { bg: '#fff3e0', color: '#e65c00' },
                  ENGINEERING: { bg: '#f0fdf4', color: '#0d7a45' },
                  NSS: { bg: '#e6f9f0', color: '#0d7a45' },
                  INTERNSHIP: { bg: '#fff3e0', color: '#e65c00' },
                  'ENTRY LEVEL': { bg: '#ede9fe', color: '#6d28d9' },
                };
                const locTag = { bg: '#fdf2f8', color: '#9333ea' };

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: '#fff', borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem', display: 'flex', alignItems: 'center',
                      gap: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      borderLeft: '3px solid var(--color-primary)',
                    }}
                  >
                    <JobIcon category={field} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        <span style={{ ...tagColors[field], padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>{field}</span>
                        <span style={{ ...tagColors[typeLabel] || { bg: '#f1f3f5', color: '#6b7280' }, padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 700 }}>{typeLabel}</span>
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: 'var(--font-manrope)' }}>{job.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.6rem' }}>
                        {job.company?.company_name} • <span style={locTag}>{job.location}</span>
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {job.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="btn-primary"
                        style={{ textDecoration: 'none', padding: '0.6rem 1.25rem', fontSize: '0.875rem', borderRadius: 'var(--radius-md)', whiteSpace: 'nowrap' }}
                      >
                        Apply Now
                      </Link>
                      <button
                        onClick={() => toggleSave(job.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                          padding: '0.6rem 1.25rem', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)',
                          background: isSaved ? 'var(--color-primary-fixed)' : '#fff', cursor: 'pointer',
                          fontSize: '0.875rem', fontWeight: 600,
                          color: isSaved ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                        }}
                      >
                        <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /> Save
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Portfolio CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: '2rem',
              background: 'linear-gradient(135deg, #e8f0ff 0%, #ede9fe 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: '4px solid var(--color-primary)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem', fontFamily: 'var(--font-manrope)' }}>Build your Portfolio</h3>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.5 }}>
                Candidates with verified projects have a 40% higher chance of being selected for NSS roles in Tech and Finance.
              </p>
            </div>
            <button className="btn-primary" style={{ flexShrink: 0, padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Add a Project <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
