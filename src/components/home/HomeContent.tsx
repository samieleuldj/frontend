"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/products';
import CartDrawer from '@/components/cart/CartDrawer';

export default function HomeContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleQuickAdd = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProduct(productId);
    setIsCartOpen(true);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 mb-6 text-sm font-bold text-primary">
            <span className="animate-pulse">🟢</span> المتجر رقم #1 لمنتجات الراحة في الجزائر
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-text mb-4 leading-tight">
            تخلص من <span className="text-accent">آلام الظهر والرقبة</span><br className="hidden md:block" />
            واسترجع راحتك اليومية
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            منتجات طبية ومريحة مجربة من طرف آلاف الجزائريين. الدفع عند الاستلام والتوصيل لـ 58 ولاية.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#products" className="bg-accent hover:bg-accent/90 text-white text-xl font-black py-4 px-12 rounded-xl shadow-[0_8px_20px_-6px_rgba(245,158,11,0.5)] transition-transform active:scale-95 w-full sm:w-auto">
              تصفح المنتجات الآن
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="text-3xl mb-2">🤝</div>
              <span className="font-bold text-gray-800 text-sm">الدفع عند الاستلام</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-r border-gray-100">
              <div className="text-3xl mb-2">🚚</div>
              <span className="font-bold text-gray-800 text-sm">توصيل 58 ولاية</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-t md:border-t-0 md:border-r border-gray-100">
              <div className="text-3xl mb-2">🛡️</div>
              <span className="font-bold text-gray-800 text-sm">ضمان الاستبدال</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-t md:border-t-0 md:border-r border-gray-100">
              <div className="text-3xl mb-2">⭐</div>
              <span className="font-bold text-gray-800 text-sm">جودة مجربة</span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-text mb-2">منتجاتنا الأكثر مبيعاً</h2>
            <p className="text-gray-500">اختر المنتج الذي يناسب احتياجك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                <Link href={`/product/${product.id}`} className="relative block">
                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                      {product.badge}
                    </div>
                  )}
                  <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors overflow-hidden">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="text-gray-400 font-medium">صورة {product.name}</span>
                    )}
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-text mb-1 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount ?? 120}+ تقييم)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-5 mt-auto pt-4">
                    <span className="text-2xl font-black text-primary">{product.price} دج</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">{product.oldPrice} دج</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product.id, e)}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors active:scale-95"
                  >
                    أطلب الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-text mb-8">آلاف الجزائريين يثقون في كونفور ديزاد</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs text-right">
              <div className="flex text-yellow-400 text-sm mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 text-sm italic">&quot;خدمة ما شاء الله، التوصيل كان سريع والمنتج كيما في التصويرة.&quot;</p>
              <span className="block mt-2 font-bold text-sm text-gray-800">- كريم، قسنطينة</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs text-right">
              <div className="flex text-yellow-400 text-sm mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 text-sm italic">&quot;حزام الظهر ريحني بزاف في الخدمة، ننصح بيه أي واحد يطول في القعاد.&quot;</p>
              <span className="block mt-2 font-bold text-sm text-gray-800">- سمير، العاصمة</span>
            </div>
          </div>
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        productId={selectedProduct}
      />
    </div>
  );
}
