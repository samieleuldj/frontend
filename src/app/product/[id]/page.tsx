import type { Metadata } from 'next';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ProductGallery from '@/components/product/ProductGallery';
import UsageSection from '@/components/product/UsageSection';
import ProductReviews from '@/components/product/ProductReviews';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductViewPixel from '@/components/tracking/ProductViewPixel';
import ExitIntentOffer from '@/components/product/ExitIntentOffer';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import JsonLd from '@/components/seo/JsonLd';
import { DEFAULT_REVIEWS } from '@/data/products';
import { buildPageMetadata, productJsonLd, siteConfig } from '@/lib/seo';
import { getProductWithLivePrice } from '@/lib/product-prices';

export const dynamic = 'force-dynamic';

const DEFAULT_PROBLEM_TEXT =
  'الجلوس الطويل، السياقة لمسافات، أو حتى طريقة النوم الخاطئة... كلها تسبب ضغطاً كبيراً على جسمك، مما يؤدي إلى تعب مستمر يمنعك من الاستمتاع بيومك والتركيز في عملك.';

const DEFAULT_SOLUTION_TEXT =
  'هذا المنتج مصمم خصيصاً ليوفر لك الدعم والراحة التي يفتقدها جسمك. ليس مجرد منتج عادي، بل هو استثمار في راحتك اليومية.';

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

  return buildPageMetadata({
    title: `${product.name} — ${product.price} دج | دفع عند الاستلام`,
    description: product.description,
    path: `/product/${product.id}`,
    image: product.images?.[0],
    keywords: [product.name, 'الجزائر', 'دفع عند الاستلام', siteConfig.nameAr],
  });
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const base = products.find(p => p.id === params.id);

  if (!base) {
    notFound();
  }

  const product = await getProductWithLivePrice(base);

  const problemText = product.problemText || DEFAULT_PROBLEM_TEXT;
  const solutionText = product.solutionText || DEFAULT_SOLUTION_TEXT;
  const reviews = product.reviews?.length ? product.reviews : DEFAULT_REVIEWS;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <ProductViewPixel
        productId={product.id}
        productName={product.name}
        price={product.price}
      />
      <JsonLd data={productJsonLd(product)} />
      {/* شريط التنقل السريع */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* 1. الصور + العنوان (موبايل) — فوق */}
          <div className="lg:col-span-7 space-y-6 order-1">
            {product.images && product.images.length > 0 ? (
              <ProductGallery images={product.images} productName={product.name} />
            ) : (
              <div className="w-full aspect-square bg-white rounded-2xl border border-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-gray-400 font-medium">صورة المنتج الرئيسية</span>
              </div>
            )}

            <div className="block lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {product.badge && (
                <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl font-black text-text mb-3 leading-tight">{product.name}</h1>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <ProductPriceDisplay
                  productId={product.id}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  size="lg"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                متوفر في المخزون - جاهز للتوصيل
              </div>
              {product.rating && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="font-bold">{product.rating}/5</span>
                  {product.reviewCount && (
                    <span className="text-gray-400">({product.reviewCount}+ زبون راضٍ)</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. فورم الطلب — مباشرة تحت العنوان على الموبايل */}
          <div className="lg:col-span-5 lg:row-span-2 order-2 self-start w-full">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                {product.badge && (
                  <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl font-black text-text mb-3 leading-tight">{product.name}</h1>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <ProductPriceDisplay
                    productId={product.id}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    size="xl"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700 font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="animate-pulse">🔥</span>
                  الطلب عالي جداً على هذا المنتج، الكمية محدودة!
                </div>
                {product.rating && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="font-bold">{product.rating}/5</span>
                    {product.reviewCount && (
                      <span className="text-gray-400">({product.reviewCount}+ تقييم)</span>
                    )}
                  </div>
                )}
              </div>

              <CheckoutForm
                productId={product.id}
                productName={product.name}
                price={product.price}
                requiresVehicleInfo={product.requiresVehicleInfo}
              />
              <ConversionTrustBar />
            </div>
          </div>

          {/* 3. المحتوى التفصيلي — تحت الفورم على الموبايل */}
          <div className="lg:col-span-7 space-y-8 order-3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
              
              {/* المشكلة */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl">⚠️</div>
                  <h2 className="text-2xl font-black text-text">تعاني من هذه المشكلة يومياً؟</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <p className="text-gray-600 text-lg leading-relaxed border-r-4 border-red-200 pr-4">
                    {problemText}
                  </p>
                  {product.beforeImage ? (
                    <div className="w-full rounded-xl overflow-hidden border border-red-100 shadow-sm bg-gray-50">
                      <Image
                        src={product.beforeImage}
                        alt={`${product.name} - قبل الاستخدام`}
                        width={800}
                        height={1000}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-red-50 rounded-xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-4xl mb-2">😫</span>
                      <span className="text-red-400 font-bold text-sm">مكان صورة المشكلة</span>
                    </div>
                  )}
                </div>
              </div>

              {/* الحل */}
              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">💡</div>
                  <h2 className="text-2xl font-black text-text">الحل اللي يريحك:</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                  {product.afterImage ? (
                    <div className="w-full rounded-xl overflow-hidden border border-green-100 shadow-sm bg-gray-50 order-2 md:order-1">
                      <Image
                        src={product.afterImage}
                        alt={`${product.name} - بعد الاستخدام`}
                        width={800}
                        height={1000}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-green-50 rounded-xl border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-center p-4 order-2 md:order-1">
                      <span className="text-4xl mb-2">😌</span>
                      <span className="text-green-500 font-bold text-sm">مكان صورة الحل</span>
                    </div>
                  )}
                  <p className="text-gray-700 text-lg leading-relaxed font-medium order-1 md:order-2 border-r-4 border-green-200 pr-4">
                    {solutionText}
                  </p>
                </div>
              </div>
              
              {/* المميزات */}
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mt-8">
                <h3 className="text-lg font-bold text-primary mb-4">واش راح تستفاد؟</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1 bg-white rounded-full shadow-sm w-6 h-6 flex items-center justify-center text-sm">✓</span>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {product.usageSteps && product.usageSteps.length > 0 && (
              <UsageSection
                steps={product.usageSteps}
                videoFile={product.videoFile}
                videoPoster={product.videoPoster}
              />
            )}

            {/* لماذا تشتري من عندنا (Trust Elements) */}
            <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-8 -mb-8"></div>
              
              <h2 className="text-2xl font-black mb-6 relative z-10">علاش تشري من فيلورا ديزاد؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="flex gap-4">
                  <div className="text-3xl">🥇</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">جودة مضمونة</h4>
                    <p className="text-blue-100 text-sm">منتجاتنا أصلية ومجربة، نختارها بعناية لضمان راحتك.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">🔄</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">استبدال ساهل</h4>
                    <p className="text-blue-100 text-sm">لقيت مشكل في المنتج؟ نبدلوهلك بكل سهولة وبدون تعقيدات.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">خدمة زبائن معاك</h4>
                    <p className="text-blue-100 text-sm">نعيطولك نأكدو الطلبية، ونبقاو معاك حتى يوصلك المنتج وتجربو.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">خلص كي تستلم</h4>
                    <p className="text-blue-100 text-sm">ما تخلص حتى دورو من قبل. حقك مضمون 100%.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* تقييمات واقعية */}
            <ProductReviews
              reviews={reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            {/* الأسئلة الشائعة (FAQ) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
              <h2 className="text-2xl font-black text-text mb-6">أسئلة متكررة</h2>
              <div className="space-y-4">
                <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-gray-800 flex justify-between items-center">
                    هل التوصيل متوفر لولايتي؟
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    نعم، نوفر التوصيل لجميع الولايات الـ 58 في الجزائر. التوصيل للولايات الكبرى يستغرق 24-48 ساعة، وباقي الولايات 48-72 ساعة.
                  </p>
                </details>
                <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-gray-800 flex justify-between items-center">
                    كيفاش نخلص؟
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    الدفع يكون عند الاستلام (Cash on Delivery). يعني ما تخلص حتى يوصلك المنتج ليدك وتتأكد منو.
                  </p>
                </details>
                <details className="group bg-gray-50 rounded-xl p-4 cursor-pointer">
                  <summary className="font-bold text-gray-800 flex justify-between items-center">
                    واش ندير إذا لقيت مشكل في المنتج؟
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    عندك ضمان استبدال مجاني. إذا لقيت أي خلل مصنعي، اتصل بينا في ظرف 7 أيام ونبعتولك واحد جديد باطل.
                  </p>
                </details>
              </div>
            </div>

          </div>

        </div>
      </div>

      <ExitIntentOffer
        productId={product.id}
        productName={product.name}
        basePrice={product.price}
      />

      <StickyOrderBar productId={product.id} price={product.price} />
    </div>
  );
}
