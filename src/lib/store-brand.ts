export const storeBrand = {
  name: 'AUTO PLUS DZ',
  nameAr: 'أوتو بلاس ديزاد',
  tagline: 'ACCESSOIRES AUTO',
  taglineAr: 'أكسسوارات السيارات',
  description:
    'متجر جزائري متخصص في أكسسوارات السيارات — عزل الكابو، حماية المحرك، ومنتجات تركيب سهلة. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
  email: '',
  accentClass: 'text-amber-400',
};

export function getSiteDisplayUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://confortdz.shop';
  try {
    return new URL(url).hostname;
  } catch {
    return 'confortdz.shop';
  }
}
