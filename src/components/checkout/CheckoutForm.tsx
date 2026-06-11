"use client";

import { useState, useEffect } from 'react';

// قائمة مبسطة للولايات لتسريع العمل
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
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Order Bump State
  const [addBump, setAddBump] = useState(false);
  const bumpPrice = Math.round(price * 0.5); // 50% تخفيض على القطعة الثانية

  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const deliveryCost = 600; // تكلفة توصيل افتراضية
  const baseTotal = price * quantity;
  const bumpTotal = addBump ? bumpPrice : 0;
  const total = baseTotal + bumpTotal + deliveryCost;

  // مؤقت النافذة المنبثقة
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showUpsellPopup && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (showUpsellPopup && timeLeft === 0) {
      // إذا انتهى الوقت، يتم توجيهه لصفحة الشكر بدون العرض
      window.location.href = `/thank-you?total=${total}`;
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showUpsellPopup, timeLeft, total]);

  const handleAcceptUpsell = () => {
    const finalTotal = total + 900; // إضافة سعر مرهم الحنظل المخفض
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'AcceptedPostPurchaseUpsell', { value: 900, currency: 'DZD' });
    }
    window.location.href = `/thank-you?total=${finalTotal}`;
  };

  const handleDeclineUpsell = () => {
    window.location.href = `/thank-you?total=${total}`;
  };

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. التحقق من رقم الهاتف الجزائري
    const cleanPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    
    // استثناء رقم الاختبار (0555555555) من التحقق
    if (!phoneRegex.test(cleanPhone) && cleanPhone !== '0555555555') {
      setPhoneError('يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456)');
      return;
    }
    setPhoneError('');

    // 2. منع الطلبات المكررة (إلا لرقم الاختبار)
    if (cleanPhone !== '0555555555') {
      const lastOrderTime = localStorage.getItem('last_order_time');
      if (lastOrderTime && Date.now() - parseInt(lastOrderTime) < 300000) {
        alert('لقد قمت بإرسال طلب للتو. يرجى الانتظار قليلاً أو التواصل معنا عبر الواتساب.');
        return;
      }
    }

    setIsSubmitting(true);

    // 3. تجهيز بيانات الطلب لجوجل شيت
    const orderData = {
      order_id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
      customer_name: (document.getElementById('customer_name') as HTMLInputElement)?.value || '',
      phone: cleanPhone,
      wilaya: (document.getElementById('wilaya') as HTMLSelectElement)?.value || '',
      commune: (document.getElementById('commune') as HTMLInputElement)?.value || '',
      product_name: productName,
      quantity: quantity,
      total_price: total,
      status: 'Pending',
      notes: addBump ? 'أضاف عرض القطعة الثانية (Upsell)' : ''
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

    const requests: Promise<unknown>[] = [
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
      // نستمر في العملية حتى لو فشل الحفظ لكي لا نخسر الزبون
    }
    
    // إرسال حدث الشراء للبكسل
    if (typeof window !== 'undefined') {
      const eventData = {
        value: total,
        currency: 'DZD',
        content_name: productName + (addBump ? ' + عرض خاص' : ''),
        content_type: 'product',
      };
      
      if (window.fbq) window.fbq('track', 'Purchase', eventData);
      if (window.ttq) window.ttq.track('CompletePayment', eventData);
      if (window.snaptr) window.snaptr('track', 'PURCHASE', eventData);
      
      if (cleanPhone !== '0555555555') {
        localStorage.setItem('last_order_time', Date.now().toString());
      }
    }

    // نظهر نافذة العرض الخاص
    setIsSubmitting(false);
    setShowUpsellPopup(true);
  };

  if (showUpsellPopup) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-slide-in-left">
          {/* Header */}
          <div className="bg-red-600 p-4 text-center relative">
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-black text-red-700 transform rotate-12 shadow-lg">
              -50%
            </div>
            <h3 className="text-white font-black text-2xl mb-1">انتظر! عرض خاص لك</h3>
            <p className="text-red-100 text-sm">قبل تأكيد طلبيتك النهائية...</p>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <div className="w-24 h-24 bg-orange-50 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-orange-100 shadow-inner">
              <span className="text-4xl">🌿</span>
            </div>
            <h4 className="text-xl font-black text-text mb-2">مرهم الحنظل الأصلي لتسكين الآلام</h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              المكمل المثالي لطلبك! يدهن على مناطق الألم ليعطي مفعولاً فورياً ومريحاً. معظم زبائننا يطلبونه مع هذا المنتج.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl font-black text-red-600">900 دج</span>
                <span className="text-lg text-gray-400 line-through">1900 دج</span>
              </div>
              <p className="text-sm font-bold text-green-600">بدون أي تكاليف توصيل إضافية!</p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-gray-500 text-sm">ينتهي العرض في:</span>
              <span className="bg-red-100 text-red-700 font-black px-3 py-1 rounded-lg text-lg w-16 text-center">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                onClick={handleAcceptUpsell}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>نعم، أضف المرهم لطلبيتي</span>
                <span className="text-2xl">✅</span>
              </button>
              
              <button 
                onClick={handleDeclineUpsell}
                className="w-full text-gray-400 hover:text-gray-600 font-medium py-2 text-sm underline"
              >
                لا شكراً، أكمل طلبيتي بدون هذا العرض
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">جاري توجيهك...</h3>
        <p className="text-green-700 mb-4">
          الرجاء الانتظار لحظة.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8" id="order-form">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-black text-text mb-2">أطلب الآن والدفع عند الاستلام</h3>
          <p className="text-gray-500 text-sm">يرجى إدخال معلوماتك وسنتصل بك للتأكيد</p>
        </div>

        <div className="space-y-4">
        {/* الاسم */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم واللقب *</label>
          <input 
            type="text" 
            id="customer_name"
            required
            placeholder="مثال: محمد أمين"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>

        {/* رقم الهاتف */}
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

        {/* الولاية والبلدية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الولاية *</label>
            <select id="wilaya" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white">
              <option value="">اختر الولاية...</option>
              {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">البلدية *</label>
            <input 
              type="text" 
              id="commune"
              required
              placeholder="اسم البلدية"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

          {/* الكمية */}
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

          {/* Order Bump (عرض خاص) */}
          <div className={`mt-6 p-4 rounded-xl border-2 transition-all cursor-pointer ${addBump ? 'border-accent bg-accent/5' : 'border-dashed border-gray-300 bg-gray-50 hover:border-accent/50'}`} onClick={() => setAddBump(!addBump)}>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <input 
                  type="checkbox" 
                  checked={addBump}
                  onChange={() => setAddBump(!addBump)}
                  className="w-5 h-5 accent-accent cursor-pointer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-red-600 text-sm bg-red-100 px-2 py-0.5 rounded">عرض خاص لمرة واحدة!</span>
                </div>
                <h4 className="font-bold text-gray-800">أضف قطعة ثانية بـ 50% تخفيض</h4>
                <p className="text-sm text-gray-600 mt-1">العديد من الزبائن يشترون قطعة ثانية لأحد أفراد العائلة. أضفها الآن بـ <span className="font-bold text-accent">{bumpPrice} دج</span> فقط بدلاً من <span className="line-through">{price} دج</span>.</p>
              </div>
            </div>
          </div>

          {/* ملخص السعر */}
          <div className="bg-gray-50 p-4 rounded-xl mt-6 border border-gray-200">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>سعر المنتج ({quantity}):</span>
              <span className="font-bold">{baseTotal} دج</span>
            </div>
            {addBump && (
              <div className="flex justify-between text-accent mb-2">
                <span>عرض القطعة الثانية:</span>
                <span className="font-bold">+{bumpPrice} دج</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 mb-2">
              <span>التوصيل:</span>
              <span className="font-bold">{deliveryCost} دج</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg">
              <span className="font-black text-text">المجموع الكلي:</span>
              <span className="font-black text-primary text-xl">{total} دج</span>
            </div>
          </div>

          {/* زر الإرسال */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-black text-xl text-white shadow-lg transition-all transform hover:-translate-y-1 mt-4 ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent/90 hover:shadow-xl animate-pulse-slow'
            }`}
          >
            {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب الآن'}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
            <span>🔒</span> معلوماتك محمية ولن يتم مشاركتها
          </p>
        </div>
      </form>
    </>
  );
}
