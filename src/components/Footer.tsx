import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1.75rem 2rem',
        background: '#ffffff',
        borderTop: '1px solid var(--color-outline-variant)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/images/logo.png" alt="Findr" width={88} height={32} style={{ objectFit: 'contain' }} />
        </Link>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
          © 2024 Findr. All rights reserved.
        </span>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {['Privacy Policy', 'Terms of Service', 'Help Center'].map((item) => (
          <Link
            key={item}
            href="#"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-on-surface-variant)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.15s',
            }}
          >
            {item}
          </Link>
        ))}
      </div>
    </footer>
  );
}
