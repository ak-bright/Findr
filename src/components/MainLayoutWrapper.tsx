'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isStandalonePage = isAuthPage || pathname === '/dashboard';

  return (
    <>
      {!isStandalonePage && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isStandalonePage && <Footer />}
    </>
  );
}
