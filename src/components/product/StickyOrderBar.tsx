'use client';

import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';

type StickyOrderBarProps = {
  productId: string;
  price: number;
};

export default function StickyOrderBar({ productId, price }: StickyOrderBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex items-center justify-between mb-2 px-2">
        <span className="font-bold text-gray-600 text-sm">السعر:</span>
        <ProductPriceDisplay
          productId={productId}
          price={price}
          size="md"
          showSavings={false}
        />
      </div>
      <a
        href="#order-form"
        className="block w-full bg-accent hover:bg-accent/90 text-white text-center font-black text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95"
      >
        أطلب الآن - الدفع عند الاستلام
      </a>
    </div>
  );
}
