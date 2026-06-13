'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EXIT_DISCOUNT_DZD,
  markExitOfferShown,
  storeDiscount,
  wasExitOfferShown,
} from '@/lib/product-discount';

type ExitIntentOfferProps = {
  productId: string;
  productName: string;
  basePrice: number;
  discount?: number;
};

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(max-width: 768px)').matches
  );
}

function trapHistory(): void {
  try {
    window.history.pushState({ cdzExitTrap: Date.now() }, '', window.location.href);
  } catch {
    // بعض متصفحات in-app تمنع pushState
  }
}

export default function ExitIntentOffer({
  productId,
  productName,
  basePrice,
  discount = EXIT_DISCOUNT_DZD,
}: ExitIntentOfferProps) {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const salePrice = basePrice - discount;

  const showOnce = useCallback(() => {
    if (shownRef.current || wasExitOfferShown(productId)) return;
    shownRef.current = true;
    markExitOfferShown(productId);
    setOpen(true);
  }, [productId]);

  useEffect(() => {
    if (wasExitOfferShown(productId)) return;

    trapHistory();
    trapHistory();

    const onPopState = () => {
      showOnce();
      trapHistory();
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 0) return;
      showOnce();
    };

    let maxScroll = 0;
    let lastScrollY = window.scrollY;
    let scrollUpDelta = 0;
    let scrollRaf = 0;
    const pageStart = Date.now();

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0;
        const y = window.scrollY;
        maxScroll = Math.max(maxScroll, y);

        if (y < lastScrollY - 6) {
          scrollUpDelta += lastScrollY - y;
        } else if (y > lastScrollY + 6) {
          scrollUpDelta = 0;
        }

        const engaged = Date.now() - pageStart > 5000;
        const readEnough = maxScroll > 320;
        const scrollingUpToLeave = scrollUpDelta > 140 && y < maxScroll * 0.5;

        if (engaged && readEnough && scrollingUpToLeave) {
          showOnce();
        }

        lastScrollY = y;
      });
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        trapHistory();
      }
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pageshow', onPageShow);

    if (!isTouchDevice()) {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
    };
  }, [productId, showOnce]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const acceptOffer = () => {
    storeDiscount(productId, discount);
    setOpen(false);
    const form = document.getElementById('order-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeOffer = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60"
      onClick={closeOffer}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-offer-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-l from-accent to-orange-500 px-6 py-5 text-white text-center">
          <div className="text-3xl mb-2">🎁</div>
          <h2 id="exit-offer-title" className="text-xl font-black">
            قبل ما تخرجي... عرض خاص!
          </h2>
          <p className="text-sm text-white/90 mt-1">مرة واحدة فقط — اليوم</p>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-600 leading-relaxed mb-4">
            حبينا نسهّلو عليكِ الطلب على{' '}
            <span className="font-bold text-gray-800">{productName}</span>
          </p>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-5">
            <div className="text-sm text-gray-500 line-through">{basePrice} دج</div>
            <div className="text-3xl font-black text-primary">{salePrice} دج</div>
            <div className="text-sm font-bold text-green-700 mt-1">
              خصم {discount} دج — الدفع عند الاستلام
            </div>
          </div>

          <button
            type="button"
            onClick={acceptOffer}
            className="w-full bg-accent hover:bg-accent/90 text-white font-black text-lg py-4 rounded-xl shadow-lg mb-3"
          >
            استعملي الخصم وأطلبي الآن
          </button>

          <button
            type="button"
            onClick={closeOffer}
            className="w-full text-gray-400 text-sm py-2 hover:text-gray-600"
          >
            لا شكراً
          </button>
        </div>
      </div>
    </div>
  );
}
