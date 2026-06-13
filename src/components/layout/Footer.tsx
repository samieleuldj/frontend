import Link from 'next/link';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_URL } from '@/lib/store';

export default function Footer() {
  return (
    <footer className="bg-text text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-black mb-4">
              كونفور <span className="text-secondary">ديزاد</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              المتجر الجزائري الأول المتخصص في منتجات الراحة اليومية. هدفنا تحسين جودة حياتك بمنتجات أصلية ومضمونة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-secondary transition-colors">الرئيسية</Link></li>
              <li><Link href="/#products" className="hover:text-secondary transition-colors">المنتجات</Link></li>
              <li><Link href="/#reviews" className="hover:text-secondary transition-colors">آراء الزبائن</Link></li>
            </ul>
          </div>

          {/* Contact & Trust */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">تواصل معنا</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={STORE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" dir="ltr">
                  {STORE_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a href={STORE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  واتساب — تواصل معنا
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>contact@confortdz.shop</span>
              </li>
              <li className="mt-4">
                <div className="flex gap-2 items-center text-sm bg-gray-800 p-3 rounded-lg">
                  <span>🚚</span>
                  <span>توصيل متوفر لـ 58 ولاية الدفع عند الاستلام</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} كونفور ديزاد (Confort DZ). جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
