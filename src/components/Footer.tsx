import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="var(--color-primary)" />
          <span className="gradient-text" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Findr
          </span>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          © 2026 Findr. Connecting talent with opportunity.
        </p>
      </div>
    </footer>
  );
}
