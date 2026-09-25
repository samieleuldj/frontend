import { products, DEFAULT_REVIEWS } from '@/data/products';
import { getProductWithLivePrice } from '@/lib/product-prices';
import ProductPageContent from '@/components/product/ProductPageContent';
import ProductViewPixel from '@/components/tracking/ProductViewPixel';
import ExitIntentOffer from '@/components/product/ExitIntentOffer';
import JsonLd from '@/components/seo/JsonLd';
import { productJsonLd } from '@/lib/seo';

export default async function HoodLandingPage() {
  const base = products.find((p) => p.id === 'hood-insulation-mat');
  if (!base) return null;

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
      <ProductPageContent product={product} reviews={reviews} hideBreadcrumb />
      <ExitIntentOffer
        productId={product.id}
        productName={product.name}
        basePrice={product.price}
      />
    </>
  );
}
