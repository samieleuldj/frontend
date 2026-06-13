import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const productPages = products.map((product) => ({
    url: `${siteUrl}/product/${product.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productPages,
  ];
}
