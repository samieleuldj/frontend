'use client';

import { useEffect, useState } from 'react';
import {
  DISCOUNT_EVENT,
  getStoredDiscount,
} from '@/lib/product-discount';

type ProductPriceDisplayProps = {
  productId: string;
  price: number;
  oldPrice?: number;
  size?: 'md' | 'lg' | 'xl';
  showSavings?: boolean;
};

export default function ProductPriceDisplay({
  productId,
  price,
  oldPrice,
  size = 'md',
  showSavings = true,
}: ProductPriceDisplayProps) {
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setDiscount(getStoredDiscount(productId));

    const onDiscount = (event: Event) => {
      const detail = (event as CustomEvent<{ productId: string; amount: number }>).detail;
      if (detail?.productId === productId) {
        setDiscount(detail.amount);
      }
    };

    window.addEventListener(DISCOUNT_EVENT, onDiscount);
    return () => window.removeEventListener(DISCOUNT_EVENT, onDiscount);
  }, [productId]);

  const unitPrice = price - discount;
  const sizeClass =
    size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className={`${sizeClass} font-black text-primary`}>{unitPrice} دج</span>
      {(oldPrice || discount > 0) && (
        <div className="flex flex-col">
          {(oldPrice || discount > 0) && (
            <span className="text-gray-400 line-through text-sm">
              {discount > 0 ? `${price} دج` : oldPrice ? `${oldPrice} دج` : ''}
            </span>
          )}
          {showSavings && oldPrice && !discount && (
            <span className="text-accent text-xs font-bold bg-orange-50 px-2 py-0.5 rounded">
              وفر {oldPrice - price} دج!
            </span>
          )}
          {discount > 0 && (
            <span className="text-green-700 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">
              خصم {discount} دج مفعّل 🎁
            </span>
          )}
        </div>
      )}
    </div>
  );
}
