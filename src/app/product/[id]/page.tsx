import type { Metadata } from 'next';
import { DEFAULT_REVIEWS, products } from '@/data/products';
import { notFound } from 'next/navigation';
import HoodLandingPage from '@/components/product/HoodLandingPage';
import ProductPageContent from '@/components/product/ProductPageContent';
import ProductViewPixel from '@/components/tracking/ProductViewPixel';
import ExitIntentOffer from '@/components/product/ExitIntentOffer';
import JsonLd from '@/components/seo/JsonLd';
import { autoBrand } from '@/lib/store-brand';
import { buildPageMetadata, productJsonLd, siteConfig } from '@/lib/seo';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

const HOOD_ID = 'hood-insulation-mat';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const base = products.find((p) => p.id === params.id);
  if (!base) {
    return { title: 'منتج غير موجود' };
  }

  const product = await getProductWithLivePrice(base);
  const brandName = params.id === HOOD_ID ? autoBrand.nameAr : siteConfig.nameAr;

  return buildPageMetadata({
    title: `${product.name} — ${product.price} دج | ${brandName}`,
    description: product.description,
    path: `/product/${product.id}`,
    image: product.images?.[0],
    keywords: [product.name, brandName, 'دفع عند الاستلام'],
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
  const base = products.find((p) => p.id === params.id);
  if (!base) notFound();

  if (params.id === HOOD_ID) {
    return (
      <HoodLandingPage
        car={searchParams?.car}
        brand={searchParams?.brand}
        model={searchParams?.model}
      />
    );
  }

  const product = await getProductWithLivePrice(base);
  const reviews = product.reviews?.length ? product.reviews : DEFAULT_REVIEWS;

  return (
    <>
      <ProductViewPixel
        productId={product.id}
        productName={product.name}
        price={product.price}
      />
      <JsonLd data={productJsonLd(product)} />
      <ProductPageContent product={product} reviews={reviews} />
      <ExitIntentOffer
        productId={product.id}
        productName={product.name}
        basePrice={product.price}
      />
    </>
  );
}
