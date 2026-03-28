'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, EyeOff, Globe } from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('user');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup - ensuring redirect works
    router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ 
        padding: '1.5rem 3rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={24} color="var(--color-primary)" />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>Findr</span>
        </Link>
        <div style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none', marginLeft: '0.5rem' }}>
            Login
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', paddingTop: '80px' }}>
        {/* Left Side: Editorial */}
        <section style={{ 
          flex: 1, 
          padding: '4rem 6rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          gap: '2.5rem'
        }} className="editorial-section">
          <div style={{ maxWidth: '540px' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              color: 'var(--color-primary)', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              display: 'block'
            }}>
              Findr
            </span>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-manrope)'
            }}>
              Craft your future with <span style={{ color: 'var(--color-primary)' }}>precision.</span>
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--color-on-surface-variant)', 
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              Join an ecosystem designed for high-intent career discovery. Where students meet recruiters in a space built for meaningful professional growth.
            </p>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '600px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-ambient)' }}>
            <Image 
              src="/images/download(11).jpg" 
              alt="Workspace" 
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block', minHeight: '300px', objectFit: 'cover' }}
              unoptimized
            />
          </div>
        </section>

        {/* Right Side: Form Card */}
        <section style={{ 
          flex: 1, 
          background: 'var(--color-surface-container)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem'
        }} className="form-section">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="surface-card"
            style={{ 
              width: '100%', 
              maxWidth: '480px', 
              padding: '3rem', 
              boxShadow: 'var(--shadow-ambient)',
              background: '#ffffff'
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-manrope)' }}>Create Account</h2>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Select your role to get started</p>

            {/* Role Selector */}
            <div style={{ 
              background: 'var(--color-surface-container)', 
              padding: '4px', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              marginBottom: '2rem' 
            }}>
              <button 
                onClick={() => setRole('user')}
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  border: 'none', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: role === 'user' ? '#ffffff' : 'transparent',
                  color: role === 'user' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  boxShadow: role === 'user' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                Student / NSS
              </button>
              <button 
                onClick={() => setRole('company')}
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  border: 'none', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: role === 'company' ? '#ffffff' : 'transparent',
                  color: role === 'company' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  boxShadow: role === 'company' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                Company / Recruiter
              </button>
            </div>

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block', color: 'var(--color-on-surface)' }}>FULL NAME</label>
                <input 
                  type="text" 
                  placeholder="Alex Sterling" 
                  className="input-field" 
                  style={{ background: 'var(--color-surface-container-low)', border: 'none' }}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block', color: 'var(--color-on-surface)' }}>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="alex@atelier.com" 
                  className="input-field" 
                  style={{ background: 'var(--color-surface-container-low)', border: 'none' }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block', color: 'var(--color-on-surface)' }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPw ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    className="input-field" 
                    style={{ background: 'var(--color-surface-container-low)', border: 'none', paddingRight: '3rem' }}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem', marginTop: '1rem', borderRadius: 'var(--radius-sm)' }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Workspace'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-surface-variant)' }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>OR CONTINUE WITH</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-surface-variant)' }} />
              </div>

              <button 
                type="button" 
                className="btn-secondary" 
                style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', gap: '0.75rem', fontSize: '0.9rem' }}
              >
                <Globe size={20} />
                Sign up with Google
              </button>
            </form>

            <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
              By creating an account, you agree to our <Link href="#" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link><br />
              and <Link href="#" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>.
            </p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '3rem 6rem', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--color-surface-variant)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>Findr</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
            © 2024 Findr. The workspace for Careers.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Help Center', 'Contact Us'].map(link => (
            <Link key={link} href="#" style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', textDecoration: 'none', fontWeight: 500 }}>
              {link}
            </Link>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        @media (max-width: 1024px) {
          main { flex-direction: column; }
          .editorial-section { padding: 4rem 2rem; }
          .form-section { padding: 3rem 1.5rem; }
          footer { flex-direction: column; gap: 2rem; padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
