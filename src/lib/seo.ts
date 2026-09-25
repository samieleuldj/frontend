import type { Metadata } from 'next';

export const siteConfig = {
  name: 'AUTO PLUS DZ',
  nameAr: 'أوتو بلاس ديزاد',
  tagline: 'أكسسوارات السيارات في الجزائر',
  description:
    'متجر AUTO PLUS DZ — أكسسوارات السيارات: موكات عازلة للكابو، حماية المحرك، تركيب سهل. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
  locale: 'ar_DZ',
  keywords: [
    'متجر الجزائر',
    'دفع عند الاستلام',
    'توصيل 58 ولاية',
    'أكسسوارات السيارات',
    'موكات الكابو',
    'عزل الكابو',
    'AUTO PLUS DZ',
    'confortdz',
    'أوتو بلاس ديزاد',
  ],
  defaultOgImage: '/products/hood-insulation-mat/hero.png',
};

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://confortdz.shop';
  return url.replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path) return base;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(options.path || '/');
  const image = absoluteUrl(options.image || siteConfig.defaultOgImage);

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords || siteConfig.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.nameAr,
      title: options.title,
      description: options.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [image],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.nameAr,
    alternateName: siteConfig.name,
    url,
    logo: absoluteUrl(siteConfig.defaultOgImage),
    description: siteConfig.description,
    areaServed: {
      '@type': 'Country',
      name: 'Algeria',
    },
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.nameAr,
    alternateName: siteConfig.name,
    url,
    inLanguage: 'ar-DZ',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productJsonLd(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  rating?: number;
  reviewCount?: number;
}) {
  const url = absoluteUrl(`/product/${product.id}`);
  const image = product.images?.[0]
    ? absoluteUrl(product.images[0])
    : absoluteUrl(siteConfig.defaultOgImage);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [image],
    url,
    brand: {
      '@type': 'Brand',
      name: siteConfig.nameAr,
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'DZD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.nameAr,
      },
    },
  };

  if (product.rating && product.reviewCount) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return data;
}
