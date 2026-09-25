import type { Metadata } from 'next';
import { products } from '@/data/products';
import { notFound, redirect } from 'next/navigation';
import HoodLandingPage from '@/components/product/HoodLandingPage';
import { buildPageMetadata, siteConfig } from '@/lib/seo';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

const HOOD_ID = 'hood-insulation-mat';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (params.id !== HOOD_ID) {
    return { title: 'AUTO PLUS DZ' };
  }

  const base = products.find((p) => p.id === HOOD_ID);
  if (!base) {
    return { title: 'منتج غير موجود' };
  }

  const product = await getProductWithLivePrice(base);

  return buildPageMetadata({
    title: `${product.name} — ${product.price} دج | AUTO PLUS DZ`,
    description: product.description,
    path: `/product/${product.id}`,
    image: product.images?.[0],
    keywords: [product.name, 'موكات', 'AUTO PLUS DZ', 'دفع عند الاستلام'],
  });
}

type SearchParams = {
  car?: string;
  brand?: string;
  model?: string;
};

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: SearchParams;
}) {
  if (params.id === HOOD_ID) {
    return (
      <HoodLandingPage
        car={searchParams?.car}
        brand={searchParams?.brand}
        model={searchParams?.model}
      />
    );
  }

  if (params.id !== HOOD_ID) {
    redirect('/');
  }

  notFound();
}
