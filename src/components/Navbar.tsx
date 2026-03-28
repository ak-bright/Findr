'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  LayoutDashboard,
  FileText,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  LogIn,
} from 'lucide-react';

const navLinks = [
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cv-review', label: 'CV Review', icon: FileText },
  { href: '/post-job', label: 'Post Job', icon: PlusCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={28} color="var(--color-primary)" />
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
            className="gradient-text"
          >
            Findr
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem', /* Highly spacious tabs to meet the whitespace layout requirement */
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  background: isActive ? 'var(--color-primary-fixed)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/login"
            className="btn-primary"
            style={{
              marginLeft: '0.75rem',
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <LogIn size={16} />
            Login
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu"
            style={{
              overflow: 'hidden',
              background: 'var(--color-surface-container-lowest)',
              borderTop: '1px solid var(--color-outline-variant)',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                      background: isActive ? 'var(--color-primary-fixed)' : 'transparent',
                    }}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{
                  marginTop: '0.5rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                <LogIn size={16} />
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
