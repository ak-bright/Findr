'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import SkillTag from './SkillTag';
import { LOCATIONS, SKILLS_LIST, JOB_CATEGORIES } from '@/lib/types';

interface FilterState {
  location: string;
  category: string;
  skills: string[];
  search: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [skillsExpanded, setSkillsExpanded] = useState(false);

  const displaySkills = skillsExpanded ? SKILLS_LIST : SKILLS_LIST.slice(0, 12);

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ ...filters, skills: newSkills });
  };

  const clearFilters = () => {
    onFilterChange({ location: '', category: '', skills: [], search: '' });
  };

  const hasActiveFilters =
    filters.location || filters.category || filters.skills.length > 0;

  const filterContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-error)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="label">Location</label>
        <select
          className="input-field"
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          style={{ cursor: 'pointer' }}
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="label">Job Type</label>
        <select
          className="input-field"
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          style={{ cursor: 'pointer' }}
        >
          <option value="">All Types</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div>
        <label className="label">Skills</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {displaySkills.map((skill) => (
            <SkillTag
              key={skill}
              skill={skill}
              selected={filters.skills.includes(skill)}
              onClick={() => toggleSkill(skill)}
            />
          ))}
        </div>
        {SKILLS_LIST.length > 12 && (
          <button
            onClick={() => setSkillsExpanded(!skillsExpanded)}
            style={{
              marginTop: '0.5rem',
              background: 'none',
              border: 'none',
              color: 'var(--color-primary-light)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {skillsExpanded ? 'Show less' : `Show all (${SKILLS_LIST.length})`}
            <ChevronDown
              size={14}
              style={{
                transform: skillsExpanded ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="glass-card desktop-filter"
        style={{
          padding: '1.5rem',
          position: 'sticky',
          top: '90px',
          height: 'fit-content',
        }}
      >
        {filterContent}
      </div>

      {/* Mobile filter button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="btn-secondary mobile-filter-btn"
        style={{ display: 'none' }}
      >
        <Filter size={16} />
        Filters
        {hasActiveFilters && (
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {filters.skills.length + (filters.location ? 1 : 0) + (filters.category ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile filter overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'flex-end',
            }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-filter {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
