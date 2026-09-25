import Image from 'next/image';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import ProductReviews from '@/components/product/ProductReviews';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import type { Product, ProductReview } from '@/data/products';
import { storeBrand } from '@/lib/store-brand';

const PROBLEM_IMAGE = '/products/hood-insulation-mat/before.png';
const SOLUTION_IMAGE = '/products/hood-insulation-mat/solution.png';

const PROBLEMS = [
  {
    icon: '🚗',
    title: 'الكابو من الداخل يولي شكله مهمل',
    desc: 'العازل القديم يتشقق ويبان السطح متهالك.',
  },
  {
    icon: '💥',
    title: 'العازل القديم يتفكك أو يتلف',
    desc: 'مع الحرارة والشمس، المادة تتآكل وتسقط.',
  },
  {
    icon: '🔊',
    title: 'ضجيج الموتور يكون واضح أكثر',
    desc: 'بدون موكات مناسبة، صوت المحرك يدخل للمقصورة.',
  },
  {
    icon: '🌡️',
    title: 'حرارة قوية تحت الكابو',
    desc: 'الحرارة تتراكم وتضر المحرك والمقصورة.',
  },
];

type Props = {
  product: Product;
  reviews: ProductReview[];
};

export default function HoodInsulationLanding({ product, reviews }: Props) {
  return (
    <div className="bg-zinc-950 min-h-screen pb-24 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
                🚗 {product.badge || 'جديد'}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                {product.name}
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <ProductPriceDisplay
                  productId={product.id}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  size="xl"
                />
                {product.rating && (
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="text-amber-400">⭐⭐⭐⭐⭐</span>
                    <span className="font-bold text-white">{product.rating}/5</span>
                    <span>({product.reviewCount}+ زبون)</span>
                  </div>
                )}
              </div>

              <a
                href="#order-form"
                className="hidden lg:inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-lg px-8 py-4 rounded-full transition-all shadow-lg shadow-amber-400/20"
              >
                🚗 اطلب الموكات المناسبة لسيارتي
              </a>
            </div>

            <div className="lg:hidden">
              <CheckoutForm
                productId={product.id}
                productName={product.name}
                price={product.price}
                requiresVehicleInfo
                variant="automotive"
              />
            </div>

            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 space-y-4">
              <CheckoutForm
                productId={product.id}
                productName={product.name}
                price={product.price}
                requiresVehicleInfo
                variant="automotive"
              />
              <ConversionTrustBar />
            </div>
          </div>
        </div>
      </section>

      {/* المشكلة — صورة المستخدم */}
      <section className="py-10 md:py-14 bg-zinc-900/60 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-red-500/20 text-red-400 font-black px-4 py-1 rounded-md text-sm mb-3">
              ⚠️ المشكلة
            </span>
            <h2 className="text-2xl md:text-3xl font-black">
              الكابو تاع سيارتك يتعرض للحرارة والضجيج كل يوم
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              {product.problemText}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-red-900/40 shadow-2xl max-w-5xl mx-auto">
            <Image
              src={PROBLEM_IMAGE}
              alt="مشاكل الكابو — حرارة زائدة، ضجيج الموتور، وعازل متلف"
              width={1200}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-5xl mx-auto">
            {PROBLEMS.map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 relative"
              >
                <span className="absolute top-2 left-2 text-red-500 font-black">✕</span>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-white mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الحل — صورة التركيب */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 font-black px-4 py-1 rounded-md text-sm mb-3">
              ✅ الحل
            </span>
            <h2 className="text-2xl md:text-3xl font-black">
              والحل ماشي تبدل الكابو...
              <span className="text-amber-400"> الحل يبدأ من الموكات.</span>
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              {product.solutionText}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-emerald-900/40 shadow-2xl max-w-5xl mx-auto">
            <Image
              src={SOLUTION_IMAGE}
              alt="تركيب الموكات العازلة تحت الكابو — AUTO PLUS DZ"
              width={1200}
              height={900}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="text-center mt-8">
            <a
              href="#order-form"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-lg px-8 py-4 rounded-full transition-all"
            >
              🚗 اطلب الموكات المناسبة لسيارتي — {product.price} دج
            </a>
          </div>
        </div>
      </section>

      {/* المميزات */}
      <section className="py-12 bg-zinc-900/50 border-y border-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black mb-8 text-center">واش راح تستفاد من الموكات؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              >
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span className="text-zinc-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* خطوات التركيب */}
      {product.usageSteps && product.usageSteps.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-black mb-6 text-center">كيفاش تركّب الموكات؟</h2>
            <ol className="space-y-4">
              {product.usageSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 font-black flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-zinc-200 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ثقة */}
      <section className="py-12 bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center">
            علاش تشري من {storeBrand.nameAr}؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🥇', title: 'موكات مخصصة حسب سيارتك', desc: 'اختار الماركة والموديل — نوصلك المقاس المناسب.' },
              { icon: '🔄', title: 'استبدال ساهل', desc: 'مشكل في المقاس أو الجودة؟ نبدلوهلك بلا تعقيد.' },
              { icon: '📞', title: 'نتصلو بيك للتأكيد', desc: 'قبل ما نبعث الطلبية، نتأكدو من معلومات سيارتك.' },
              { icon: '🤝', title: 'خلص كي تستلم', desc: 'الدفع عند الاستلام — حقك مضمون 100%.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-white/20 backdrop-blur rounded-xl p-5">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h4 className="font-black text-lg mb-1">{item.title}</h4>
                  <p className="text-zinc-900/80 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* تقييمات */}
      <section className="py-12 bg-zinc-950">
        <div className="container mx-auto px-4">
          <ProductReviews
            reviews={reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-black mb-6 text-center">أسئلة متكررة</h2>
          <div className="space-y-3">
            {[
              {
                q: 'كيفاش نعرف المقاس المناسب لسيارتي؟',
                a: 'اختار الماركة والموديل في فورم الطلب. فريقنا يتأكد معاك قبل الإرسال باش نوصلك الموكات المناسبة.',
              },
              {
                q: 'هل التركيب ساهل؟',
                a: 'نعم — الموكات تجي مع ثقوب التثبيت ومشابك. التركيب ياخذ من 15 إلى 30 دقيقة بدون أدوات خاصة.',
              },
              {
                q: 'هل التوصيل متوفر لولايتي؟',
                a: 'نعم، نوصل لـ 58 ولاية. التوصيل من 24 إلى 72 ساعة حسب الولاية.',
              },
              {
                q: 'كيفاش نخلص؟',
                a: 'الدفع عند الاستلام فقط — ما تخلص حتى يوصلك المنتج ليدك.',
              },
            ].map((item) => (
              <details key={item.q} className="group bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer">
                <summary className="font-bold text-white flex justify-between items-center gap-4">
                  {item.q}
                  <span className="text-amber-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                </summary>
                <p className="text-zinc-400 mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA أخير */}
      <section className="py-10 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black mb-4">جاهز تحمي الكابو تاع سيارتك؟</h2>
          <p className="text-zinc-400 mb-6">{product.price} دج — الدفع عند الاستلام — توصيل 58 ولاية</p>
          <a
            href="#order-form"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xl px-10 py-4 rounded-full transition-all"
          >
            🚗 اطلب الموكات الآن
          </a>
        </div>
      </section>

      <StickyOrderBar productId={product.id} price={product.price} />
    </div>
  );
}
