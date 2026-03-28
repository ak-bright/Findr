'use client';

import { motion } from 'framer-motion';

interface SkillTagProps {
  skill: string;
  selected?: boolean;
  onClick?: () => void;
  removable?: boolean;
  size?: 'sm' | 'md';
}

export default function SkillTag({
  skill,
  selected = false,
  onClick,
  removable = false,
  size = 'sm',
}: SkillTagProps) {
  const padding = size === 'sm' ? '0.2rem 0.6rem' : '0.35rem 0.85rem';
  const fontSize = size === 'sm' ? '0.75rem' : '0.85rem';

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding,
        fontSize,
        fontWeight: 500,
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: selected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.05)',
        color: selected ? '#a5b4fc' : 'var(--color-text-secondary)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {skill}
      {removable && (
        <span style={{ fontSize: '0.9em', lineHeight: 1 }}>×</span>
      )}
    </motion.button>
  );
}
