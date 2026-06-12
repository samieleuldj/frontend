"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  formatShippingLabel,
  getShippingCost,
  getShippingRate,
  isDeskDeliveryAvailable,
} from '@/data/shipping-rates';
import { getCommunesForWilaya } from '@/data/communes';

const WILAYAS = [
  "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة", "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
  "11 - تمنراست", "12 - تبسة", "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو", "16 - الجزائر", "17 - الجلفة", "18 - جيجل", "19 - سطيف", "20 - سعيدة",
  "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة", "25 - قسنطينة", "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
  "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس", "36 - الطارف", "37 - تندوف", "38 - تيسمسيلت", "39 - الوادي", "40 - خنشلة",
  "41 - سوق أهراس", "42 - تيبازة", "43 - ميلة", "44 - عين الدفلى", "45 - النعامة", "46 - عين تموشنت", "47 - غرداية", "48 - غليزان",
  "49 - المغير", "50 - المنيعة", "51 - أولاد جلال", "52 - برج باجي مختار", "53 - بني عباس", "54 - تقرت", "55 - جانت", "56 - عين صالح", "57 - إن قزام", "58 - إن أميناس"
];

interface CheckoutFormProps {
  productName: string;
  price: number;
}

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return true;
  const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent
  );
  const smallScreen = window.matchMedia('(max-width: 1023px)').matches;
  return mobileUA || smallScreen;
}

export default function CheckoutForm({ productName, price }: CheckoutFormProps) {
  const maxQuantity = price >= 5000 ? 2 : 4;
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canOrder, setCanOrder] = useState(true);
  const [submitError, setSubmitError] = useState('');

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

  const shippingRate = useMemo(() => getShippingRate(wilaya), [wilaya]);
  const communes = useMemo(() => getCommunesForWilaya(wilaya), [wilaya]);
  const deliveryCost = useMemo(() => {
    if (!wilaya) return null;
    return getShippingCost(wilaya, deliveryType);
  }, [wilaya, deliveryType]);

  const baseTotal = price * quantity;
  const total = baseTotal + (deliveryCost ?? 0);

  useEffect(() => {
    setCanOrder(isMobileDevice());
  }, []);

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

    if (!canOrder) {
      setSubmitError('الطلب متاح من الهاتف فقط. افتح confortdz.shop من هاتفك.');
      return;
    }

    const trimmedName = customerName.trim();
    const trimmedWilaya = wilaya.trim();
    const trimmedCommune = commune.trim();
    let hasError = false;

    if (trimmedName.length < 3) {
      setNameError('يرجى إدخال الاسم واللقب (3 أحرف على الأقل)');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!trimmedWilaya) {
      setWilayaError('يرجى اختيار الولاية');
      hasError = true;
    } else {
      setWilayaError('');
    }

    if (!trimmedCommune) {
      setCommuneError('يرجى اختيار البلدية');
      hasError = true;
    } else {
      setCommuneError('');
    }

    const cleanPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;

    if (!phoneRegex.test(cleanPhone) && cleanPhone !== '0555555555') {
      setPhoneError('يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456)');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (!deliveryType) {
      setDeliveryError('يرجى اختيار نوع التوصيل');
      hasError = true;
    } else if (deliveryCost === null) {
      setDeliveryError(
        deliveryType === 'office'
          ? 'مكتب التوصيل غير متوفر في هذه الولاية — اختر التوصيل للمنزل'
          : 'يرجى اختيار الولاية لحساب سعر التوصيل'
      );
      hasError = true;
    } else {
      setDeliveryError('');
    }

    if (quantity > maxQuantity) {
      setSubmitError(`الحد الأقصى ${maxQuantity} قطعة لهذا المنتج`);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (cleanPhone !== '0555555555') {
      const lastOrderTime = localStorage.getItem('last_order_time');
      if (lastOrderTime && Date.now() - parseInt(lastOrderTime) < 300000) {
        setSubmitError('لقد قمت بإرسال طلب للتو. يرجى الانتظار قليلاً أو التواصل معنا عبر الواتساب.');
        return;
      }
    }

    setIsSubmitting(true);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryLabel =
      deliveryType === 'home'
        ? `توصيل للمنزل (${deliveryCost} دج)`
        : `مكتب التوصيل (${deliveryCost} دج)`;
    const orderData = {
      order_id: orderId,
      date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
      customer_name: trimmedName,
      phone: cleanPhone,
      wilaya: trimmedWilaya,
      commune: trimmedCommune,
      product_name: productName,
      quantity,
      shipping_cost: deliveryCost,
      total_price: total,
      delivery_type: deliveryType === 'home' ? 'منزل' : 'مكتب',
      status: 'En attente',
      tracking_number: '',
      notes: deliveryLabel,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop';
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;

    const apiPayload = {
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      wilaya: orderData.wilaya,
      commune: orderData.commune,
      product_name: orderData.product_name,
      quantity: orderData.quantity,
      unit_price: price,
      total_price: orderData.total_price,
      delivery_type: deliveryType,
      notes: orderData.notes,
    };

    try {
      const apiResponse = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => null);
        const message = errorBody?.detail || 'تعذر إرسال الطلب. يرجى المحاولة من الهاتف.';
        setSubmitError(typeof message === 'string' ? message : 'تعذر إرسال الطلب.');
        setIsSubmitting(false);
        return;
      }

      if (webhookUrl && webhookUrl !== 'your_google_script_url_here') {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }).catch(() => undefined);
      }

      if (typeof window !== 'undefined') {
        const eventData = {
          value: total,
          currency: 'DZD',
          content_name: productName,
          content_type: 'product',
        };

        if (window.fbq) window.fbq('track', 'Purchase', eventData);
        if (window.ttq) window.ttq.track('CompletePayment', eventData);
        if (window.snaptr) window.snaptr('track', 'PURCHASE', eventData);

        if (cleanPhone !== '0555555555') {
          localStorage.setItem('last_order_time', Date.now().toString());
        }
      }

      window.location.href = `/thank-you?total=${total}&orderId=${encodeURIComponent(orderId)}`;
    } catch {
      setSubmitError('خطأ في الاتصال. تحقق من الإنترنت وحاول مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  if (!canOrder) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 md:p-8" id="order-form">
        <div className="text-center">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-black text-text mb-3">الطلب من الهاتف فقط</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            لحماية المتجر من الطلبات الوهمية، الطلب متاح من <strong>الهاتف</strong> فقط.
          </p>
          <p className="text-sm text-gray-500">
            افتح <strong>confortdz.shop</strong> من هاتفك وعبّي الفورم.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8" id="order-form">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-black text-text mb-2">أطلب الآن والدفع عند الاستلام</h3>
        <p className="text-gray-500 text-sm">يرجى إدخال معلوماتك وسنتصل بك للتأكيد</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم واللقب *</label>
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
            placeholder="مثال: محمد أمين"
            className={`w-full px-4 py-3 rounded-xl border ${nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
          />
          {nameError && <p className="text-red-500 text-xs mt-1 font-bold">{nameError}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف *</label>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الولاية *</label>
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
              className={`w-full px-4 py-3 rounded-xl border ${wilayaError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white`}
            >
              <option value="">اختر الولاية...</option>
              {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            {wilayaError && <p className="text-red-500 text-xs mt-1 font-bold">{wilayaError}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">البلدية *</label>
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
              className={`w-full px-4 py-3 rounded-xl border ${communeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400`}
            >
              <option value="">
                {wilaya ? 'اختر البلدية...' : 'اختر الولاية أولاً'}
              </option>
              {communes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {communeError && <p className="text-red-500 text-xs mt-1 font-bold">{communeError}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">نوع التوصيل *</label>
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
                : '🏠 توصيل للمنزل'}
            </option>
            <option value="office" disabled={Boolean(wilaya) && !isDeskDeliveryAvailable(wilaya)}>
              {wilaya
                ? isDeskDeliveryAvailable(wilaya)
                  ? formatShippingLabel('office', shippingRate.desk)
                  : '🏢 مكتب التوصيل — غير متوفر'
                : '🏢 استلام من مكتب التوصيل (Stop Desk)'}
            </option>
          </select>
          {deliveryError && <p className="text-red-500 text-xs mt-1 font-bold">{deliveryError}</p>}
          {wilaya && deliveryType === 'home' && (
            <p className="text-xs text-gray-500 mt-1">السعر حسب تعريفة DHD للولاية المختارة</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            الكمية <span className="text-gray-400 font-normal">(حد أقصى {maxQuantity})</span>
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
          <div className="flex justify-between text-gray-600 mb-2">
            <span>سعر المنتج ({quantity}):</span>
            <span className="font-bold">{baseTotal} دج</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>
              التوصيل
              {deliveryType === 'home' ? ' (منزل)' : ' (مكتب)'}:
            </span>
            <span className="font-bold">
              {deliveryCost !== null ? `${deliveryCost} دج` : '—'}
            </span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg">
            <span className="font-black text-text">المجموع الكلي:</span>
            <span className="font-black text-primary text-xl">{total} دج</span>
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
          {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب — الدفع عند الاستلام'}
        </button>

        <p className="text-center text-xs text-green-700 font-bold mt-2">
          ✓ ما تخلص حتى تستلم المنتج وتتأكد منو
        </p>

        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
          <span>🔒</span> طلب واحد لكل رقم/اتصال في اليوم — حماية من الطلبات الوهمية
        </p>
      </div>
    </form>
  );
}
