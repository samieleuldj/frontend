import type { Metadata } from 'next';
import HomeContent from '@/components/home/HomeContent';
import { buildPageMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.nameAr} | ${siteConfig.tagline} — دفع عند الاستلام`,
  description: siteConfig.description,
  path: '/',
  keywords: siteConfig.keywords,
});

export default function HomePage() {
  return <HomeContent />;
}
