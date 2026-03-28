'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import JobCard from '@/components/JobCard';
import FilterSidebar from '@/components/FilterSidebar';
import { MOCK_JOBS } from '@/lib/mock-data';

export default function JobsPage() {
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    skills: [] as string[],
    search: '',
  });

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.company?.company_name?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Location filter
      if (filters.location && job.location !== filters.location) return false;
      // Category filter
      if (filters.category && job.category !== filters.category) return false;
      // Skills filter
      if (filters.skills.length > 0) {
        const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
        const hasMatch = filters.skills.some((s) =>
          jobSkillsLower.includes(s.toLowerCase())
        );
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Browse <span className="gradient-text">Opportunities</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
        </p>
      </motion.div>

      {/* Search bar */}
      <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
          }}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Search jobs by title, company, or keyword..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          style={{ paddingLeft: '2.75rem' }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="jobs-layout"
      >
        <FilterSidebar filters={filters} onFilterChange={setFilters} />

        <div>
          {filteredJobs.length > 0 ? (
            <div className="jobs-grid">
              {filteredJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                No jobs match your filters.
              </p>
              <button
                onClick={() =>
                  setFilters({ location: '', category: '', skills: [], search: '' })
                }
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary-light)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .jobs-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
