export const storeBrand = {
  name: 'Confort DZ',
  nameAr: 'كونفور ديزاد',
  tagline: 'COMFORT STORE',
  taglineAr: 'منتجات الراحة في الجزائر',
  description:
    'المتجر الجزائري لمنتجات الراحة اليومية — أجهزة تدليك، عناية، وأكسسوارات auto. الدفع عند الاستلام والتوصيل لـ 58 ولاية.',
  email: 'contact@confortdz.shop',
  accentClass: 'text-accent',
};

export const autoBrand = {
  name: 'AUTO PLUS DZ',
  nameAr: 'أوتو بلاس ديزاد',
  taglineAr: 'أكسسوارات السيارات',
};

export function getSiteDisplayUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://confortdz.shop';
  try {
    return new URL(url).hostname;
  } catch {
    return 'confortdz.shop';
  }
}
