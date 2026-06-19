/** Meta Pixel ID per product landing page (separate ad accounts). */
const PIXEL_BY_PRODUCT: Record<string, string | undefined> = {
  'cellulite-device':
    process.env.NEXT_PUBLIC_META_PIXEL_CELLULITE ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID ||
    process.env.META_PIXEL_ID,
  'mini-clima-geant':
    process.env.NEXT_PUBLIC_META_PIXEL_MINI_CLIMA_GEANT || '1061415349433201',
};

export function getMetaPixelIdForProduct(productId: string): string {
  const specific = PIXEL_BY_PRODUCT[productId]?.trim();
  if (specific && specific !== 'your_meta_pixel_id') {
    return specific;
  }
  return getDefaultMetaPixelId();
}

export function getDefaultMetaPixelId(): string {
  const id = (
    process.env.NEXT_PUBLIC_META_PIXEL_ID ||
    process.env.META_PIXEL_ID ||
    ''
  ).trim();
  return id === 'your_meta_pixel_id' ? '' : id;
}

export function getMetaPixelIdForPath(pathname: string | null): string {
  const match = pathname?.match(/^\/product\/([^/?#]+)/);
  if (match) {
    return getMetaPixelIdForProduct(decodeURIComponent(match[1]));
  }
  return getDefaultMetaPixelId();
}
