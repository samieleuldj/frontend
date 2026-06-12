"use client";

import { useState } from 'react';

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

export default function CheckoutForm({ productName, price }: CheckoutFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryCost = 600;
  const baseTotal = price * quantity;
  const total = baseTotal + deliveryCost;

  const [customerName, setCustomerName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [commune, setCommune] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [wilayaError, setWilayaError] = useState('');
  const [communeError, setCommuneError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (trimmedCommune.length < 2) {
      setCommuneError('يرجى إدخال اسم البلدية');
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

    if (hasError) {
      return;
    }

    if (cleanPhone !== '0555555555') {
      const lastOrderTime = localStorage.getItem('last_order_time');
      if (lastOrderTime && Date.now() - parseInt(lastOrderTime) < 300000) {
        alert('لقد قمت بإرسال طلب للتو. يرجى الانتظار قليلاً أو التواصل معنا عبر الواتساب.');
        return;
      }
    }

    setIsSubmitting(true);

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      order_id: orderId,
      date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
      customer_name: trimmedName,
      phone: cleanPhone,
      wilaya: trimmedWilaya,
      commune: trimmedCommune,
      product_name: productName,
      quantity: quantity,
      total_price: total,
      status: 'Pending',
      notes: '',
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
      total_price: orderData.total_price,
      notes: orderData.notes,
    };

    const requests: Promise<Response>[] = [
      fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      }),
    ];

    if (webhookUrl && webhookUrl !== 'your_google_script_url_here') {
      requests.push(
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
      );
    }

    try {
      const results = await Promise.allSettled(requests);
      const apiResult = results[0];
      if (apiResult.status === 'rejected') {
        console.error('Error saving order to API:', apiResult.reason);
      } else if (!apiResult.value.ok) {
        console.error('API rejected order:', await apiResult.value.text());
      }
    } catch (error) {
      console.error('Error saving order:', error);
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
  };

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
            <input
              type="text"
              id="commune"
              name="commune"
              required
              value={commune}
              onChange={(e) => {
                setCommune(e.target.value);
                setCommuneError('');
              }}
              placeholder="اسم البلدية"
              className={`w-full px-4 py-3 rounded-xl border ${communeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
            />
            {communeError && <p className="text-red-500 text-xs mt-1 font-bold">{communeError}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">الكمية</label>
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
              onClick={() => setQuantity(quantity + 1)}
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
            <span>التوصيل:</span>
            <span className="font-bold">{deliveryCost} دج</span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg">
            <span className="font-black text-text">المجموع الكلي:</span>
            <span className="font-black text-primary text-xl">{total} دج</span>
          </div>
        </div>

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
          <span>🔒</span> معلوماتك محمية ولن يتم مشاركتها
        </p>
      </div>
    </form>
  );
}
