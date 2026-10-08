'use client';

import { useEffect, useState } from 'react';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';

type StickyOrderBarProps = {
  productId: string;
  productName: string;
  price: number;
  oldPrice?: number;
};

export default function StickyOrderBar({
  productId,
  productName,
  price,
  oldPrice,
}: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('product-hero');
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-cta lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-10px_24px_-8px_rgba(0,0,0,0.15)] px-4 py-3 safe-area-pb">
      <div className="flex items-center gap-3">
        <div className="sticky-price shrink-0">
          <ProductPriceDisplay
            productId={productId}
            price={price}
            oldPrice={oldPrice}
            size="md"
            showSavings={false}
          />
        </div>
        <a
          href="#order-form"
          aria-label={`أطلب ${productName}`}
          className="sticky-btn flex-1 flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-center font-black text-sm py-3.5 px-4 rounded-xl shadow-lg min-h-[48px]"
        >
          أطلب الآن — COD ✓
        </a>
      </div>
    </div>
  );
}
