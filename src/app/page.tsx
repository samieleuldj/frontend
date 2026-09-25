import type { Metadata } from 'next';
import HoodLandingPage from '@/components/product/HoodLandingPage';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'موكات عازلة تحت الكابو — 3900 دج | AUTO PLUS DZ',
  description:
    'موكات عزل تحت غطاء السيارة — تقلّل الحرارة والضجيج وتحمي الكابو. مقاس حسب ماركة وموديل سيارتك. الدفع عند الاستلام — توصيل 58 ولاية.',
  path: '/',
  image: '/products/hood-insulation-mat/real-product.png',
  keywords: ['موكات', 'عزل الكابو', 'أكسسوارات السيارات', 'AUTO PLUS DZ', 'دفع عند الاستلام'],
});

export default function HomePage() {
  return <HoodLandingPage />;
}
