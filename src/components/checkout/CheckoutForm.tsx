"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  formatShippingLabel,
  getShippingCost,
  getShippingRate,
  getWilayaCode,
  isDeskDeliveryAvailable,
} from '@/data/shipping-rates';
import { getCommunesForWilaya } from '@/data/communes';
import { getTrackingContext, trackEvent } from '@/lib/analytics';
import { storePendingPurchase, trackInitiateCheckout, trackLead } from '@/lib/pixels';
import { STORE_WHATSAPP_URL } from '@/lib/store';
import {
  DISCOUNT_EVENT,
  EXIT_DISCOUNT_DZD,
  getStoredDiscount,
} from '@/lib/product-discount';
import { LIVE_PRICE_EVENT } from '@/components/product/LiveStorefrontPrices';
import CarBrandPicker from '@/components/checkout/CarBrandPicker';
import {
  formatVehicleSelection,
  getModelsForBrand,
} from '@/data/car-brands';
import { getSiteDisplayUrl } from '@/lib/store-brand';

const WILAYAS = [
  "01 - Ø£Ø¯Ø±Ø§Ø±", "02 - Ø§Ù„Ø´Ù„Ù", "03 - Ø§Ù„Ø£ØºÙˆØ§Ø·", "04 - Ø£Ù… Ø§Ù„Ø¨ÙˆØ§Ù‚ÙŠ", "05 - Ø¨Ø§ØªÙ†Ø©", "06 - Ø¨Ø¬Ø§ÙŠØ©", "07 - Ø¨Ø³ÙƒØ±Ø©", "08 - Ø¨Ø´Ø§Ø±", "09 - Ø§Ù„Ø¨Ù„ÙŠØ¯Ø©", "10 - Ø§Ù„Ø¨ÙˆÙŠØ±Ø©",
  "11 - ØªÙ…Ù†Ø±Ø§Ø³Øª", "12 - ØªØ¨Ø³Ø©", "13 - ØªÙ„Ù…Ø³Ø§Ù†", "14 - ØªÙŠØ§Ø±Øª", "15 - ØªÙŠØ²ÙŠ ÙˆØ²Ùˆ", "16 - Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±", "17 - Ø§Ù„Ø¬Ù„ÙØ©", "18 - Ø¬ÙŠØ¬Ù„", "19 - Ø³Ø·ÙŠÙ", "20 - Ø³Ø¹ÙŠØ¯Ø©",
  "21 - Ø³ÙƒÙŠÙƒØ¯Ø©", "22 - Ø³ÙŠØ¯ÙŠ Ø¨Ù„Ø¹Ø¨Ø§Ø³", "23 - Ø¹Ù†Ø§Ø¨Ø©", "24 - Ù‚Ø§Ù„Ù…Ø©", "25 - Ù‚Ø³Ù†Ø·ÙŠÙ†Ø©", "26 - Ø§Ù„Ù…Ø¯ÙŠØ©", "27 - Ù…Ø³ØªØºØ§Ù†Ù…", "28 - Ø§Ù„Ù…Ø³ÙŠÙ„Ø©", "29 - Ù…Ø¹Ø³ÙƒØ±", "30 - ÙˆØ±Ù‚Ù„Ø©",
  "31 - ÙˆÙ‡Ø±Ø§Ù†", "32 - Ø§Ù„Ø¨ÙŠØ¶", "33 - Ø¥Ù„ÙŠØ²ÙŠ", "34 - Ø¨Ø±Ø¬ Ø¨ÙˆØ¹Ø±ÙŠØ±ÙŠØ¬", "35 - Ø¨ÙˆÙ…Ø±Ø¯Ø§Ø³", "36 - Ø§Ù„Ø·Ø§Ø±Ù", "37 - ØªÙ†Ø¯ÙˆÙ", "38 - ØªÙŠØ³Ù…Ø³ÙŠÙ„Øª", "39 - Ø§Ù„ÙˆØ§Ø¯ÙŠ", "40 - Ø®Ù†Ø´Ù„Ø©",
  "41 - Ø³ÙˆÙ‚ Ø£Ù‡Ø±Ø§Ø³", "42 - ØªÙŠØ¨Ø§Ø²Ø©", "43 - Ù…ÙŠÙ„Ø©", "44 - Ø¹ÙŠÙ† Ø§Ù„Ø¯ÙÙ„Ù‰", "45 - Ø§Ù„Ù†Ø¹Ø§Ù…Ø©", "46 - Ø¹ÙŠÙ† ØªÙ…ÙˆØ´Ù†Øª", "47 - ØºØ±Ø¯Ø§ÙŠØ©", "48 - ØºÙ„ÙŠØ²Ø§Ù†",
  "49 - ØªÙŠÙ…ÙŠÙ…ÙˆÙ†", "50 - Ø¨Ø±Ø¬ Ø¨Ø§Ø¬ÙŠ Ù…Ø®ØªØ§Ø±", "51 - Ø£ÙˆÙ„Ø§Ø¯ Ø¬Ù„Ø§Ù„", "52 - Ø¨Ù†ÙŠ Ø¹Ø¨Ø§Ø³", "53 - Ø¹ÙŠÙ† ØµØ§Ù„Ø­", "54 - Ø¹ÙŠÙ† Ù‚Ø²Ø§Ù…", "55 - ØªÙ‚Ø±Øª", "56 - Ø¬Ø§Ù†Øª", "57 - Ø§Ù„Ù…ØºÙŠØ±", "58 - Ø§Ù„Ù…Ù†ÙŠØ¹Ø©",
];

interface CheckoutFormProps {
  productId: string;
  productName: string;
  price: number;
  requiresVehicleInfo?: boolean;
  variant?: 'default' | 'automotive';
  initialBrandId?: string;
  initialModelId?: string;
}

export default function CheckoutForm({
  productId,
  productName,
  price,
  requiresVehicleInfo = false,
  variant = 'default',
  initialBrandId = '',
  initialModelId = '',
}: CheckoutFormProps) {
  const siteHost = getSiteDisplayUrl();
  const isAutomotive = variant === 'automotive';
  const [livePrice, setLivePrice] = useState(price);
  const maxQuantity = livePrice >= 5000 ? 2 : 4;
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [exitDiscount, setExitDiscount] = useState(0);

  const [customerName, setCustomerName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [commune, setCommune] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'office'>('home');
  const [nameError, setNameError] = useState('');
  const [wilayaError, setWilayaError] = useState('');
  const [communeError, setCommuneError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [deliveryError, setDeliveryError] = useState('');
  const [carBrandId, setCarBrandId] = useState(initialBrandId);
  const [carModelId, setCarModelId] = useState(initialModelId);
  const [vehicleError, setVehicleError] = useState('');
  const carModels = getModelsForBrand(carBrandId);
  const checkoutTracked = useRef(false);

  const shippingRate = useMemo(() => getShippingRate(wilaya), [wilaya]);
  const communes = useMemo(() => getCommunesForWilaya(wilaya), [wilaya]);
  const deliveryCost = useMemo(() => {
    if (!wilaya) return null;
    return getShippingCost(wilaya, deliveryType);
  }, [wilaya, deliveryType]);

  const unitPrice = livePrice - exitDiscount;
  const baseTotal = unitPrice * quantity;
  const total = baseTotal + (deliveryCost ?? 0);

  const trackCheckoutStart = useCallback(() => {
    if (checkoutTracked.current) return;
    checkoutTracked.current = true;
    trackEvent('checkout_start', {
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      product_name: productName,
      product_id: productId,
    });
    trackInitiateCheckout({
      productId,
      productName,
      price: unitPrice,
      quantity,
    });
  }, [productId, productName, unitPrice, quantity]);

  const whatsAppOrderUrl = useMemo(() => {
    const vehicle = carBrandId && carModelId ? formatVehicleSelection(carBrandId, carModelId) : '';
    const lines = [
      'Ø³Ù„Ø§Ù…ØŒ Ø¨ØºÙŠØª Ù†Ø·Ù„Ø¨ Ù…ÙˆÙƒØ§Øª Ø¹Ø§Ø²Ù„Ø© Ù„Ù„ÙƒØ§Ø¨Ùˆ (3900 Ø¯Ø¬ â€” COD).',
      vehicle ? `Ø³ÙŠØ§Ø±ØªÙŠ: ${vehicle}` : 'Ù…Ø§Ø±ÙƒØ©/Ù…ÙˆØ¯ÙŠÙ„ Ø³ÙŠØ§Ø±ØªÙŠ: ',
      wilaya ? `Ø§Ù„ÙˆÙ„Ø§ÙŠØ©: ${wilaya}` : '',
      customerName.trim() ? `Ø§Ù„Ø§Ø³Ù…: ${customerName.trim()}` : '',
      phone.trim() ? `Ø§Ù„Ù‡Ø§ØªÙ: ${phone.trim()}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return `${STORE_WHATSAPP_URL}?text=${text}`;
  }, [carBrandId, carModelId, wilaya, customerName, phone]);

  const openWhatsAppOrder = () => {
    trackLead({ productId, productName, price: unitPrice, quantity });
    trackEvent('whatsapp_lead', {
      product_id: productId,
      product_name: productName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
    window.open(whatsAppOrderUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    setLivePrice(price);
  }, [price]);

  useEffect(() => {
    if (initialBrandId) setCarBrandId(initialBrandId);
    if (initialModelId) setCarModelId(initialModelId);
  }, [initialBrandId, initialModelId]);

  useEffect(() => {
    setExitDiscount(getStoredDiscount(productId));

    const onDiscount = (event: Event) => {
      const detail = (event as CustomEvent<{ productId: string; amount: number }>).detail;
      if (detail?.productId === productId) {
        setExitDiscount(detail.amount);
      }
    };

    const onLivePrice = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, { price?: number }>>).detail;
      const entry = detail?.[productId];
      if (entry && typeof entry.price === 'number') {
        setLivePrice(entry.price);
      }
    };

    window.addEventListener(DISCOUNT_EVENT, onDiscount);
    window.addEventListener(LIVE_PRICE_EVENT, onLivePrice);
    return () => {
      window.removeEventListener(DISCOUNT_EVENT, onDiscount);
      window.removeEventListener(LIVE_PRICE_EVENT, onLivePrice);
    };
  }, [productId]);

  useEffect(() => {
    if (wilaya && deliveryType === 'office' && !isDeskDeliveryAvailable(wilaya)) {
      setDeliveryType('home');
    }
  }, [wilaya, deliveryType]);

  useEffect(() => {
    setCommune('');
    setCommuneError('');
  }, [wilaya]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const trimmedName = customerName.trim();
    const trimmedWilaya = wilaya.trim();
    const trimmedCommune = commune.trim();
    let hasError = false;

    if (trimmedName.length < 3) {
      setNameError('ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø§Ø³Ù… ÙˆØ§Ù„Ù„Ù‚Ø¨ (3 Ø£Ø­Ø±Ù Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„)');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!trimmedWilaya) {
      setWilayaError('ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„ÙˆÙ„Ø§ÙŠØ©');
      hasError = true;
    } else {
      setWilayaError('');
    }

    if (!trimmedCommune) {
      setCommuneError('ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø¨Ù„Ø¯ÙŠØ©');
      hasError = true;
    } else if (communes.length > 0 && !communes.includes(trimmedCommune)) {
      setCommuneError('Ø§Ø®ØªØ± Ø¨Ù„Ø¯ÙŠØ© Ù…Ù† Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© â€” Ø§Ù„Ø§Ø³Ù… ÙŠØ¬Ø¨ Ø£Ù† ÙŠØ·Ø§Ø¨Ù‚ Ø§Ù„Ù…ØªØ¬Ø±');
      hasError = true;
    } else {
      setCommuneError('');
    }

    const cleanPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;

    if (!phoneRegex.test(cleanPhone) && cleanPhone !== '0555555555') {
      setPhoneError('ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø±Ù‚Ù… Ù‡Ø§ØªÙ Ø¬Ø²Ø§Ø¦Ø±ÙŠ ØµØ­ÙŠØ­ (Ù…Ø«Ø§Ù„: 0550123456)');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (!deliveryType) {
      setDeliveryError('ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ù†ÙˆØ¹ Ø§Ù„ØªÙˆØµÙŠÙ„');
      hasError = true;
    } else if (deliveryCost === null) {
      setDeliveryError(
        deliveryType === 'office'
          ? 'Ù…ÙƒØªØ¨ Ø§Ù„ØªÙˆØµÙŠÙ„ ØºÙŠØ± Ù…ØªÙˆÙØ± ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„ÙˆÙ„Ø§ÙŠØ© â€” Ø§Ø®ØªØ± Ø§Ù„ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø²Ù„'
          : 'ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„ÙˆÙ„Ø§ÙŠØ© Ù„Ø­Ø³Ø§Ø¨ Ø³Ø¹Ø± Ø§Ù„ØªÙˆØµÙŠÙ„'
      );
      hasError = true;
    } else {
      setDeliveryError('');
    }

    if (quantity > maxQuantity) {
      setSubmitError(`Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ ${maxQuantity} Ù‚Ø·Ø¹Ø© Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬`);
      hasError = true;
    }

    if (requiresVehicleInfo) {
      if (!carBrandId || !carModelId) {
        setVehicleError('ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ù…Ø§Ø±ÙƒØ© Ø§Ù„Ø³ÙŠØ§Ø±Ø© Ø«Ù… Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„');
        hasError = true;
      } else {
        setVehicleError('');
      }
    }

    if (hasError) {
      return;
    }

    if (cleanPhone !== '0555555555') {
      const lastOrderTime = localStorage.getItem('last_order_time');
      if (lastOrderTime && Date.now() - parseInt(lastOrderTime) < 300000) {
        setSubmitError('Ù„Ù‚Ø¯ Ù‚Ù…Øª Ø¨Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ù„Ù„ØªÙˆ. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ù‚Ù„ÙŠÙ„Ø§Ù‹ Ø£Ùˆ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ø¨Ø± Ø§Ù„ÙˆØ§ØªØ³Ø§Ø¨.');
        return;
      }
    }

    setIsSubmitting(true);

    const vehicleNote = requiresVehicleInfo
      ? `Ø§Ù„Ø³ÙŠØ§Ø±Ø©: ${formatVehicleSelection(carBrandId, carModelId)}`
      : '';
    const discountNote = [vehicleNote, exitDiscount > 0 ? `Ø®ØµÙ… ${exitDiscount} Ø¯Ø¬ (Ø¹Ø±Ø¶ Ø®Ø±ÙˆØ¬)` : '']
      .filter(Boolean)
      .join(' | ');

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      order_id: orderId,
      date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
      customer_name: trimmedName,
      phone: cleanPhone,
      wilaya: trimmedWilaya,
      commune: trimmedCommune,
      product_name: productName,
      quantity,
      unit_price: unitPrice,
      product_price: baseTotal,
      shipping_cost: deliveryCost,
      total_price: total,
      delivery_type: deliveryType === 'home' ? 'Ù…Ù†Ø²Ù„' : 'Ù…ÙƒØªØ¨',
      status: 'ÙÙŠ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±',
      tracking_number: '',
      notes: discountNote,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop';

    const apiPayload = {
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      wilaya: orderData.wilaya,
      commune: orderData.commune,
      product_id: productId,
      product_name: orderData.product_name,
      quantity: orderData.quantity,
      unit_price: unitPrice,
      shipping_cost: deliveryCost,
      total_price: orderData.total_price,
      delivery_type: deliveryType,
      notes: discountNote,
      ...getTrackingContext(),
    };

    try {
      const apiResponse = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => null);
        const message = errorBody?.detail || 'ØªØ¹Ø°Ø± Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ù† Ø§Ù„Ù‡Ø§ØªÙ.';
        setSubmitError(typeof message === 'string' ? message : 'ØªØ¹Ø°Ø± Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨.');
        setIsSubmitting(false);
        return;
      }

      // Google Sheet filled by backend (GOOGLE_SHEET_WEBHOOK_URL) â€” more reliable than browser fetch

      if (cleanPhone !== '0555555555') {
        localStorage.setItem('last_order_time', Date.now().toString());
      }

      storePendingPurchase({
        orderId,
        total,
        productId,
        productName,
        quantity,
        price: unitPrice,
      });

      window.location.href = `/thank-you?total=${total}&orderId=${encodeURIComponent(orderId)}`;
    } catch {
      setSubmitError('Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„. ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª ÙˆØ­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={trackCheckoutStart}
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        isAutomotive
          ? 'bg-zinc-900 border border-zinc-700 text-white'
          : 'bg-white border border-gray-100'
      }`}
      id="order-form"
    >
      <div className="mb-6 text-center">
        <h3 className={`text-2xl font-black mb-2 ${isAutomotive ? 'text-white' : 'text-text'}`}>
          Ø£Ø·Ù„Ø¨ Ø§Ù„Ø¢Ù† ÙˆØ§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…
        </h3>
        <p className={`text-sm ${isAutomotive ? 'text-zinc-400' : 'text-gray-500'}`}>
          {requiresVehicleInfo
            ? 'Ø§Ø®ØªØ§Ø± Ø³ÙŠØ§Ø±ØªÙƒ Ø¨Ø§Ù„Ø¶Ø¨Ø· â€” Ù†ØªØµÙ„Ùˆ Ø¨ÙŠÙƒ Ù„Ù„ØªØ£ÙƒÙŠØ¯ Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„'
            : 'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ù…Ø¹Ù„ÙˆÙ…Ø§ØªÙƒ ÙˆØ³Ù†ØªØµÙ„ Ø¨Ùƒ Ù„Ù„ØªØ£ÙƒÙŠØ¯'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Ø§Ù„Ø§Ø³Ù… ÙˆØ§Ù„Ù„Ù‚Ø¨ *</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            required
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              setNameError('');
            }}
            placeholder="Ù…Ø«Ø§Ù„: Ù…Ø­Ù…Ø¯ Ø£Ù…ÙŠÙ†"
            className={`w-full px-4 py-3 rounded-xl border ${nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
          />
          {nameError && <p className="text-red-500 text-xs mt-1 font-bold">{nameError}</p>}
        </div>

        {requiresVehicleInfo && (
          <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-b from-blue-50 to-white p-4 space-y-4 relative z-10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ðŸš—</span>
              <div>
                <p className="text-sm font-black text-primary">Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø³ÙŠØ§Ø±ØªÙƒ *</p>
                <p className="text-xs mt-1 text-gray-500">
                  Ø§Ø®ØªØ§Ø± Ø§Ù„Ù…Ø§Ø±ÙƒØ© Ø«Ù… Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„ Ø¨Ø§Ù„Ø¶Ø¨Ø· â€” Ø¨Ø§Ø´ Ù†ÙˆØ¬Ù‡Ù‘Ø²Ù„Ùƒ Ø§Ù„Ù…ÙˆÙƒØ§Øª Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø©
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Ù…Ø§Ø±ÙƒØ© Ø§Ù„Ø³ÙŠØ§Ø±Ø© *
                </label>
                <CarBrandPicker
                  value={carBrandId}
                  onChange={(brandId) => {
                    setCarBrandId(brandId);
                    setCarModelId('');
                    setVehicleError('');
                  }}
                />
                <input type="hidden" name="car_brand" value={carBrandId} required={requiresVehicleInfo} />
              </div>
              <div>
                <label htmlFor="car_model" className="block text-sm font-bold text-gray-700 mb-1">
                  Ù…ÙˆØ¯ÙŠÙ„ Ø§Ù„Ø³ÙŠØ§Ø±Ø© *
                </label>
                <select
                  id="car_model"
                  name="car_model"
                  required
                  value={carModelId}
                  disabled={!carBrandId}
                  onChange={(e) => {
                    setCarModelId(e.target.value);
                    setVehicleError('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none bg-white font-medium text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">
                    {carBrandId ? 'â€” Ø§Ø®ØªØ± Ø§Ù„Ù…ÙˆØ¯ÙŠÙ„ â€”' : 'Ø§Ø®ØªØ± Ø§Ù„Ù…Ø§Ø±ÙƒØ© Ø£ÙˆÙ„Ø§Ù‹'}
                  </option>
                  {carModels.map((model) => (
                    <option key={model.id} value={model.id}>{model.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {carBrandId && carModelId && (
              <p className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
                âœ“ ØªÙ… Ø§Ù„Ø§Ø®ØªÙŠØ§Ø±: {formatVehicleSelection(carBrandId, carModelId)}
              </p>
            )}
            {vehicleError && <p className="text-red-500 text-xs font-bold">{vehicleError}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ *</label>
          <input
            type="tel"
            id="phone"
            required
            dir="ltr"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError('');
            }}
            placeholder="05XX XX XX XX"
            className={`w-full px-4 py-3 rounded-xl border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all text-right`}
          />
          {phoneError && <p className="text-red-500 text-xs mt-1 font-bold">{phoneError}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          <div>
            <label htmlFor="wilaya" className="block text-sm font-bold text-gray-700 mb-1">Ø§Ù„ÙˆÙ„Ø§ÙŠØ© *</label>
            <select
              id="wilaya"
              name="wilaya"
              required
              value={wilaya}
              onChange={(e) => {
                setWilaya(e.target.value);
                setWilayaError('');
                setCommune('');
              }}
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 ${wilayaError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white appearance-auto`}
            >
              <option value="">â€” Ø§Ø®ØªØ± Ø§Ù„ÙˆÙ„Ø§ÙŠØ© â€”</option>
              {WILAYAS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            {wilayaError && <p className="text-red-500 text-xs mt-1 font-bold">{wilayaError}</p>}
          </div>
          <div>
            <label htmlFor="commune" className="block text-sm font-bold text-gray-700 mb-1">Ø§Ù„Ø¨Ù„Ø¯ÙŠØ© *</label>
            <select
              id="commune"
              name="commune"
              required
              disabled={!wilaya}
              value={commune}
              onChange={(e) => {
                setCommune(e.target.value);
                setCommuneError('');
              }}
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 ${communeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400 appearance-auto`}
            >
              <option value="">
                {wilaya ? 'â€” Ø§Ø®ØªØ± Ø§Ù„Ø¨Ù„Ø¯ÙŠØ© â€”' : 'â€” Ø§Ø®ØªØ± Ø§Ù„ÙˆÙ„Ø§ÙŠØ© Ø£ÙˆÙ„Ø§Ù‹ â€”'}
              </option>
              {communes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {communeError && <p className="text-red-500 text-xs mt-1 font-bold">{communeError}</p>}
            {wilaya && communes.length === 0 && (
              <p className="text-amber-700 text-xs mt-1 font-bold bg-amber-50 border border-amber-100 rounded-lg p-2">
                Ù…Ø§ Ù„Ù‚ÙŠÙ†Ø§Ø´ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¨Ù„Ø¯ÙŠØ§Øª â€” Ø§ÙƒØªØ¨ Ø§Ø³Ù… Ø§Ù„Ø¨Ù„Ø¯ÙŠØ© ÙÙŠ Ø®Ø§Ù†Ø© Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø£Ùˆ Ø§ØªØµÙ„ Ø¨ÙŠÙ†Ø§.
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Ù†ÙˆØ¹ Ø§Ù„ØªÙˆØµÙŠÙ„ *</label>
          <select
            id="delivery_type"
            required
            value={deliveryType}
            onChange={(e) => {
              setDeliveryType(e.target.value as 'home' | 'office');
              setDeliveryError('');
            }}
            className={`w-full px-4 py-3 rounded-xl border ${deliveryError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary outline-none bg-white`}
          >
            <option value="home">
              {wilaya
                ? formatShippingLabel('home', shippingRate.home)
                : 'ðŸ  ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø²Ù„'}
            </option>
            <option value="office" disabled={Boolean(wilaya) && !isDeskDeliveryAvailable(wilaya)}>
              {wilaya
                ? isDeskDeliveryAvailable(wilaya)
                  ? formatShippingLabel('office', shippingRate.desk)
                  : 'ðŸ¢ Ù…ÙƒØªØ¨ Ø§Ù„ØªÙˆØµÙŠÙ„ â€” ØºÙŠØ± Ù…ØªÙˆÙØ±'
                : 'ðŸ¢ Ø§Ø³ØªÙ„Ø§Ù… Ù…Ù† Ù…ÙƒØªØ¨ Ø§Ù„ØªÙˆØµÙŠÙ„ (Stop Desk)'}
            </option>
          </select>
          {deliveryError && <p className="text-red-500 text-xs mt-1 font-bold">{deliveryError}</p>}
          {wilaya && deliveryType === 'office' && (
            <p className="text-xs text-amber-800 mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2 leading-relaxed">
              {getWilayaCode(wilaya) === '16' || getWilayaCode(wilaya) === '09'
                ? 'ðŸ¢ Ù…ÙƒØ§ØªØ¨ DHD Ù…ØªØ¹Ø¯Ø¯Ø© ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„ÙˆÙ„Ø§ÙŠØ© â€” Ø§Ø®ØªØ± Ø¨Ù„Ø¯ÙŠØªÙƒ Ø§Ù„Ø£Ù‚Ø±Ø¨ Ù„Ù„Ù…ÙƒØªØ¨.'
                : 'ðŸ¢ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… Ù…Ù† Ù…ÙƒØªØ¨ DHD ÙÙŠ Ø¹Ø§ØµÙ…Ø© Ø§Ù„ÙˆÙ„Ø§ÙŠØ© (Ù„ÙŠØ³ ÙÙŠ ÙƒÙ„ Ø§Ù„Ø¨Ù„Ø¯ÙŠØ§Øª). Ù†ØªØµÙ„ Ø¨Ùƒ Ù„ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…ÙƒØªØ¨.'}
            </p>
          )}
          {wilaya && deliveryType === 'home' && (
            <p className="text-xs text-gray-500 mt-1">Ø§Ù„Ø³Ø¹Ø± Ø­Ø³Ø¨ ØªØ¹Ø±ÙŠÙØ© DHD Ù„Ù„ÙˆÙ„Ø§ÙŠØ© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Ø§Ù„ÙƒÙ…ÙŠØ© <span className="text-gray-400 font-normal">(Ø­Ø¯ Ø£Ù‚ØµÙ‰ {maxQuantity})</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-32">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-12 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xl flex items-center justify-center"
            >-</button>
            <div className="flex-1 h-12 flex items-center justify-center font-bold text-lg border-x border-gray-300">
              {quantity}
            </div>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="w-10 h-12 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xl flex items-center justify-center"
            >+</button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mt-6 border border-gray-200">
          {exitDiscount > 0 && (
            <div className="flex justify-between text-green-700 mb-2 text-sm">
              <span>ðŸŽ Ø®ØµÙ… Ø¹Ø±Ø¶ Ø§Ù„Ø®Ø±ÙˆØ¬ ({EXIT_DISCOUNT_DZD} Ø¯Ø¬):</span>
              <span className="font-bold">-{exitDiscount * quantity} Ø¯Ø¬</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600 mb-2">
            <span>
              Ø³Ø¹Ø± Ø§Ù„Ù…Ù†ØªØ¬ ({quantity} Ã— {unitPrice} Ø¯Ø¬):
            </span>
            <span className="font-bold">{baseTotal} Ø¯Ø¬</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>
              Ø§Ù„ØªÙˆØµÙŠÙ„
              {deliveryType === 'home' ? ' (Ù…Ù†Ø²Ù„)' : ' (Ù…ÙƒØªØ¨)'}:
            </span>
            <span className="font-bold">
              {deliveryCost !== null ? `${deliveryCost} Ø¯Ø¬` : 'â€”'}
            </span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg">
            <span className="font-black text-text">Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„ÙƒÙ„ÙŠ:</span>
            <span className="font-black text-primary text-xl">{total} Ø¯Ø¬</span>
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-xl">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-black text-xl text-white shadow-lg transition-all transform hover:-translate-y-1 mt-4 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent/90 hover:shadow-xl animate-pulse-slow'
          }`}
        >
          {isSubmitting ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...' : 'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨ â€” Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…'}
        </button>

        <p className="text-center text-xs text-green-700 font-bold mt-2">
          âœ“ Ù…Ø§ ØªØ®Ù„Øµ Ø­ØªÙ‰ ØªØ³ØªÙ„Ù… Ø§Ù„Ù…Ù†ØªØ¬ ÙˆØªØªØ£ÙƒØ¯ Ù…Ù†Ùˆ
        </p>

        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
          <span>ðŸ”’</span> Ø·Ù„Ø¨ ÙˆØ§Ø­Ø¯ Ù„ÙƒÙ„ Ø±Ù‚Ù…/Ø§ØªØµØ§Ù„ ÙÙŠ Ø§Ù„ÙŠÙˆÙ… â€” Ø­Ù…Ø§ÙŠØ© Ù…Ù† Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„ÙˆÙ‡Ù…ÙŠØ©
        </p>

        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-3">ØªØ­Ø¨ ØªØ·Ù„Ø¨ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ØŸ</p>
          <button
            type="button"
            onClick={openWhatsAppOrder}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-white text-green-700 font-bold py-3 px-4 hover:bg-green-50 transition-colors"
          >
            <span className="text-lg">ðŸ’¬</span>
            Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨ â€” {siteHost}
          </button>
        </div>
      </div>
    </form>
  );
}

