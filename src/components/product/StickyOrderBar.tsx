'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '@/lib/store';
import { trackLead } from '@/lib/pixels';

type StickyOrderBarProps = {
  productId: string;
  productName: string;
  price: number;
  oldPrice?: number;
};

function buildWhatsAppMessage(productName: string, price: number): string {
  return `سلام، بغيت نطلب ${productName} (${price} دج — COD).`;
}

export default function StickyOrderBar({
  productId,
  productName,
  price,
  oldPrice,
}: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false);

  const whatsAppUrl = useMemo(
    () =>
      `${STORE_WHATSAPP_URL}?text=${encodeURIComponent(buildWhatsAppMessage(productName, price))}`,
    [productName, price]
  );

  const phoneUrl = `tel:+213${STORE_PHONE.slice(1)}`;

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
    <div className="sticky-cta lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-10px_24px_-8px_rgba(0,0,0,0.15)] p-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-bold text-gray-600 text-sm">السعر:</span>
        <ProductPriceDisplay
          productId={productId}
          price={price}
          oldPrice={oldPrice}
          size="md"
          showSavings={false}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead({ productId, productName, price })}
          className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-center font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg"
        >
          💬 واتساب
        </a>
        <a
          href={phoneUrl}
          onClick={() => trackLead({ productId, productName, price })}
          className="flex items-center justify-center gap-1 bg-primary hover:bg-primary/90 text-white text-center font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg"
        >
          📞 اتصل
        </a>
        <a
          href="#order-form"
          className="flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-center font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg"
        >
          أطلب COD
        </a>
      </div>
    </div>
  );
}
