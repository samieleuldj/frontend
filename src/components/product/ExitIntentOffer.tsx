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

const MIN_ENGAGE_MS = 12000;
const MIN_SCROLL_PX = 280;

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
  const engagedRef = useRef(false);
  const maxScrollRef = useRef(0);
  const pageStartRef = useRef(Date.now());
  const salePrice = basePrice - discount;

  const showOnce = useCallback(() => {
    if (shownRef.current || wasExitOfferShown(productId)) return;
    if (!engagedRef.current) return;
    shownRef.current = true;
    markExitOfferShown(productId);
    setOpen(true);
  }, [productId]);

  useEffect(() => {
    if (wasExitOfferShown(productId)) return;

    pageStartRef.current = Date.now();

    const markEngaged = () => {
      const elapsed = Date.now() - pageStartRef.current;
      if (elapsed >= MIN_ENGAGE_MS && maxScrollRef.current >= MIN_SCROLL_PX) {
        engagedRef.current = true;
      }
    };

    const onScroll = () => {
      maxScrollRef.current = Math.max(maxScrollRef.current, window.scrollY);
      markEngaged();
    };

    const onPopState = () => {
      markEngaged();
      if (!engagedRef.current) {
        trapHistory();
        return;
      }
      showOnce();
      trapHistory();
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (isTouchDevice()) return;
      if (event.clientY > 0) return;
      markEngaged();
      if (!engagedRef.current) return;
      showOnce();
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        trapHistory();
      }
    };

    const armBackTrap = () => {
      trapHistory();
      trapHistory();
    };

    const onFirstInteraction = () => {
      armBackTrap();
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
    window.addEventListener('keydown', onFirstInteraction);

    if (!isTouchDevice()) {
      document.addEventListener('mouseleave', onMouseLeave);
    }

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      document.removeEventListener('mouseleave', onMouseLeave);
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
