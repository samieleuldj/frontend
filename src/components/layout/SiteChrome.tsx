'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LandingHeader from '@/components/layout/LandingHeader';
import LandingFooter from '@/components/layout/LandingFooter';

const LANDING_PATHS = new Set(['/', '/product/hood-insulation-mat']);

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = LANDING_PATHS.has(pathname);

  if (isLanding) {
    return (
      <>
        <LandingHeader />
        <main className="flex-grow">{children}</main>
        <LandingFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
