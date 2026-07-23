import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-primary tracking-tight">
            فيلورا <span className="text-secondary">ديزاد</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-text/80">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <Link href="/#products" className="hover:text-primary transition-colors">منتجاتنا</Link>
          <Link href="/#reviews" className="hover:text-primary transition-colors">آراء الزبائن</Link>
        </nav>

        {/* Cart / CTA */}
        <div className="flex items-center gap-4">
          <a 
            href="/#products" 
            className="bg-accent hover:bg-accent/90 text-white px-5 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            أطلب الآن
          </a>
        </div>
      </div>
    </header>
  );
}
