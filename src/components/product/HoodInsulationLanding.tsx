import Image from 'next/image';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import ProductReviews from '@/components/product/ProductReviews';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import type { Product, ProductReview } from '@/data/products';
import { storeBrand } from '@/lib/store-brand';

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
    desc: 'بدون عزل مناسب، صوت المحرك يدخل للمقصورة.',
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
      {/* Hero landing strip */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
                🚗 {product.badge || 'جديد'}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                الكابو تاع سيارتك يتعرض للحرارة والضجيج كل يوم...
                <span className="text-amber-400"> وأنت ماكش حاسبله.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
                كل ما تشعل السيارة، حرارة الموتور وضجيجو يضربو في الكابو من الداخل. مع الوقت العازل الأصلي يتآكل — خاصة مع الاستعمال اليومي والوقوف تحت الشمس ☀️
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <Image
                    src="/products/hood-insulation-mat/infographic.png"
                    alt="مشاكل عزل الكابو — حرارة وضجيج وتلف"
                    width={800}
                    height={1200}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <Image
                    src="/products/hood-insulation-mat/hero.png"
                    alt="تركيب موكات عازلة تحت الكابو"
                    width={800}
                    height={800}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
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
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-lg px-8 py-4 rounded-full transition-all shadow-lg shadow-amber-400/20"
              >
                🚗 شوف الموكات المناسبة لسيارتي
              </a>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="hidden lg:block bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h2 className="text-xl font-black mb-1">{product.name}</h2>
                <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center gap-2 text-sm text-amber-300 font-bold bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                  <span className="animate-pulse">🔥</span>
                  طلب عالي — اختار ماركة وموديل سيارتك بالضبط
                </div>
              </div>
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

      {/* Problem grid */}
      <section className="py-12 md:py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-400 text-zinc-950 font-black px-4 py-1 rounded-md text-sm mb-4">
              والنتيجة ؟
            </span>
            <h2 className="text-2xl md:text-3xl font-black">4 مشاكل كي ما يكونش عندك موكات مناسبة</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PROBLEMS.map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative"
              >
                <span className="absolute top-3 left-3 text-red-500 font-black text-lg">✕</span>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden border border-red-900/50">
              <Image
                src="/products/hood-insulation-mat/before.png"
                alt="قبل — حرارة وضجيج وعازل متلف تحت الكابو"
                width={900}
                height={700}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-red-400">قبل التركيب</h3>
              <p className="text-zinc-300 text-lg leading-relaxed">{product.problemText}</p>
              <ul className="space-y-2 text-zinc-400">
                <li className="flex gap-2"><span className="text-red-400">●</span> حرارة زائدة تحت الكابو</li>
                <li className="flex gap-2"><span className="text-red-400">●</span> ضجيج واضح من الموتور</li>
                <li className="flex gap-2"><span className="text-red-400">●</span> عازل قديم متلف أو مفقود</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-black">
                والحل ماشي تبدل الكابو...
                <span className="text-amber-400"> الحل يبدأ من العزل.</span>
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed">{product.solutionText}</p>
              <p className="text-zinc-400">
                سيارتك تستاهل موكات مناسبة ليها. اختار الماركة والموديل في الفورم — نوصلك المقاس الصحيح مع مشابك التثبيت.
              </p>
              <a
                href="#order-form"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black px-6 py-3 rounded-full transition-all"
              >
                أطلب موكات سيارتي ←
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-emerald-900/50 order-1 md:order-2">
              <Image
                src="/products/hood-insulation-mat/after.png"
                alt="بعد — تركيب موكات عازلة تحت الكابو"
                width={900}
                height={700}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Installation steps */}
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

      {/* Trust — AUTO PLUS */}
      <section className="py-12 bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center">
            علاش تشري من {storeBrand.nameAr}؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🥇', title: 'موكات مخصصة حسب سيارتك', desc: 'اختار الماركة والموديل — نوصلك المقاس المناسب.' },
              { icon: '🔄', title: 'استبدال ساهل', desc: 'مشكل في المقاس أو الجودة؟ نبدلوهلك بلا تعقيد.' },
              { icon: '📞', title: 'نتصلو بيك للتأكيد', desc: 'قبل ما نبعت الطلبية، نتأكدو من معلومات سيارتك.' },
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

      {/* Reviews */}
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
                a: 'نعم — الموكات تجي مع ثقوب التثبيت ومشابك. التركيب ياخذ 15-30 دقيقة بدون أدوات خاصة.',
              },
              {
                q: 'هل التوصيل متوفر لولايتي؟',
                a: 'نعم، نوصل لـ 58 ولاية. التوصيل 24-72 ساعة حسب الولاية.',
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

      {/* Final CTA */}
      <section className="py-10 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black mb-4">جاهز تحمي الكابو تاع سيارتك؟</h2>
          <p className="text-zinc-400 mb-6">3900 دج — الدفع عند الاستلام — توصيل 58 ولاية</p>
          <a
            href="#order-form"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xl px-10 py-4 rounded-full transition-all"
          >
            🚗 اطلب موكات سيارتي الآن
          </a>
        </div>
      </section>

      <StickyOrderBar productId={product.id} price={product.price} />
    </div>
  );
}
