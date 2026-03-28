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

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
