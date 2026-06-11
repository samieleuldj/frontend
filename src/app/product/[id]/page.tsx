import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* شريط التنقل السريع */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* العمود الأيمن: تفاصيل المنتج والصور */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* عنوان المنتج للموبايل (تم إزالته من هنا ونقله تحت الصور) */}

            {/* مكان مخصص للصور (Carousel Style) */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-white rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden group shadow-sm">
                <span className="text-gray-400 font-medium text-lg absolute z-10 text-center px-4">
                  صورة المنتج الرئيسية<br/>
                  <span className="text-sm">(أضف أزرار يمين/يسار هنا لتقليب الصور)</span>
                </span>
                
                {/* أزرار وهمية للتقليب */}
                <div className="absolute left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer hover:bg-white">
                  <span className="text-xl text-gray-600">❮</span>
                </div>
                <div className="absolute right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer hover:bg-white">
                  <span className="text-xl text-gray-600">❯</span>
                </div>
                
                {/* نقاط أسفل الصورة */}
                <div className="absolute bottom-4 flex gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full aspect-square bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:border-primary transition-colors cursor-pointer shadow-sm">
                    <span className="text-gray-400 text-xs">صورة {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* عنوان المنتج والسعر (للموبايل) - يظهر مباشرة تحت الصور */}
            <div className="block lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
              {product.badge && (
                <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl font-black text-text mb-3 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-black text-primary">{product.price} دج</span>
                {product.oldPrice && (
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-sm">{product.oldPrice} دج</span>
                    <span className="text-accent text-xs font-bold bg-orange-50 px-2 py-0.5 rounded">وفر {product.oldPrice - product.price} دج!</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                متوفر في المخزون - جاهز للتوصيل
              </div>
              
              {/* فورم الطلب للموبايل (تم رفعه ليكون مباشرة تحت السعر) */}
              <div className="mt-2 border-t border-gray-100 pt-6">
                <CheckoutForm productName={product.name} price={product.price} />
              </div>
            </div>

            {/* قسم المشكلة والحل (Copywriting مقنع + صور) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
              
              {/* المشكلة */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl">⚠️</div>
                  <h2 className="text-2xl font-black text-text">تعاني من هذه المشكلة يومياً؟</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <p className="text-gray-600 text-lg leading-relaxed border-r-4 border-red-200 pr-4">
                    الجلوس الطويل، السياقة لمسافات، أو حتى طريقة النوم الخاطئة... كلها تسبب ضغطاً كبيراً على جسمك، مما يؤدي إلى تعب مستمر يمنعك من الاستمتاع بيومك والتركيز في عملك.
                  </p>
                  {/* مكان صورة المشكلة */}
                  <div className="w-full aspect-video bg-red-50 rounded-xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-4xl mb-2">😫</span>
                    <span className="text-red-400 font-bold text-sm">مكان صورة المشكلة<br/>(شخص يعاني من الألم)</span>
                  </div>
                </div>
              </div>

              {/* الحل */}
              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">💡</div>
                  <h2 className="text-2xl font-black text-text">الحل اللي يريحك:</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                  {/* مكان صورة الحل */}
                  <div className="w-full aspect-video bg-green-50 rounded-xl border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-center p-4 order-2 md:order-1">
                    <span className="text-4xl mb-2">😌</span>
                    <span className="text-green-500 font-bold text-sm">مكان صورة الحل<br/>(شخص مرتاح يستخدم المنتج)</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium order-1 md:order-2 border-r-4 border-green-200 pr-4">
                    هذا المنتج مصمم خصيصاً ليوفر لك الدعم والراحة التي يفتقدها جسمك. ليس مجرد منتج عادي، بل هو استثمار في راحتك اليومية.
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

            {/* لماذا تشتري من عندنا (Trust Elements) */}
            <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-8 -mb-8"></div>
              
              <h2 className="text-2xl font-black mb-6 relative z-10">علاش تشري من كونفور ديزاد؟</h2>
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-text">واش قالو زبائننا؟</h2>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                  <span className="font-bold text-yellow-700">4.8/5</span>
                  <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">أ</div>
                      <div>
                        <span className="font-bold text-gray-800 block">أمين ب. <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded ml-2">مشترِ مؤكد</span></span>
                        <span className="text-xs text-gray-400">الجزائر العاصمة</span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"المنتج وصلني في يومين، الجودة تاعو خير ملي كنت متوقع. ريحني بزاف في الخدمة. يعطيهم الصحة فريق كونفور ديزاد على المعاملة المليحة."</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">س</div>
                      <div>
                        <span className="font-bold text-gray-800 block">سعاد م. <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded ml-2">مشترِ مؤكد</span></span>
                        <span className="text-xs text-gray-400">وهران</span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"شريتو لراجلي كان يعاني من سطر الظهر كي يسوق مسافات طويلة. الحمد لله عجبو بزاف وقال بلي لاحظ الفرق من النهار الأول."</p>
                </div>
              </div>
            </div>

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

          {/* العمود الأيسر: الفورم ومعلومات الشراء (مخفي في الموبايل لأنه موجود بالأعلى) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              
              {/* عنوان المنتج للديسكتوب */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                {product.badge && (
                  <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl font-black text-text mb-3 leading-tight">{product.name}</h1>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-black text-primary">{product.price} دج</span>
                  {product.oldPrice && (
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-lg">{product.oldPrice} دج</span>
                      <span className="text-accent text-sm font-bold">وفر {product.oldPrice - product.price} دج!</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-red-700 font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="animate-pulse">🔥</span>
                  الطلب عالي جداً على هذا المنتج، الكمية محدودة!
                </div>
              </div>

              {/* فورم الطلب للديسكتوب */}
              <CheckoutForm productName={product.name} price={product.price} />

            </div>
          </div>

        </div>
      </div>

      {/* زر طلب عائم للموبايل (Sticky Mobile CTA) - يوجه للفورم العلوي */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="font-bold text-gray-600 text-sm">السعر الإجمالي:</span>
          <span className="font-black text-primary text-xl">{product.price} دج</span>
        </div>
        <a 
          href="#order-form"
          className="block w-full bg-accent hover:bg-accent/90 text-white text-center font-black text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95"
        >
          أطلب الآن - الدفع عند الاستلام
        </a>
      </div>
    </div>
  );
}
